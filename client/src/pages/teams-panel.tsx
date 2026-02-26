import { Layout } from "@/components/layout";
import { CreateTeamDialog } from "@/components/create-team-dialog";
import { useTeams, useUpdateTeamPhase } from "@/hooks/use-teams";
import {
  Users,
  ArrowRight,
  Trophy,
  Code2,
  UserCog,
  Loader2,
  AlertCircle,
  GitBranch,
  Rocket
} from "lucide-react";

const phaseNames = ["Discovery", "Arquitetura", "Code Sprint", "Deploy & Demo"];
const phaseIcons = ["🔍", "📐", "💻", "🚀"];

export default function TeamsPanel() {
  const { data: teams, isLoading, error } = useTeams();
  const updatePhase = useUpdateTeamPhase();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-fade-in-up">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(187,96%,52%)]/10 text-[hsl(187,96%,52%)] font-semibold text-xs mb-3 tracking-wider uppercase">
              <GitBranch className="w-3.5 h-3.5" />
              Gestão de Squads
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Painel dos Squads</h1>
            <p className="text-muted-foreground mt-2">
              Acompanhe o progresso dos squads no desenvolvimento do MVP.
            </p>
          </div>
          <CreateTeamDialog />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <div className="w-16 h-16 rounded-2xl bg-[hsl(187,96%,52%)]/10 flex items-center justify-center mb-4 glow-cyan animate-pulse">
              <Loader2 className="w-8 h-8 animate-spin text-[hsl(187,96%,52%)]" />
            </div>
            <p className="font-medium">Carregando squads...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-destructive glass-card rounded-3xl border border-destructive/20">
            <AlertCircle className="w-12 h-12 mb-4" />
            <p className="font-medium">Ocorreu um erro ao carregar os squads.</p>
          </div>
        ) : !teams || teams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center glass-card rounded-3xl animate-fade-in-up stagger-1">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(187,96%,52%)]/20 to-[hsl(160,84%,39%)]/20 flex items-center justify-center mb-6 glow-cyan">
              <Users className="w-10 h-10 text-[hsl(187,96%,52%)]" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-foreground">Nenhum squad registrado</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              A sprint ainda não começou! Registre o primeiro squad com Tech Lead e Product Owner para iniciar o desafio.
            </p>
            <CreateTeamDialog />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up stagger-1">
            {teams.map((team) => {
              const progress = (team.currentPhase / 4) * 100;
              const isFinished = team.currentPhase === 4;

              return (
                <div
                  key={team.id}
                  className="glass-card rounded-3xl p-6 hover:border-[hsl(187,96%,52%)]/20 transition-all duration-300 flex flex-col group hover:glow-cyan"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{phaseIcons[team.currentPhase - 1]}</span>
                      <h3 className="text-xl font-bold text-foreground">{team.name}</h3>
                    </div>
                    <div className={`px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1.5 ${isFinished
                        ? 'bg-[hsl(160,84%,39%)]/15 text-[hsl(160,84%,50%)]'
                        : 'bg-[hsl(187,96%,52%)]/10 text-[hsl(187,96%,52%)]'
                      }`}>
                      Fase {team.currentPhase}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-9 h-9 rounded-xl bg-[hsl(187,96%,52%)]/10 flex items-center justify-center">
                        <Code2 className="w-4 h-4 text-[hsl(187,96%,52%)]" />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60">Tech Lead</span>
                        <span className="font-medium text-foreground">{team.techLeadName}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-9 h-9 rounded-xl bg-[hsl(160,84%,39%)]/10 flex items-center justify-center">
                        <UserCog className="w-4 h-4 text-[hsl(160,84%,50%)]" />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60">Product Owner</span>
                        <span className="font-medium text-foreground">{team.productOwnerName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/[0.06]">
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-muted-foreground">{phaseNames[team.currentPhase - 1]}</span>
                      <span className="gradient-text-cyan">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-white/[0.05] rounded-full h-2 mb-6 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${isFinished
                            ? 'bg-gradient-to-r from-[hsl(160,84%,39%)] to-[hsl(160,84%,50%)]'
                            : 'bg-gradient-to-r from-[hsl(187,96%,52%)] to-[hsl(160,84%,39%)]'
                          }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <button
                      disabled={isFinished || updatePhase.isPending}
                      onClick={() => updatePhase.mutate({ id: team.id, phase: team.currentPhase + 1 })}
                      className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${isFinished
                          ? 'bg-[hsl(160,84%,39%)]/10 text-[hsl(160,84%,50%)] cursor-default'
                          : 'bg-[hsl(187,96%,52%)]/10 text-[hsl(187,96%,52%)] hover:bg-gradient-to-r hover:from-[hsl(187,96%,52%)] hover:to-[hsl(160,84%,39%)] hover:text-[hsl(222,47%,6%)] hover:glow-cyan'
                        }`}
                    >
                      {updatePhase.isPending && updatePhase.variables?.id === team.id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : isFinished ? (
                        <>
                          <Trophy className="w-5 h-5" />
                          MVP Entregue!
                        </>
                      ) : (
                        <>
                          Avançar Sprint
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
