import { Link, useRoute } from "wouter";
import { Terminal, Users, Zap } from "lucide-react";
import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  const [isHome] = useRoute("/");
  const [isTeams] = useRoute("/teams");

  return (
    <div className="min-h-screen bg-background flex flex-col grid-pattern">
      <header className="sticky top-0 z-50 glass-panel border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[hsl(187,96%,52%)] to-[hsl(160,84%,39%)] flex items-center justify-center text-[hsl(222,47%,6%)] shadow-lg glow-cyan group-hover:scale-110 transition-transform duration-300">
                <Terminal className="w-4.5 h-4.5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                Dev<span className="gradient-text-cyan">Sprint</span>
              </span>
            </Link>
            <nav className="flex items-center gap-1 sm:gap-2">
              <Link
                href="/"
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${isHome
                    ? "bg-[hsl(187,96%,52%)]/10 text-[hsl(187,96%,52%)] glow-cyan"
                    : "text-muted-foreground hover:bg-white/[0.05] hover:text-foreground"
                  }`}
              >
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">A Missão</span>
              </Link>
              <Link
                href="/teams"
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${isTeams
                    ? "bg-[hsl(187,96%,52%)]/10 text-[hsl(187,96%,52%)] glow-cyan"
                    : "text-muted-foreground hover:bg-white/[0.05] hover:text-foreground"
                  }`}
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Squads</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[hsl(187,96%,52%)]/[0.03] via-transparent to-transparent -z-10 pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-[hsl(187,96%,52%)]/[0.03] rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute top-40 left-10 w-60 h-60 bg-[hsl(160,84%,39%)]/[0.03] rounded-full blur-[100px] -z-10 pointer-events-none" />
        {children}
      </main>

      <footer className="border-t border-white/[0.06] bg-[hsl(222,47%,5%)] mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <p className="text-muted-foreground font-medium flex items-center gap-2">
            Desenvolvido por <span className="gradient-text-cyan font-bold">Professor Johnny Braga de Oliveira</span>
          </p>
          <p className="text-sm text-muted-foreground/60 mt-1">
            Escola SENAI Morvan Figueiredo — Desenvolvimento de Sistemas
          </p>
        </div>
      </footer>
    </div>
  );
}
