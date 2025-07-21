import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Calculator, CalculationResults } from "@/components/Calculator";
import { Results } from "@/components/Results";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const { toast } = useToast();

  const handleCalculation = (calculationResults: CalculationResults) => {
    setResults(calculationResults);
    
    toast({
      title: "¡Cálculo completado!",
      description: `Costo total: $${calculationResults.totalCost.toFixed(2)}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />
      
      {/* Calculator Section */}
      <section id="calculator" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Calculadora Profesional
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ingresa los parámetros de tu proyecto para obtener estimaciones precisas de costos y tiempo
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Calculator */}
            <div className="order-1 lg:order-1">
              <Calculator onCalculate={handleCalculation} />
            </div>
            
            {/* Results */}
            <div className="order-2 lg:order-2 lg:sticky lg:top-8">
              <Results results={results} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">¿Por qué elegir Print Calcs?</h2>
            <p className="text-lg text-muted-foreground">Características que hacen la diferencia</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-card rounded-xl shadow-card">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Precisión Avanzada</h3>
              <p className="text-muted-foreground">
                Algoritmos optimizados que consideran múltiples variables para cálculos exactos
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-xl shadow-card">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Tiempo Real</h3>
              <p className="text-muted-foreground">
                Resultados instantáneos que se actualizan automáticamente al cambiar parámetros
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-xl shadow-card">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Configuración Completa</h3>
              <p className="text-muted-foreground">
                Soporte para múltiples materiales, impresoras y configuraciones avanzadas
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
