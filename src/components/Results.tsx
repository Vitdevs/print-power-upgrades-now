import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Clock, Weight, Package2, Zap, TrendingUp } from "lucide-react";
import { CalculationResults } from "./Calculator";

interface ResultsProps {
  results: CalculationResults | null;
}

export function Results({ results }: ResultsProps) {
  if (!results) {
    return (
      <Card className="w-full max-w-2xl bg-gradient-card border-0 shadow-card animate-pulse">
        <CardHeader>
          <CardTitle className="text-center text-muted-foreground">
            Configura los parámetros para ver los resultados
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const formatTime = (hours: number): string => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
  };

  const formatWeight = (grams: number): string => {
    if (grams >= 1000) {
      return `${(grams / 1000).toFixed(2)} kg`;
    }
    return `${grams.toFixed(1)} g`;
  };

  return (
    <Card className="w-full max-w-2xl bg-gradient-card border-0 shadow-card animate-scale-in">
      <CardHeader className="text-center pb-6">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          <TrendingUp className="h-6 w-6 text-primary" />
          Resultados del Cálculo
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Análisis completo de costos y tiempo de impresión
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Costo total destacado */}
        <div className="text-center p-6 bg-gradient-primary rounded-xl shadow-glow">
          <h2 className="text-3xl font-bold text-white mb-2">
            {formatCurrency(results.totalCost)}
          </h2>
          <p className="text-primary-foreground/80">Costo Total de Impresión</p>
        </div>

        {/* Grid de resultados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-lg p-4 border border-border/50 hover:shadow-hover transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Costo Material</h3>
                <p className="text-lg font-bold text-primary">{formatCurrency(results.materialCost)}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border border-border/50 hover:shadow-hover transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Zap className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Costo Electricidad</h3>
                <p className="text-lg font-bold text-accent">{formatCurrency(results.electricityCost)}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border border-border/50 hover:shadow-hover transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Tiempo Impresión</h3>
                <p className="text-lg font-bold text-primary">{formatTime(results.totalTime)}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border border-border/50 hover:shadow-hover transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Weight className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Peso Material</h3>
                <p className="text-lg font-bold text-accent">{formatWeight(results.weight)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Package2 className="h-5 w-5 text-primary" />
            Detalles del Proyecto
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Volumen:</span>
              <span className="ml-2 font-medium">{results.volume.toFixed(1)} cm³</span>
            </div>
            <div>
              <span className="text-muted-foreground">Peso:</span>
              <span className="ml-2 font-medium">{formatWeight(results.weight)}</span>
            </div>
          </div>
        </div>

        {/* Breakdown de costos */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Desglose de Costos</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-muted/20 rounded">
              <span className="text-sm text-muted-foreground">Material ({((results.materialCost / results.totalCost) * 100).toFixed(1)}%)</span>
              <span className="font-medium">{formatCurrency(results.materialCost)}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted/20 rounded">
              <span className="text-sm text-muted-foreground">Electricidad ({((results.electricityCost / results.totalCost) * 100).toFixed(1)}%)</span>
              <span className="font-medium">{formatCurrency(results.electricityCost)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}