import { FadeInUp } from "@/components/ui/MotionPrimitives";
import { SectionLabel } from "@/components/ui/SectionLabel";

const topics = ["Projektfläche", "Batteriespeicher", "PV-Park", "Investorenanfrage"];

export function ContactSection() {
  return (
    <section id="kontakt" className="relative overflow-hidden bg-[var(--primary-dark)] px-6 py-28 text-[var(--background)] lg:px-8">
      <div className="dark-grid absolute inset-0 opacity-45" />
      <div className="absolute left-1/2 top-0 h-[34rem] w-[44rem] -translate-x-1/2 rounded-full bg-[var(--accent)]/12 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <FadeInUp>
          <div className="overflow-hidden rounded-[2.5rem] border border-[var(--border-light)] bg-[linear-gradient(145deg,rgba(255,255,255,0.11),rgba(255,255,255,0.04))] p-7 shadow-[0_35px_100px_rgba(0,0,0,0.26)] backdrop-blur md:p-10 lg:p-14">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <SectionLabel tone="light">Nächster Schritt</SectionLabel>
                <h2 className="mt-6 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                  Bereit, Energieinfrastruktur skalierbar zu entwickeln?
                </h2>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-[#d8e1dc]">
                  Ob Projektfläche, Unternehmensstandort oder Investitionsvorhaben — wir prüfen das Potenzial und besprechen den nächsten sinnvollen Schritt.
                </p>
                <a
                  href="mailto:kontakt@energy-premium.example?subject=Projektanfrage%20Energieinfrastruktur"
                  className="mt-10 inline-flex items-center justify-center rounded-full bg-[var(--accent-soft)] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary-dark)] shadow-[0_18px_45px_rgba(214,168,79,0.18)] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Projektanfrage starten
                </a>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-[#0d2119]/80 p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent-soft)]">Kontaktkarte</p>
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--secondary)] shadow-[0_0_18px_rgba(123,199,181,0.55)]" />
                </div>
                <div className="mt-6 grid gap-3">
                  {topics.map((topic) => (
                    <div key={topic} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 text-sm text-[#d8e1dc]">
                      <span>{topic}</span>
                      <span className="h-px w-10 bg-[var(--accent)]/60" />
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-6 text-[#aebdb5]">
                  Kein öffentliches Formular: Der CTA öffnet eine direkte Projektanfrage per E-Mail. Sensible Standortdaten können anschließend vertraulich ausgetauscht werden.
                </p>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
