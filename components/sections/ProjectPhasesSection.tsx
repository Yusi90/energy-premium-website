import { AnimatedCard, FadeInUp } from "@/components/ui/MotionPrimitives";
import { SectionLabel } from "@/components/ui/SectionLabel";

const phases = [
  {
    title: "Standortanalyse",
    text: "Flächenzuschnitt, Einstrahlung, Topografie, Schutzräume und Netzoptionen werden in einem frühen Screening zusammengeführt.",
  },
  {
    title: "Technisches Konzept",
    text: "Modulfelder, Speichergrößen, Wege, Trafostationen und Netzstrategie werden in ein belastbares Projektlayout übersetzt.",
  },
  {
    title: "Genehmigung & Netzklärung",
    text: "Planungsrecht, kommunale Abstimmung, Gutachten und Netzanschluss werden strukturiert parallel vorangetrieben.",
  },
  {
    title: "Bau & Inbetriebnahme",
    text: "Die Umsetzung folgt einem klaren Qualitäts-, Termin- und Schnittstellenmanagement bis zur netzgekoppelten Inbetriebnahme.",
  },
  {
    title: "Betrieb & Optimierung",
    text: "Monitoring, Performance-Auswertung und technische Betriebsführung sichern die langfristige Anlagenqualität.",
  },
];

export function ProjectPhasesSection() {
  return (
    <section className="relative bg-[#fbf8f1] px-6 py-28 text-[var(--foreground)] lg:px-8">
      <div className="premium-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(180deg,transparent,black_20%,black_80%,transparent)]" />
      <div className="relative mx-auto max-w-7xl">
        <FadeInUp className="max-w-3xl">
          <SectionLabel>Projektphasen</SectionLabel>
          <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Ein klarer Pfad von der Analyse bis zum Betrieb.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            Premium-Projektentwicklung bedeutet, technische Entscheidungen nachvollziehbar zu strukturieren und jede Phase investorenfähig zu dokumentieren.
          </p>
        </FadeInUp>

        <div className="relative mt-16">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border)] to-transparent md:block" />
          <div className="space-y-5">
            {phases.map((phase, index) => (
              <AnimatedCard key={phase.title} delay={index * 0.06} className="relative md:pl-20">
                <div className="absolute left-0 top-8 hidden h-12 w-12 items-center justify-center rounded-full border border-[var(--accent)]/40 bg-[var(--card)] text-sm font-semibold text-[var(--primary)] shadow-sm md:flex">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <article className="grid gap-6 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-7 shadow-[0_20px_55px_rgba(20,33,28,0.08)] md:grid-cols-[0.42fr_1fr] md:p-8">
                  <div>
                    <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)] md:hidden">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-[var(--primary)] md:mt-0">{phase.title}</h3>
                  </div>
                  <p className="text-base leading-7 text-[var(--muted)]">{phase.text}</p>
                </article>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
