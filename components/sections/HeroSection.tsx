"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PremiumMediaFrame } from "@/components/media/PremiumMediaFrame";

const metrics = [
  { value: "360°", label: "Projektblick" },
  { value: "PV + BESS", label: "integriert geplant" },
  { value: "Netz", label: "früh mitgedacht" },
];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const initial = prefersReducedMotion ? false : { opacity: 0, y: 28 };
  const animate = prefersReducedMotion ? undefined : { opacity: 1, y: 0 };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(135deg,#fbf8f1_0%,#f7f3ea_42%,#eadfc9_100%)]">
      <div className="premium-grid absolute inset-0 -z-20 opacity-70 [mask-image:radial-gradient(circle_at_top_left,black,transparent_72%)]" />
      <div className="absolute -left-24 top-16 -z-10 h-96 w-96 rounded-full bg-[var(--accent)]/20 blur-3xl" />
      <div className="absolute right-0 top-0 -z-10 h-[46rem] w-[46rem] translate-x-1/4 rounded-full bg-[var(--cyan)]/22 blur-3xl" />

      <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="relative z-10 max-w-3xl pt-8">
          <motion.div initial={initial} animate={animate} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            <p className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)] shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              Erneuerbare Energieinfrastruktur
            </p>
          </motion.div>

          <motion.h1
            initial={initial}
            animate={animate}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="mt-8 text-balance text-5xl font-semibold tracking-[-0.055em] text-[var(--foreground)] sm:text-6xl lg:text-7xl"
          >
            Skalierbare Solar- und Speicherparks für die Energieinfrastruktur von morgen.
          </motion.h1>

          <motion.p
            initial={initial}
            animate={animate}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-[var(--muted)] sm:text-xl"
          >
            Wir entwickeln, planen und realisieren PV- und Batteriespeicherprojekte — von der Flächenanalyse bis zum netzgekoppelten Betrieb.
          </motion.p>

          <motion.div
            initial={initial}
            animate={animate}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-soft)] shadow-[0_18px_45px_rgba(14,59,46,0.22)] transition hover:-translate-y-0.5 hover:bg-[var(--primary-dark)]"
            >
              Projekt besprechen
            </a>
            <a
              href="#story"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/55 px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[var(--primary)]/35 hover:bg-white"
            >
              Fläche prüfen lassen
            </a>
          </motion.div>

          <motion.div
            initial={initial}
            animate={animate}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
            className="mt-10 border-l border-[var(--accent)]/55 pl-5 text-sm leading-6 text-[var(--muted)]"
          >
            Für Unternehmen, Kommunen, Flächeneigentümer und Investoren
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 1, delay: 0.42 }}
            className="mt-12 grid max-w-2xl gap-3 sm:grid-cols-3"
          >
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-3xl border border-[var(--border)] bg-white/50 p-5 shadow-sm backdrop-blur">
                <p className="text-xl font-semibold tracking-[-0.03em] text-[var(--primary)]">{metric.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 24 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="relative"
        >
          <div className="absolute inset-6 rounded-[2.8rem] bg-[var(--primary)]/15 blur-2xl" />
          <PremiumMediaFrame
            eyebrow="Energiepark"
            title="PV-Park, Speicher und Netzanschluss als ein System."
            description="Eine ruhige Visual-Bühne für die spätere Asset-Pipeline: Video, Bild oder animierter technischer Fallback ohne externe Medien."
            videoSrc="/media/hero-video.mp4"
            imageSrc="/media/hero-solar.jpg"
            variant="solar"
          />
        </motion.div>
      </div>
    </section>
  );
}
