import { Github, Heart, Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Code2 className="h-5 w-5" />
            <span>Print Calcs - Calculadora de Impresión 3D</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/Vitdevs/Print-Calcs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-sm">Hecho con</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span className="text-sm">por Vitdevs</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border/30 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Print Calcs. Una herramienta gratuita para la comunidad maker.</p>
        </div>
      </div>
    </footer>
  );
}