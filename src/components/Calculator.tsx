import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator as CalculatorIcon, Printer, DollarSign, Clock, Zap, Package } from "lucide-react";

interface CalculatorProps {
  onCalculate: (results: CalculationResults) => void;
}

export interface CalculationResults {
  materialCost: number;
  electricityCost: number;
  totalTime: number;
  totalCost: number;
  volume: number;
  weight: number;
}

interface MaterialData {
  name: string;
  costPerKg: number;
  density: number; // g/cm³
}

interface PrinterData {
  name: string;
  powerConsumption: number; // watts
  maxSpeed: number; // mm/s
}

const materials: MaterialData[] = [
  { name: "PLA", costPerKg: 25, density: 1.24 },
  { name: "ABS", costPerKg: 28, density: 1.04 },
  { name: "PETG", costPerKg: 35, density: 1.27 },
  { name: "TPU", costPerKg: 45, density: 1.20 },
  { name: "ASA", costPerKg: 40, density: 1.05 },
  { name: "PC", costPerKg: 85, density: 1.20 },
  { name: "Nylon", costPerKg: 60, density: 1.08 }
];

const printers: PrinterData[] = [
  { name: "Ender 3", powerConsumption: 270, maxSpeed: 50 },
  { name: "Prusa i3 MK3S+", powerConsumption: 120, maxSpeed: 80 },
  { name: "Bambu Lab X1 Carbon", powerConsumption: 350, maxSpeed: 500 },
  { name: "Ultimaker S3", powerConsumption: 221, maxSpeed: 300 },
  { name: "Artillery Genius", powerConsumption: 350, maxSpeed: 150 },
  { name: "Creality K1", powerConsumption: 350, maxSpeed: 600 }
];

export function Calculator({ onCalculate }: CalculatorProps) {
  const [length, setLength] = useState<number>(50);
  const [width, setWidth] = useState<number>(50);
  const [height, setHeight] = useState<number>(20);
  const [infill, setInfill] = useState<number>(20);
  const [selectedMaterial, setSelectedMaterial] = useState<string>("PLA");
  const [selectedPrinter, setSelectedPrinter] = useState<string>("Ender 3");
  const [layerHeight, setLayerHeight] = useState<number>(0.2);
  const [printSpeed, setPrintSpeed] = useState<number>(50);
  const [electricityRate, setElectricityRate] = useState<number>(0.15);
  
  const calculateResults = (): CalculationResults => {
    // Volume calculation (simplified)
    const volume = (length * width * height) / 1000; // cm³
    const filledVolume = volume * (infill / 100);
    
    // Material calculations
    const material = materials.find(m => m.name === selectedMaterial) || materials[0];
    const weight = filledVolume * material.density; // grams
    const materialCost = (weight / 1000) * material.costPerKg;
    
    // Time calculation (simplified)
    const layers = height / layerHeight;
    const perimeterLength = 2 * (length + width);
    const totalPrintLength = (perimeterLength * layers) + (filledVolume * 10); // rough estimate
    const printTimeHours = totalPrintLength / (printSpeed * 60); // hours
    
    // Electricity cost
    const printer = printers.find(p => p.name === selectedPrinter) || printers[0];
    const electricityCost = (printer.powerConsumption / 1000) * printTimeHours * electricityRate;
    
    const totalCost = materialCost + electricityCost;
    
    return {
      materialCost,
      electricityCost,
      totalTime: printTimeHours,
      totalCost,
      volume,
      weight
    };
  };

  const handleCalculate = () => {
    const results = calculateResults();
    onCalculate(results);
  };

  useEffect(() => {
    handleCalculate();
  }, [length, width, height, infill, selectedMaterial, selectedPrinter, layerHeight, printSpeed, electricityRate]);

  return (
    <Card className="w-full max-w-2xl bg-gradient-card border-0 shadow-card">
      <CardHeader className="text-center pb-6">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          <CalculatorIcon className="h-6 w-6 text-primary" />
          Calculadora de Impresión 3D
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Calcula costos, tiempo y materiales para tus proyectos de impresión 3D
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Dimensiones */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Dimensiones del Objeto (mm)
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="length">Largo</Label>
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="width">Ancho</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="height">Alto</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Configuraciones de impresión */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Printer className="h-5 w-5 text-primary" />
            Configuración de Impresión
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="infill">Relleno (%)</Label>
              <Input
                id="infill"
                type="number"
                min="0"
                max="100"
                value={infill}
                onChange={(e) => setInfill(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="layerHeight">Altura de Capa (mm)</Label>
              <Input
                id="layerHeight"
                type="number"
                step="0.1"
                min="0.1"
                max="0.4"
                value={layerHeight}
                onChange={(e) => setLayerHeight(Number(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Selección de material e impresora */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="material">Material</Label>
              <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecciona un material" />
                </SelectTrigger>
                <SelectContent>
                  {materials.map((material) => (
                    <SelectItem key={material.name} value={material.name}>
                      {material.name} - ${material.costPerKg}/kg
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="printer">Impresora</Label>
              <Select value={selectedPrinter} onValueChange={setSelectedPrinter}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecciona una impresora" />
                </SelectTrigger>
                <SelectContent>
                  {printers.map((printer) => (
                    <SelectItem key={printer.name} value={printer.name}>
                      {printer.name} - {printer.powerConsumption}W
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Configuraciones adicionales */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Configuraciones Avanzadas
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="printSpeed">Velocidad (mm/s)</Label>
              <Input
                id="printSpeed"
                type="number"
                value={printSpeed}
                onChange={(e) => setPrintSpeed(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="electricityRate">Costo Electricidad ($/kWh)</Label>
              <Input
                id="electricityRate"
                type="number"
                step="0.01"
                value={electricityRate}
                onChange={(e) => setElectricityRate(Number(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={handleCalculate} 
          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          <CalculatorIcon className="mr-2 h-5 w-5" />
          Calcular Costos
        </Button>
      </CardContent>
    </Card>
  );
}