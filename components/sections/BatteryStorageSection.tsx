import { AnimatedCard, FadeInUp } from "@/components/ui/MotionPrimitives";
import { SectionLabel } from "@/components/ui/SectionLabel";

const features = [
  {
    title: "Netzstabilität",
    text: "Speicher glätten Einspeisung, stellen Leistung zeitlich bereit und unterstützen eine robuste Netzintegration.",
  },
  {
    title: "Flexibilität & Lastverschiebung",
    text: "Erzeugung und Verbrauch werden entkoppelt, sodass Projektstandorte wirtschaftlich und technisch flexibler werden.",
  },
  {
    title: "Zusatzpotenziale",
    text: "Batteriespeicher schaffen Optionen für Vermarktung, Systemdienstleistungen und die Integration volatiler Erzeugung.",
  },
];

export function BatteryStorageSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--primary-dark)] px-6 py-28 text-[var(--background)] lg:px-8">
      <div className="dark-grid absolute inset-0 opacity-45" />
      <div className="absolute -right-24 top-20 h-[32rem] w-[32rem] rounded-full bg-[var(--secondary)]/12 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[22rem] w-[22rem] rounded-full bg-[var(--accent)]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <FadeInUp>
          <div>
            <SectionLabel tone="light">Batteriespeicherparks</SectionLabel>
            <h2 className="mt-6 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.045em] text-[var(--foreground-light,#f8f5ef)] sm:text-5xl lg:text-6xl">
              Batteriespeicher für flexible Netze und belastbare Geschäftsmodelle.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#cbd8d0]">
              Speichercontainer sind nicht nur Ergänzung zum PV-Park. Sie sind ein strategischer Baustein für Netzstabilität, Lastverschiebung und die wirtschaftliche Nutzung erneuerbarer Erzeugung.
            </p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.12}>
          <div className="relative rounded-[2.25rem] border border-[var(--border-light)] bg-white/[0.055] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.24)] backdrop-blur">
            <div className="absolute left-8 right-8 top-1/2 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/60 to-transparent" />
            <div className="relative grid gap-3">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#10261d] p-4">
                  <div className="h-12 w-28 rounded-lg bg-[#ded8c9] shadow-inner" />
                  <div className="h-2 flex-1 rounded-full bg-white/10">
                    <div className="h-full w-2/3 rounded-full bg-[linear-gradient(90deg,var(--accent),var(--secondary))] opacity-70" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>

        <div className="grid gap-5 lg:col-span-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <AnimatedCard
              key={feature.title}
              delay={index * 0.08}
              className="rounded-[2rem] border border-[var(--border-light)] bg-white/[0.055] p-7 shadow-[0_24px_55px_rgba(0,0,0,0.16)] backdrop-blur"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-soft)]">0{index + 1}</span>
              <h3 className="mt-10 text-2xl font-semibold tracking-[-0.03em] text-white">{feature.title}</h3>
              <p className="mt-4 text-base leading-7 text-[#cbd8d0]">{feature.text}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
