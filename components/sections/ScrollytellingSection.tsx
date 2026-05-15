"use client";

import { motion } from "framer-motion";
import { PremiumMediaFrame } from "@/components/media/PremiumMediaFrame";
import { ScrollScrubVideo } from "@/components/scrollytelling/ScrollScrubVideo";

const storyItems = [
  {
    title: "Flächen identifizieren",
    text: "Wir analysieren Standorte nach Einstrahlung, Netzverfügbarkeit, Topografie und Entwicklungspotenzial.",
    variant: "land" as const,
  },
  {
    title: "PV-Park planen",
    text: "Aus der Fläche entsteht ein belastbares Energiekonzept mit Modulfeldern, Wegen, Trafostationen und Netzstrategie.",
    variant: "solar" as const,
  },
  {
    title: "Speicher integrieren",
    text: "Batteriespeicher erhöhen Flexibilität, verbessern die Netzintegration und schaffen zusätzliche Erlöspotenziale.",
    variant: "battery" as const,
  },
  {
    title: "Netzgekoppelt betreiben",
    text: "Nach Genehmigung und Bau wird das Projekt in eine stabile Energieinfrastruktur überführt.",
    variant: "grid" as const,
  },
];

export function ScrollytellingSection() {
  return (
    <section id="prozess" className="relative bg-[#07130F]">
      <ScrollScrubVideo steps={storyItems} />

      <div className="px-6 py-24 lg:hidden">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#D6A84F]">Entwicklungspfad</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[#F8F5EF]">
            Von der Fläche zur netzgekoppelten Energieinfrastruktur.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#F8F5EF]/68">
            Mobile wird die Story bewusst leichter erzählt: Schritt für Schritt, ohne schwere Sticky-Komplexität.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-3xl gap-8">
          {storyItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <PremiumMediaFrame eyebrow={`Schritt 0${index + 1}`} title={item.title} description={item.text} variant={item.variant} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
