"use client";

import { motion } from "framer-motion";
import { PremiumMediaFrame } from "@/components/media/PremiumMediaFrame";

const features = [
  {
    title: "Netzstabilität",
    text: "Speicher reagieren schnell auf volatile Einspeisung und unterstützen eine planbare, netzdienliche Betriebsführung.",
  },
  {
    title: "Flexibilität & Lastverschiebung",
    text: "Energie wird dort verfügbar, wo Zeitfenster, Netzkapazitäten und Vermarktungsoptionen den höchsten Nutzen schaffen.",
  },
  {
    title: "Zusätzliche Erlöspotenziale",
    text: "PV, Speicher und Netzanschluss werden als integriertes Asset mit professioneller Betriebslogik gedacht.",
  },
];

export function BatteryStorageSection() {
  return (
    <section className="relative overflow-hidden bg-[#07130F] px-6 py-28 text-[#F8F5EF] lg:px-8">
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-[#7BC7B5]/10 blur-3xl" />
      <div className="absolute left-[-10rem] bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#D6A84F]/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <PremiumMediaFrame
            eyebrow="Speicherparks"
            title="Batteriespeicher als strategischer Infrastrukturbaustein."
            description="Container, Umrichter, Netzanschluss und Betriebsmodell werden gemeinsam geplant — ruhig, skalierbar und professionell betreibbar."
            imageSrc="/media/battery-storage.jpg"
            variant="battery"
          />
        </motion.div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#D6A84F]">Batteriespeicherparks</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Mehr Flexibilität für volatile Erzeugung und stabile Netze.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#F8F5EF]/68">
            Batteriespeicher erhöhen Flexibilität, verbessern die Netzintegration, ermöglichen Lastverschiebung und schaffen wirtschaftliche Zusatzpotenziale. Wir denken Speicher, PV-Erzeugung und Netzanschluss als zusammenhängende Energieinfrastruktur.
          </p>
          <div className="mt-10 grid gap-4">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                className="rounded-3xl border border-[#F8F5EF]/10 bg-[#F8F5EF]/[0.045] p-6 backdrop-blur"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: "easeOut" }}
              >
                <div className="mb-5 h-1.5 w-14 rounded-full bg-gradient-to-r from-[#D6A84F] to-[#7BC7B5]" />
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#F8F5EF]/64">{feature.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
