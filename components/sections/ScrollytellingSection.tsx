"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const steps = [
  {
    eyebrow: "01",
    title: "Flächen identifizieren",
    text: "Wir analysieren Standorte nach Einstrahlung, Netzverfügbarkeit, Topografie und Entwicklungspotenzial.",
    metric: "Standort",
  },
  {
    eyebrow: "02",
    title: "PV-Park planen",
    text: "Aus der Fläche entsteht ein belastbares Energiekonzept mit Modulfeldern, Wegen, Trafostationen und Netzstrategie.",
    metric: "Layout",
  },
  {
    eyebrow: "03",
    title: "Speicher integrieren",
    text: "Batteriespeicher erhöhen Flexibilität, verbessern die Netzintegration und schaffen zusätzliche Erlöspotenziale.",
    metric: "Flexibilität",
  },
  {
    eyebrow: "04",
    title: "Netzgekoppelt betreiben",
    text: "Nach Genehmigung und Bau wird das Projekt in eine stabile Energieinfrastruktur überführt.",
    metric: "Betrieb",
  },
];

export function ScrollytellingSection() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const visualY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [34, -34]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextStep = Math.min(steps.length - 1, Math.max(0, Math.floor(latest * steps.length)));
    setActiveStep(nextStep);
  });

  return (
    <section id="story" ref={containerRef} className="relative bg-[var(--background)] px-6 py-28 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
          <div className="flex h-full flex-col justify-center">
            <SectionLabel>Scrollytelling</SectionLabel>
            <h2 className="mt-6 max-w-xl text-balance text-4xl font-semibold tracking-[-0.045em] text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              Von der Fläche zur netzgekoppelten Energieinfrastruktur.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
              Jeder Schritt reduziert Projektrisiken: Standort, Technik, Speicherintegration und Netzanschluss werden früh als zusammenhängendes System betrachtet.
            </p>

            <div className="mt-10 flex items-center gap-5">
              <div className="relative h-24 w-px overflow-hidden rounded-full bg-[var(--border)]">
                <motion.div className="absolute left-0 top-0 h-full w-full origin-top bg-[var(--accent)]" style={{ scaleY: lineScale }} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Aktiver Schritt</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--primary)]">{steps[activeStep].metric}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <motion.div style={{ y: visualY }} className="sticky top-24 z-0 mb-8 hidden h-[30rem] overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--primary-dark)] p-6 shadow-[0_28px_70px_rgba(20,33,28,0.16)] lg:block">
            <div className="dark-grid absolute inset-0 opacity-55" />
            <div className="relative flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_72%_20%,rgba(214,168,79,0.18),transparent_28%),linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-7">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[var(--accent-soft)]/90">
                <span>Projektmodell</span>
                <span>{steps[activeStep].eyebrow}</span>
              </div>
              <div className="relative mx-auto h-56 w-full max-w-lg">
                <div className="absolute bottom-8 left-0 grid w-3/5 grid-cols-5 gap-2 transition-opacity duration-500" style={{ opacity: activeStep >= 0 ? 1 : 0.35 }}>
                  {Array.from({ length: 20 }).map((_, index) => (
                    <span key={index} className="h-7 rounded bg-[#244d57] shadow-inner ring-1 ring-white/10" />
                  ))}
                </div>
                <div className={`absolute bottom-10 right-12 grid gap-2 transition-all duration-700 ${activeStep >= 2 ? "translate-y-0 opacity-100" : "translate-y-6 opacity-35"}`}>
                  {[0, 1, 2].map((item) => (
                    <span key={item} className="h-8 w-28 rounded-md bg-[#e4ded0] shadow-sm" />
                  ))}
                </div>
                <div className={`absolute right-0 top-8 h-24 w-32 rounded-lg border border-white/15 bg-white/10 transition-opacity duration-700 ${activeStep >= 3 ? "opacity-100" : "opacity-35"}`}>
                  <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/30" />
                  <span className="absolute left-3 right-3 top-1/2 h-px bg-white/30" />
                </div>
                <div className="absolute left-1/4 top-1/2 h-px w-2/3 bg-gradient-to-r from-[var(--accent)] via-[var(--secondary)] to-transparent opacity-70" />
                <motion.div
                  className="absolute top-[47%] h-2 w-2 rounded-full bg-[var(--accent-soft)] shadow-[0_0_20px_rgba(243,217,154,0.55)]"
                  animate={prefersReducedMotion ? undefined : { left: ["22%", "78%"] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/45">{steps[activeStep].title}</p>
                <p className="mt-3 max-w-lg text-2xl font-semibold tracking-[-0.03em] text-[var(--accent-soft)]">{steps[activeStep].text}</p>
              </div>
            </div>
          </motion.div>

          <div className="relative z-10 space-y-6 lg:-mt-[30rem] lg:pt-[34rem]">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <motion.article
                  key={step.title}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`rounded-[2rem] border p-7 shadow-sm transition-all duration-500 lg:min-h-[18rem] ${
                    isActive
                      ? "border-[var(--accent)]/55 bg-[var(--card)] shadow-[0_28px_65px_rgba(20,33,28,0.12)]"
                      : "border-[var(--border)] bg-white/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">{step.eyebrow}</span>
                    <span className={`h-3 w-3 rounded-full ${isActive ? "bg-[var(--accent)]" : "bg-[var(--border)]"}`} />
                  </div>
                  <h3 className="mt-12 text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">{step.title}</h3>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">{step.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
