"use client";

import { motion } from "framer-motion";

const features = [
  "Netzstabilität",
  "Flexibilität",
  "Lastverschiebung",
  "Integration volatiler Erzeugung",
  "Wirtschaftliche Zusatzpotenziale",
];

export function BatteryStorageSection() {
  return (
    <section className="relative overflow-hidden bg-[#07130F] px-5 py-28 text-[#F8F5EF] sm:py-36 lg:px-8">
      <div className="absolute right-[-10rem] top-16 h-[28rem] w-[28rem] rounded-full bg-[#7BC7B5]/10 blur-3xl" />
      <div className="absolute left-[-14rem] bottom-0 h-[30rem] w-[30rem] rounded-full bg-[#D6A84F]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#D6A84F]">Batteriespeicherparks</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl">
            Flexibilität wird zum technischen Werttreiber.
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#F8F5EF]/68">
            Speicherparks stabilisieren volatile Erzeugung, verschieben Lasten in wertvolle Zeitfenster und machen den Netzanschluss strategisch nutzbar.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {features.map((feature) => (
              <span key={feature} className="rounded-full border border-[#F8F5EF]/12 bg-[#F8F5EF]/[0.045] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F8F5EF]/72">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          className="relative min-h-[34rem] overflow-hidden rounded-[2.6rem] border border-[#F8F5EF]/12 bg-[#0A1813] p-6 shadow-2xl shadow-black/35"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(123,199,181,0.14),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(214,168,79,0.12),transparent_35%)]" />
          <svg className="relative h-full min-h-[30rem] w-full" viewBox="0 0 760 520" role="img" aria-label="Technische Darstellung eines Batteriespeicherparks mit Energiefluss">
            <defs>
              <linearGradient id="containerFill" x1="0" x2="1">
                <stop offset="0" stopColor="#0E3B2E" />
                <stop offset="1" stopColor="#07130F" />
              </linearGradient>
            </defs>
            <path d="M42 424 C190 360 270 388 392 346 C514 304 608 312 720 258" fill="none" stroke="#7BC7B5" strokeOpacity="0.16" strokeWidth="2" />
            <path d="M72 388 C210 334 306 354 444 308 C548 274 632 274 710 236" fill="none" stroke="#D6A84F" strokeOpacity="0.18" strokeWidth="2" />
            {[0, 1, 2, 3, 4].map((item) => (
              <g key={item} transform={`translate(${116 + item * 92} ${258 + (item % 2) * 20})`}>
                <rect width="78" height="96" rx="10" fill="url(#containerFill)" stroke="#7BC7B5" strokeOpacity="0.32" />
                <path d="M14 20h50M14 38h50M14 56h50" stroke="#7BC7B5" strokeOpacity="0.18" strokeWidth="3" />
                <rect x="14" y="72" width="50" height="8" rx="4" fill="#D6A84F" fillOpacity={0.25 + item * 0.08} />
              </g>
            ))}
            <path d="M130 238 C250 164 384 164 510 214 S654 296 704 206" fill="none" stroke="#7BC7B5" strokeWidth="4" strokeLinecap="round" strokeDasharray="18 18" strokeOpacity="0.62" />
            <path d="M96 406 H642" stroke="#F8F5EF" strokeOpacity="0.10" />
            <circle cx="130" cy="238" r="9" fill="#D6A84F" fillOpacity="0.78" />
            <circle cx="510" cy="214" r="10" fill="#7BC7B5" fillOpacity="0.72" />
            <circle cx="704" cy="206" r="12" fill="#7BC7B5" fillOpacity="0.82" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
