import { Link, useRoute } from "wouter";
import { BookOpen, Users } from "lucide-react";
import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  const [isHome] = useRoute("/");
  const [isTeams] = useRoute("/teams");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 glass-panel border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xl text-foreground tracking-tight">
                Missão<span className="text-primary">.ID</span>
              </span>
            </div>
            <nav className="flex items-center gap-1 sm:gap-4">
              <Link 
                href="/" 
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isHome 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">A Missão</span>
              </Link>
              <Link 
                href="/teams" 
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isTeams 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Equipes</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col relative">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        {children}
      </main>

      <footer className="border-t border-border bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <p className="text-muted-foreground font-medium flex items-center gap-2">
            Apresentado por <span className="text-foreground font-bold">Professor Johnny Braga de Oliveira</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Escola SENAI Morvan Figueiredo
          </p>
        </div>
      </footer>
    </div>
  );
}
