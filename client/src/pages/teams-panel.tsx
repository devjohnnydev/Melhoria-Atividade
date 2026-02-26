import { Layout } from "@/components/layout";
import { CreateTeamDialog } from "@/components/create-team-dialog";
import { useTeams, useUpdateTeamPhase } from "@/hooks/use-teams";
import { 
  Users, 
  ArrowRight, 
  Trophy, 
  Briefcase,
  User,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Link } from "wouter";

const phaseNames = ["Descoberta", "Concepção", "Revelação", "Virada"];

export default function TeamsPanel() {
  const { data: teams, isLoading, error } = useTeams();
  const updatePhase = useUpdateTeamPhase();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-fade-in-up">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Painel das Equipes</h1>
            <p className="text-muted-foreground mt-2">
              Acompanhe o progresso das duplas no desenvolvimento das marcas.
            </p>
          </div>
          <CreateTeamDialog />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary" />
            <p>Carregando equipes...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-destructive bg-destructive/10 rounded-3xl border border-destructive/20">
            <AlertCircle className="w-12 h-12 mb-4" />
            <p className="font-medium">Ocorreu um erro ao carregar as equipes.</p>
          </div>
        ) : !teams || teams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-border shadow-sm animate-fade-in-up stagger-1">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
              <Users className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Nenhuma equipe ainda</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              A jornada ainda não começou! Registre a primeira dupla de Designer e Cliente para iniciar o desafio.
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
                  className="bg-white rounded-3xl p-6 border border-border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold text-foreground">{team.name}</h3>
                    <div className="px-3 py-1 bg-secondary text-primary font-bold text-xs rounded-full flex items-center gap-1">
                      Fase {team.currentPhase}
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs uppercase tracking-wider font-semibold opacity-70">Designer</span>
                        <span className="font-medium text-foreground">{team.designerName}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs uppercase tracking-wider font-semibold opacity-70">Cliente</span>
                        <span className="font-medium text-foreground">{team.clientName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-border">
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-muted-foreground">{phaseNames[team.currentPhase - 1]}</span>
                      <span className="text-primary">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 mb-6 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${isFinished ? 'bg-emerald-500' : 'bg-primary'}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    
                    <button
                      disabled={isFinished || updatePhase.isPending}
                      onClick={() => updatePhase.mutate({ id: team.id, phase: team.currentPhase + 1 })}
                      className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                        isFinished 
                          ? 'bg-emerald-50 text-emerald-600 cursor-default'
                          : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                      }`}
                    >
                      {updatePhase.isPending && updatePhase.variables?.id === team.id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : isFinished ? (
                        <>
                          <Trophy className="w-5 h-5" />
                          Projeto Concluído
                        </>
                      ) : (
                        <>
                          Avançar Fase
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
