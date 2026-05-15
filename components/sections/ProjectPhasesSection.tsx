"use client";

import { motion } from "framer-motion";

const phases = [
  {
    title: "Standortanalyse",
    text: "Einstrahlung, Topografie, Restriktionen und Netzumfeld werden als belastbare Entscheidungsgrundlage bewertet.",
  },
  {
    title: "Technisches Konzept",
    text: "Layout, Modulfelder, Wege, Trafos, Speicheroptionen und Betriebslogik werden zu einem robusten Konzept verdichtet.",
  },
  {
    title: "Genehmigung & Netzklärung",
    text: "Stakeholder, Kommune, Netzbetreiber und Genehmigungspfad werden frühzeitig strukturiert und nachvollziehbar geführt.",
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
    <section className="bg-[var(--background)] px-6 py-28 text-[var(--foreground)] lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--primary)]/70">Projektphasen</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">PV-Parks mit System und Investitionslogik.</h2>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            Wir strukturieren Projekte so, dass technische Entscheidungen, Investitionssicherheit und Umsetzbarkeit transparent bleiben — vom ersten Standortsignal bis zum stabilen Betrieb.
          </p>
        </div>
        <div className="relative mt-16 grid gap-5 md:grid-cols-5">
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-[var(--primary)]/25 to-transparent md:block" />
          {phases.map((phase, index) => (
            <motion.article
              key={phase.title}
              className="relative rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl shadow-[#0E3B2E]/5"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: index * 0.06, ease: "easeOut" }}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--primary)]/15 bg-[var(--background)] text-sm font-semibold text-[var(--primary)] shadow-sm">
                0{index + 1}
              </span>
              <h3 className="mt-8 min-h-16 text-xl font-semibold tracking-[-0.025em]">{phase.title}</h3>
              <p className="mt-5 text-sm leading-6 text-[var(--muted)]">{phase.text}</p>
              <div className="mt-8 h-px bg-gradient-to-r from-[var(--accent)]/70 to-transparent" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
