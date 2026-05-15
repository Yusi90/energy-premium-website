"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { PremiumMediaFrame } from "@/components/media/PremiumMediaFrame";

const EnergyScene = dynamic(() => import("@/components/three/EnergyScene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-[2rem] border border-[#F8F5EF]/10 bg-[radial-gradient(circle_at_30%_20%,rgba(123,199,181,0.22),transparent_30%),linear-gradient(135deg,#10231c,#07130f)]" />
  ),
});

const metrics = ["PV-Parks", "Batteriespeicher", "Netzanschluss"];

export function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden border-b border-[rgba(20,33,28,0.1)] bg-[var(--background)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_12%,rgba(214,168,79,0.22),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(123,199,181,0.18),transparent_30%),linear-gradient(180deg,#F7F3EA_0%,#EFE7D7_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(20,33,28,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(20,33,28,0.045)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />

      <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.div
          className="relative z-10 max-w-3xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-white/55 px-4 py-2 text-sm text-[var(--primary)] shadow-xl shadow-[#0E3B2E]/5 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(214,168,79,0.9)]" />
            Erneuerbare Energieinfrastruktur
          </div>
          <h1 className="text-balance text-5xl font-semibold tracking-[-0.055em] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
            Skalierbare Solar- und Speicherparks für die Energieinfrastruktur von morgen.
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-[var(--muted)] sm:text-xl">
            Wir entwickeln, planen und realisieren PV- und Batteriespeicherprojekte — von der Flächenanalyse bis zum netzgekoppelten Betrieb.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-full bg-[var(--primary-dark)] px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#F8F5EF] shadow-2xl shadow-[#0E3B2E]/20 transition hover:bg-[var(--primary)]"
            >
              Projekt besprechen
            </a>
            <a
              href="#prozess"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/50 px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary-dark)] transition hover:border-[var(--accent)] hover:bg-white"
            >
              Fläche prüfen lassen
            </a>
          </div>
          <p className="mt-8 text-sm font-medium text-[var(--muted)]">Für Unternehmen, Kommunen, Flächeneigentümer und Investoren</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {metrics.map((metric) => (
              <span key={metric} className="rounded-full border border-[var(--border)] bg-white/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                {metric}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative min-h-[34rem] md:min-h-[44rem]"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.12, ease: "easeOut" }}
        >
          <div className="absolute -left-8 top-12 z-20 hidden rounded-3xl border border-white/15 bg-[#07130F]/82 p-4 text-[#F8F5EF] shadow-2xl shadow-black/20 backdrop-blur md:block">
            <p className="text-xs uppercase tracking-[0.24em] text-[#D6A84F]">Netzstrategie</p>
            <p className="mt-2 text-2xl font-semibold">PV + BESS</p>
          </div>
          <div className="absolute inset-0 hidden overflow-hidden rounded-[2.4rem] border border-[#07130F]/10 bg-[#07130F] shadow-2xl shadow-[#0E3B2E]/20 md:block">
            <EnergyScene />
          </div>
          <div className="absolute inset-x-8 bottom-[-2rem] z-10 hidden md:block">
            <PremiumMediaFrame
              title="Projektentwicklung als Infrastrukturprozess"
              eyebrow="Visual bereit für Media Assets"
              description="Fallback-Visual, bis hero-video.mp4 oder hero-solar.jpg im Medienordner liegt."
              videoSrc="/media/hero-video.mp4"
              imageSrc="/media/hero-solar.jpg"
              variant="solar"
              className="shadow-2xl shadow-black/20"
            />
          </div>
          <div className="md:hidden">
            <PremiumMediaFrame
              title="PV-Parks, Speicher und Netzanschluss"
              eyebrow="Mobile Visual"
              description="Eine kompakte Bühne für Energieinfrastruktur mit hochwertigem Fallback-Visual."
              videoSrc="/media/hero-video.mp4"
              imageSrc="/media/hero-solar.jpg"
              variant="solar"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
