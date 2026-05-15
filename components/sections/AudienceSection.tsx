import { AnimatedCard, FadeInUp } from "@/components/ui/MotionPrimitives";
import { SectionLabel } from "@/components/ui/SectionLabel";

const audiences = [
  {
    title: "Flächeneigentümer",
    text: "Wir prüfen, ob Flächen für PV- und Speicherprojekte geeignet sind und welche Entwicklungsschritte realistisch folgen.",
  },
  {
    title: "Unternehmen & Kommunen",
    text: "Standorte werden mit Blick auf Eigenerzeugung, regionale Infrastruktur und langfristige Versorgungssicherheit bewertet.",
  },
  {
    title: "Investoren & Projektpartner",
    text: "Technik, Genehmigungsstand und Netzstrategie werden transparent aufbereitet, damit Entscheidungen belastbar bleiben.",
  },
];

export function AudienceSection() {
  return (
    <section className="bg-[var(--background)] px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeInUp className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <SectionLabel>Zielgruppen</SectionLabel>
            <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Für Flächen, Kapital und Infrastrukturverantwortung.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] lg:justify-self-end">
            Die Website spricht Partner an, die nicht nur Erzeugungsanlagen suchen, sondern belastbare Energieinfrastruktur entwickeln, finanzieren oder ermöglichen wollen.
          </p>
        </FadeInUp>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {audiences.map((audience, index) => (
            <AnimatedCard
              key={audience.title}
              delay={index * 0.08}
              className="group rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-7 shadow-[0_20px_55px_rgba(20,33,28,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(20,33,28,0.12)]"
            >
              <div className="mb-12 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)] text-sm font-semibold text-[var(--accent-soft)]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--primary)]">{audience.title}</h3>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">{audience.text}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
