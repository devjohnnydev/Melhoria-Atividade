import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { 
  ArrowRight, 
  Lightbulb, 
  Palette, 
  LayoutTemplate,
  Target,
  Search,
  PenTool,
  Presentation,
  Rocket,
  CheckCircle2
} from "lucide-react";
import { Link } from "wouter";

const phases = [
  {
    num: 1,
    title: "A Descoberta",
    icon: Search,
    desc: "Briefing profundo. O cliente conta sua história, medos e sonhos. O designer escuta, anota e investiga o mercado."
  },
  {
    num: 2,
    title: "A Concepção",
    icon: PenTool,
    desc: "Brainstorming e rascunhos. O designer traduz as palavras em formas, testa cores e aplica a Gestalt nas ideias iniciais."
  },
  {
    num: 3,
    title: "A Revelação",
    icon: Presentation,
    desc: "Apresentação do conceito. O designer mostra a primeira versão da marca e explica as decisões (por que esta cor? por que esta forma?)."
  },
  {
    num: 4,
    title: "A Virada",
    icon: Rocket,
    desc: "Refinamento final e entrega. A marca ganha vida com ajustes baseados no feedback do cliente."
  }
];

export default function Home() {
  return (
    <Layout>
      <div className="w-full">
        {/* HERO SECTION */}
        <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Módulo de Aprendizagem Ativa
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-foreground mb-6 animate-fade-in-up stagger-1">
            Missão: <br className="md:hidden"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
              Identidade Visual
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in-up stagger-2">
            Uma jornada prática de Design e Front-end onde você e sua dupla criarão uma marca do zero à aprovação final.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
            <Link 
              href="/teams" 
              className="px-8 py-4 rounded-xl font-bold bg-primary text-primary-foreground shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Começar a Missão <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* OS SUPERPODERES */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold text-foreground">Os Seus Superpoderes</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Antes de iniciar o desafio, equipe-se com as ferramentas fundamentais do design e gestão.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-background rounded-3xl p-8 border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Metodologias Ágeis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Usaremos <strong className="text-foreground">Scrum & Kanban</strong> para organizar tarefas, dividir grandes problemas e garantir entregas contínuas.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-background rounded-3xl p-8 border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Palette className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Psicologia das Cores</h3>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-red-500" /> Energia</div>
                  <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-blue-500" /> Confiança</div>
                  <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-green-500" /> Natureza</div>
                  <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-yellow-400" /> Otimismo</div>
                </div>
                <p className="text-sm text-muted-foreground">As cores não são por acaso, elas transmitem emoções.</p>
              </div>

              {/* Card 3 */}
              <div className="bg-background rounded-3xl p-8 border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <LayoutTemplate className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Leis da Gestalt</h3>
                <p className="text-muted-foreground leading-relaxed">
                  O cérebro busca padrões. Use a <strong className="text-foreground">Proximidade</strong> e <strong className="text-foreground">Semelhança</strong> para criar marcas harmoniosas e memoráveis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* O DESAFIO */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm font-semibold mb-6">
                  <Lightbulb className="w-5 h-5" />
                  O Desafio
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Traduzindo Personalidade em Design</h2>
                <p className="text-xl text-primary-foreground/80 leading-relaxed mb-8">
                  Vocês formarão duplas: <strong>O Designer</strong> e <strong>O Cliente</strong>. 
                  O objetivo é escutar os desejos do cliente e traduzi-los em uma identidade visual coesa.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <h4 className="font-bold text-lg mb-2">Papel do Cliente</h4>
                    <p className="text-primary-foreground/80 text-sm">Fornecer a visão, personalidade da marca imaginária e dar feedbacks honestos durante o processo.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <h4 className="font-bold text-lg mb-2">Papel do Designer</h4>
                    <p className="text-primary-foreground/80 text-sm">Fazer as perguntas certas, explorar conceitos e materializar a marca usando princípios de design.</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-full bg-gradient-to-tr from-white/5 to-white/20 absolute -inset-4 blur-2xl animate-pulse" />
                <img 
                  /* team collaboration abstract 3d shapes */
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
                  alt="Abstract Collaboration" 
                  className="rounded-3xl shadow-2xl relative z-10 border-4 border-white/10 object-cover aspect-video"
                />
              </div>
            </div>
          </div>
        </section>

        {/* AS 4 FASES */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">As 4 Fases da Missão</h2>
              <p className="text-muted-foreground mt-4 text-lg">Um processo validado para o sucesso criativo</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {phases.map((phase) => (
                <div key={phase.num} className="relative pt-8">
                  <div className="absolute top-0 left-8 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-display font-bold text-2xl shadow-lg -translate-y-1/2">
                    {phase.num}
                  </div>
                  <div className="bg-white h-full rounded-3xl p-8 pt-12 border border-border shadow-sm hover:shadow-xl transition-all">
                    <phase.icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AVALIAÇÃO */}
        <section className="py-20 border-t border-border bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-display font-bold text-center mb-12">Critérios de Avaliação</h2>
            <div className="space-y-4">
              {[
                { title: "Processo (Ágil)", desc: "A equipe usou Scrum/Kanban e respeitou as 4 fases?" },
                { title: "Conceituação", desc: "A psicologia das cores e a Gestalt fazem sentido?" },
                { title: "Execução", desc: "A marca final está profissional, aplicável e bem desenhada?" },
                { title: "Comunicação", desc: "O designer conseguiu vender sua ideia na 'Revelação'?" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-secondary/30">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-foreground">{item.title}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
