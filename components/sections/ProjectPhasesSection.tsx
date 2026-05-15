"use client";

import { motion } from "framer-motion";

const phases = [
  {
    title: "Standortanalyse",
    text: "Einstrahlung, Topografie, Restriktionen und Netzumfeld werden zu einer belastbaren Entscheidungsgrundlage verdichtet.",
  },
  {
    title: "Technisches Konzept",
    text: "Modulfelder, Wege, Trafos, Speicheroptionen und Netzstrategie werden als integriertes Infrastruktur-Layout geplant.",
  },
  {
    title: "Genehmigung & Netzklärung",
    text: "Kommunale Abstimmung, Genehmigungspfad und Netzbetreiberkommunikation laufen frühzeitig und nachvollziehbar zusammen.",
  },
  {
    title: "Bau & Inbetriebnahme",
    text: "Beschaffung, Baukoordination und technische Abnahme folgen einem klaren, qualitätsgesicherten Umsetzungsplan.",
  },
  {
    title: "Betrieb & Optimierung",
    text: "Monitoring, Verfügbarkeit und Erweiterbarkeit sichern langfristig stabile Energieinfrastruktur und Ertragspotenziale.",
  },
];

export function ProjectPhasesSection() {
  return (
    <section className="relative overflow-hidden bg-[#F7F3EA] px-5 py-28 text-[#14211C] sm:py-36 lg:px-8">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#D6A84F]/60 to-transparent" />
      <div className="absolute -right-28 top-20 h-80 w-80 rounded-full bg-[#D6A84F]/20 blur-3xl" />
      <div className="absolute -left-36 bottom-10 h-96 w-96 rounded-full bg-[#1F6B53]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#0E3B2E]/70">Projektphasen</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl">
              Vom Flächensignal zur investierbaren Infrastruktur.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#14211C]/68">
            Nach der Canvas-Story folgt der belastbare Prozess: Jede Phase verbindet technische Prüfung, wirtschaftliche Logik und Umsetzungssicherheit.
          </p>
        </div>

        <div className="relative mt-18 grid gap-5 md:grid-cols-5">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-[#0E3B2E]/24 to-transparent md:block" />
          {phases.map((phase, index) => (
            <motion.article
              key={phase.title}
              className="group relative min-h-72 rounded-[2rem] border border-[#14211C]/10 bg-[#fffaf0]/82 p-6 shadow-[0_28px_80px_rgba(14,59,46,0.09)] backdrop-blur"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: index * 0.06, ease: "easeOut" }}
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#0E3B2E]/15 bg-[#F7F3EA] text-sm font-bold text-[#0E3B2E] shadow-sm">
                0{index + 1}
              </span>
              <h3 className="mt-9 text-xl font-semibold tracking-[-0.03em] text-[#14211C]">{phase.title}</h3>
              <p className="mt-5 text-sm leading-6 text-[#14211C]/62">{phase.text}</p>
              <div className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-[#D6A84F]/75 via-[#0E3B2E]/18 to-transparent" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
