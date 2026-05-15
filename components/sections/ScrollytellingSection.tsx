"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PremiumMediaFrame } from "@/components/media/PremiumMediaFrame";
import { ScrollScrubVideo } from "@/components/scrollytelling/ScrollScrubVideo";
import { SectionLabel } from "@/components/ui/SectionLabel";

const steps = [
  {
    eyebrow: "01 · Fläche",
    title: "Flächen identifizieren",
    text: "Wir analysieren Standorte nach Einstrahlung, Netzverfügbarkeit, Topografie und Entwicklungspotenzial.",
    variant: "land" as const,
  },
  {
    eyebrow: "02 · PV-Park",
    title: "PV-Park planen",
    text: "Aus der Fläche entsteht ein belastbares Energiekonzept mit Modulfeldern, Wegen, Trafostationen und Netzstrategie.",
    variant: "solar" as const,
  },
  {
    eyebrow: "03 · Speicher",
    title: "Speicher integrieren",
    text: "Batteriespeicher erhöhen Flexibilität, verbessern die Netzintegration und schaffen zusätzliche Erlöspotenziale.",
    variant: "battery" as const,
  },
  {
    eyebrow: "04 · Netz",
    title: "Netzgekoppelt betreiben",
    text: "Nach Genehmigung und Bau wird das Projekt in eine stabile Energieinfrastruktur überführt.",
    variant: "grid" as const,
  },
];

export function ScrollytellingSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="story" className="relative bg-[var(--background)]">
      <div className="px-6 py-24 lg:hidden">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Scrollytelling</SectionLabel>
          <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.045em] text-[var(--foreground)]">
            Von der Fläche zur netzgekoppelten Energieinfrastruktur.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            Auf mobilen Geräten wird die Story bewusst leicht erzählt: klare Schritte, große Visuals und keine schwere Sticky-Mechanik.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-8">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
              className="space-y-5"
            >
              <PremiumMediaFrame eyebrow={step.eyebrow} title={step.title} description={step.text} variant={step.variant} />
            </motion.article>
          ))}
        </div>
      </div>

      <ScrollScrubVideo steps={steps} videoSrc="/media/hero-video.mp4" />
    </section>
  );
}
