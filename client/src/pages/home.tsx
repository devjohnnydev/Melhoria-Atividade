import { Layout } from "@/components/layout";
import {
  ArrowRight,
  Rocket,
  Search,
  Box,
  Code2,
  Presentation,
  CheckCircle2,
  Download,
  FileText,
  Terminal,
  GitBranch,
  Layers,
  Zap,
  Workflow,
  Cpu,
  Braces
} from "lucide-react";
import { Link } from "wouter";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const phases = [
  {
    num: 1,
    title: "Discovery",
    icon: Search,
    emoji: "🔍",
    desc: "Levantamento de requisitos. O PO apresenta a visão do produto e o Tech Lead investiga, faz perguntas e cria o backlog no Kanban."
  },
  {
    num: 2,
    title: "Arquitetura",
    icon: Box,
    emoji: "📐",
    desc: "Modelagem do sistema. Definição da stack, wireframes, diagrama de classes e planejamento das sprints de desenvolvimento."
  },
  {
    num: 3,
    title: "Code Sprint",
    icon: Code2,
    emoji: "💻",
    desc: "Mãos no código! O Tech Lead implementa o MVP usando boas práticas (Clean Code, MVC) enquanto o PO valida as entregas."
  },
  {
    num: 4,
    title: "Deploy & Demo",
    icon: Rocket,
    emoji: "🚀",
    desc: "Apresentação final do produto. Demo ao vivo, retrospectiva da sprint e feedback do Product Owner."
  }
];

function generatePDF() {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(22);
  doc.setTextColor(0, 200, 200);
  doc.text("Missao: Dev Sprint", 20, 25);

  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("Professor Johnny Braga de Oliveira - SENAI Morvan Figueiredo", 20, 35);
  doc.text("Curso: Desenvolvimento de Sistemas", 20, 43);

  doc.setDrawColor(50, 50, 50);
  doc.line(20, 48, 190, 48);

  // Seção O Desafio
  doc.setFontSize(16);
  doc.setTextColor(0, 180, 180);
  doc.text("1. O Desafio", 20, 60);

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  const challengeText = "Em duplas, um sera o Tech Lead e o outro o Product Owner. O objetivo e criar um MVP (Minimum Viable Product) simulando um ambiente profissional de desenvolvimento agil. Depois, os papeis se invertem.";
  doc.text(doc.splitTextToSize(challengeText, 170), 20, 70);

  // Tabela de Fases
  doc.setFontSize(16);
  doc.setTextColor(0, 180, 180);
  doc.text("2. As 4 Fases do Sprint", 20, 92);

  autoTable(doc, {
    startY: 100,
    head: [['Fase', 'Descricao']],
    body: [
      ['1. Discovery', 'Levantamento de requisitos, entrevista com PO e criacao do backlog no Kanban.'],
      ['2. Arquitetura', 'Modelagem do sistema, wireframes, diagramas e definicao da stack.'],
      ['3. Code Sprint', 'Desenvolvimento do MVP com codigo funcional usando boas praticas.'],
      ['4. Deploy & Demo', 'Apresentacao do produto, demonstracao ao vivo e retrospectiva.']
    ],
    headStyles: { fillColor: [0, 160, 160] },
    styles: { fontSize: 10 },
  });

  // Critérios de Avaliação
  const finalY = (doc as any).lastAutoTable.finalY || 160;
  doc.setFontSize(16);
  doc.setTextColor(0, 180, 180);
  doc.text("3. Criterios de Avaliacao", 20, finalY + 15);

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  const criteria = [
    "- Processo Agil (Uso do Kanban e Scrum )",
    "- Arquitetura (Modelagem, diagramas e planejamento)",
    "- Qualidade do Codigo (Clean Code, MVC, boas praticas)",
    "- Comunicacao (Apresentacao e Demo final)"
  ];
  criteria.forEach((text, i) => {
    doc.text(text, 20, finalY + 25 + (i * 8));
  });

  // Superpoderes
  doc.setFontSize(16);
  doc.setTextColor(0, 180, 180);
  doc.text("4. Superpoderes do Dev", 20, finalY + 65);

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  const powers = [
    "- Scrum & Kanban: Gestao agil de projetos com sprints e quadro de tarefas",
    "- Clean Code & MVC: Padroes de projeto para codigo limpo e organizado",
    "- Git & Versionamento: Controle de versao com branches e commits"
  ];
  powers.forEach((text, i) => {
    doc.text(doc.splitTextToSize(text, 170), 20, finalY + 75 + (i * 10));
  });

  // Nota
  doc.setFontSize(10);
  doc.setTextColor(130, 130, 130);
  doc.text("A entrega pode ser feita com qualquer tecnologia (HTML/CSS/JS, React, Python, etc.).", 20, finalY + 110);

  doc.save("DevSprint-Instrucoes.pdf");
}

export default function Home() {
  return (
    <Layout>
      <div className="w-full">
        {/* HERO SECTION */}
        <section className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[hsl(187,96%,52%)]/[0.04] rounded-full blur-[120px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(187,96%,52%)]/10 border border-[hsl(187,96%,52%)]/20 text-[hsl(187,96%,52%)] font-semibold text-sm mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-[hsl(187,96%,52%)] animate-pulse" />
            Desenvolvimento de Sistemas — SENAI
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-foreground mb-6 animate-fade-in-up stagger-1">
            Missão: <br className="md:hidden" />
            <span className="gradient-text-cyan">
              Dev Sprint
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in-up stagger-2 leading-relaxed">
            Uma jornada prática de desenvolvimento de software onde você e sua dupla criarão um <strong className="text-foreground">MVP</strong> do zero ao deploy, usando metodologias ágeis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3 relative z-10">
            <Link
              href="/teams"
              className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-[hsl(187,96%,52%)] to-[hsl(160,84%,39%)] text-[hsl(222,47%,6%)] shadow-xl glow-cyan hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Iniciar Sprint <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={generatePDF}
              className="px-8 py-4 rounded-xl font-bold glass-card text-foreground hover:border-[hsl(187,96%,52%)]/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" /> Baixar PDF
            </button>
          </div>

          {/* Floating code snippet decoration */}
          <div className="hidden lg:block absolute right-8 top-32 code-block text-left opacity-40 animate-float text-xs max-w-[220px]" style={{ fontFamily: 'var(--font-mono)' }}>
            <span className="text-[hsl(187,96%,52%)]">const</span> <span className="text-[hsl(160,84%,50%)]">squad</span> = {'{'}<br />
            &nbsp;&nbsp;techLead: <span className="text-amber-400">"você"</span>,<br />
            &nbsp;&nbsp;po: <span className="text-amber-400">"dupla"</span>,<br />
            &nbsp;&nbsp;sprint: <span className="text-[hsl(187,96%,52%)]">true</span><br />
            {'}'};
          </div>
        </section>

        {/* SUPERPODERES */}
        <section className="py-24 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(160,84%,39%)]/10 text-[hsl(160,84%,50%)] font-semibold text-xs mb-4 tracking-wider uppercase">
                <Zap className="w-3.5 h-3.5" />
                Fundamentos
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Os Superpoderes do Dev</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                Antes de codar, domine as ferramentas e conceitos que todo desenvolvedor profissional precisa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 — Scrum & Kanban */}
              <div className="glass-card rounded-3xl p-8 hover:border-[hsl(187,96%,52%)]/20 transition-all duration-300 group hover:glow-cyan">
                <div className="w-14 h-14 rounded-2xl bg-[hsl(187,96%,52%)]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Workflow className="w-7 h-7 text-[hsl(187,96%,52%)]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Scrum & Kanban</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Organize o trabalho com <strong className="text-foreground">sprints</strong>,
                  <strong className="text-foreground"> quadros Kanban</strong> e dailys.
                  Divida problemas complexos em tarefas menores e entregue com consistência.
                </p>
              </div>

              {/* Card 2 — Padrões de Projeto */}
              <div className="glass-card rounded-3xl p-8 hover:border-[hsl(160,84%,39%)]/20 transition-all duration-300 group hover:glow-green">
                <div className="w-14 h-14 rounded-2xl bg-[hsl(160,84%,39%)]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Layers className="w-7 h-7 text-[hsl(160,84%,50%)]" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Clean Code & MVC</h3>
                <div className="code-block mb-4 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                  <span className="text-[hsl(187,96%,52%)]">// Separação de responsabilidades</span><br />
                  <span className="text-muted-foreground">📁 models/</span><br />
                  <span className="text-muted-foreground">📁 views/</span><br />
                  <span className="text-muted-foreground">📁 controllers/</span>
                </div>
                <p className="text-sm text-muted-foreground">Código limpo, organizado e manutenível é a marca de um profissional.</p>
              </div>

              {/* Card 3 — Git */}
              <div className="glass-card rounded-3xl p-8 hover:border-[hsl(270,80%,65%)]/20 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-[hsl(270,80%,65%)]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <GitBranch className="w-7 h-7 text-[hsl(270,80%,65%)]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Git & Versionamento</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Trabalhe em equipe com <strong className="text-foreground">branches</strong>,
                  <strong className="text-foreground"> commits</strong> descritivos e
                  <strong className="text-foreground"> pull requests</strong>.
                  Nunca mais perca código.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* O DESAFIO */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(187,96%,52%)]/[0.06] via-transparent to-[hsl(160,84%,39%)]/[0.04]" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(187,96%,52%)]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(187,96%,52%)]/20 to-transparent" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(187,96%,52%)]/10 border border-[hsl(187,96%,52%)]/20 font-semibold mb-6 text-[hsl(187,96%,52%)] text-sm">
                  <Cpu className="w-4 h-4" />
                  O Desafio
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">Do Requisito ao <span className="gradient-text-cyan">Deploy</span></h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  Vocês formarão duplas: <strong className="text-foreground">O Tech Lead</strong> e <strong className="text-foreground">O Product Owner</strong>.
                  O objetivo é transformar uma ideia em um produto funcional usando tudo que aprenderam no curso.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="glass-card rounded-2xl p-6 hover:border-[hsl(160,84%,39%)]/20 transition-all">
                    <h4 className="font-bold text-lg mb-2 text-foreground flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[hsl(160,84%,39%)]/15 flex items-center justify-center text-sm">👨‍💼</span>
                      Product Owner
                    </h4>
                    <p className="text-muted-foreground text-sm">Define a visão do produto, escreve user stories, prioriza o backlog e valida cada entrega da sprint.</p>
                  </div>
                  <div className="glass-card rounded-2xl p-6 hover:border-[hsl(187,96%,52%)]/20 transition-all">
                    <h4 className="font-bold text-lg mb-2 text-foreground flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[hsl(187,96%,52%)]/15 flex items-center justify-center text-sm">👨‍💻</span>
                      Tech Lead
                    </h4>
                    <p className="text-muted-foreground text-sm">Lidera a implementação técnica, define a arquitetura, escreve código limpo e garante a qualidade do sistema.</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-full bg-gradient-to-tr from-[hsl(187,96%,52%)]/[0.05] to-[hsl(160,84%,39%)]/[0.1] absolute -inset-8 blur-3xl animate-pulse" />
                <div className="glass-card rounded-3xl p-8 relative z-10">
                  <div className="code-block text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                      <span className="text-xs text-muted-foreground/50 ml-2">sprint.ts</span>
                    </div>
                    <span className="text-[hsl(270,80%,65%)]">interface</span> <span className="text-[hsl(160,84%,50%)]">Sprint</span> {'{'}<br />
                    &nbsp;&nbsp;squad: <span className="text-[hsl(187,96%,52%)]">string</span>;<br />
                    &nbsp;&nbsp;techLead: <span className="text-[hsl(187,96%,52%)]">string</span>;<br />
                    &nbsp;&nbsp;productOwner: <span className="text-[hsl(187,96%,52%)]">string</span>;<br />
                    &nbsp;&nbsp;mvpReady: <span className="text-[hsl(187,96%,52%)]">boolean</span>;<br />
                    {'}'}<br /><br />
                    <span className="text-[hsl(270,80%,65%)]">const</span> <span className="text-[hsl(160,84%,50%)]">deploy</span> = <span className="text-[hsl(270,80%,65%)]">async</span> () {'=> {'}<br />
                    &nbsp;&nbsp;<span className="text-muted-foreground/50">// Sua missão começa aqui 🚀</span><br />
                    &nbsp;&nbsp;<span className="text-[hsl(270,80%,65%)]">await</span> <span className="text-[hsl(160,84%,50%)]">buildMVP</span>();<br />
                    {'}'};
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXEMPLO DE ENTREGA */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[hsl(187,96%,52%)]/10 px-4 py-2 rounded-bl-2xl text-[hsl(187,96%,52%)] font-bold text-xs uppercase tracking-wider">
                    Exemplo de Entrega
                  </div>
                  <div className="flex items-center gap-4 mb-8 mt-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(187,96%,52%)]/20 to-[hsl(160,84%,39%)]/20 flex items-center justify-center">
                      <Braces className="w-6 h-6 text-[hsl(187,96%,52%)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">TaskFlow App</h3>
                      <p className="text-sm text-muted-foreground">Gerenciador de Tarefas Ágil</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-muted-foreground/60 uppercase mb-3 tracking-wider">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind"].map(tech => (
                          <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs font-semibold text-foreground">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-muted-foreground/60 uppercase mb-3 tracking-wider">Arquitetura</h4>
                      <div className="code-block text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                        <span className="text-muted-foreground">📁 src/</span><br />
                        <span className="text-muted-foreground">&nbsp;&nbsp;├── models/</span> <span className="text-[hsl(187,96%,52%)]">← dados</span><br />
                        <span className="text-muted-foreground">&nbsp;&nbsp;├── views/</span> <span className="text-[hsl(160,84%,50%)]">← interface</span><br />
                        <span className="text-muted-foreground">&nbsp;&nbsp;├── controllers/</span> <span className="text-[hsl(270,80%,65%)]">← lógica</span><br />
                        <span className="text-muted-foreground">&nbsp;&nbsp;└── utils/</span> <span className="text-amber-400">← helpers</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-muted-foreground/60 uppercase mb-3 tracking-wider">Features do MVP</h4>
                      <div className="space-y-2">
                        {["CRUD de tarefas com drag & drop", "Autenticação de usuários", "Dashboard com métricas", "Deploy na nuvem"].map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-[hsl(160,84%,50%)] shrink-0" />
                            {feat}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(160,84%,39%)]/10 text-[hsl(160,84%,50%)] font-semibold text-xs mb-4 tracking-wider uppercase">
                  <FileText className="w-3.5 h-3.5" />
                  Entrega
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Como será a entrega?</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Ao final do sprint, você e sua dupla devem apresentar o <strong className="text-foreground">MVP funcional</strong>,
                  incluindo a documentação técnica, o repositório Git e uma demo ao vivo do sistema.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 group cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-[hsl(187,96%,52%)]/10 flex items-center justify-center group-hover:bg-[hsl(187,96%,52%)] group-hover:text-[hsl(222,47%,6%)] transition-all duration-300">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-foreground">Documentação Técnica (README + Diagramas)</span>
                  </div>
                  <div className="flex items-center gap-4 group cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-[hsl(187,96%,52%)]/10 flex items-center justify-center group-hover:bg-[hsl(187,96%,52%)] group-hover:text-[hsl(222,47%,6%)] transition-all duration-300">
                      <GitBranch className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-foreground">Repositório Git organizado</span>
                  </div>
                  <div className="flex items-center gap-4 group cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-[hsl(187,96%,52%)]/10 flex items-center justify-center group-hover:bg-[hsl(187,96%,52%)] group-hover:text-[hsl(222,47%,6%)] transition-all duration-300">
                      <Presentation className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-foreground">Demo ao vivo do MVP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AS 4 FASES */}
        <section className="py-24 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(187,96%,52%)]/10 text-[hsl(187,96%,52%)] font-semibold text-xs mb-4 tracking-wider uppercase">
                <Terminal className="w-3.5 h-3.5" />
                Processo
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">As 4 Fases do Sprint</h2>
              <p className="text-muted-foreground mt-4 text-lg">Um processo ágil validado para o sucesso no desenvolvimento</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {phases.map((phase) => (
                <div key={phase.num} className="relative pt-8">
                  <div className="absolute top-0 left-8 w-12 h-12 bg-gradient-to-br from-[hsl(187,96%,52%)] to-[hsl(160,84%,39%)] text-[hsl(222,47%,6%)] rounded-2xl flex items-center justify-center font-display font-bold text-2xl shadow-lg glow-cyan -translate-y-1/2">
                    {phase.num}
                  </div>
                  <div className="glass-card h-full rounded-3xl p-8 pt-12 hover:border-[hsl(187,96%,52%)]/20 hover:glow-cyan transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-4">
                      <phase.icon className="w-7 h-7 text-[hsl(187,96%,52%)] group-hover:scale-110 transition-transform" />
                      <span className="text-2xl">{phase.emoji}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{phase.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AVALIAÇÃO */}
        <section className="py-20 border-t border-white/[0.04]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(160,84%,39%)]/10 text-[hsl(160,84%,50%)] font-semibold text-xs mb-4 tracking-wider uppercase">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Avaliação
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground">Critérios de Avaliação</h2>
            </div>
            <div className="space-y-4">
              {[
                { title: "Processo Ágil", desc: "O squad usou Scrum/Kanban e respeitou as 4 fases do sprint?", icon: "⚡" },
                { title: "Arquitetura", desc: "O sistema está bem modelado, com diagramas e planejamento claro?", icon: "📐" },
                { title: "Qualidade do Código", desc: "O código segue Clean Code, usa padrões (MVC) e está versionado no Git?", icon: "💎" },
                { title: "Comunicação", desc: "O squad conseguiu apresentar e fazer a demo do MVP com clareza?", icon: "🎤" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-2xl glass-card hover:border-[hsl(187,96%,52%)]/15 transition-all">
                  <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
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
