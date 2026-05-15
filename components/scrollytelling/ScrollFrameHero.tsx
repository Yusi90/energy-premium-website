"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CanvasSequence } from "@/components/scrollytelling/CanvasSequence";

const steps = [
  {
    title: "Fläche analysieren",
    text: "Wir bewerten Einstrahlung, Topografie, Netzverfügbarkeit und Entwicklungspotenzial.",
  },
  {
    title: "PV-Park planen",
    text: "Aus der Fläche entsteht ein technisches Konzept mit Modulfeldern, Wegen, Trafos und Netzstrategie.",
  },
  {
    title: "Speicher integrieren",
    text: "Batteriespeicher erhöhen Flexibilität, verbessern die Netzintegration und schaffen zusätzliche Erlöspotenziale.",
  },
  {
    title: "Netz anschließen",
    text: "Das Projekt wird in eine stabile, netzgekoppelte Energieinfrastruktur überführt.",
  },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function ScrollFrameHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
      const nextProgress = clamp(-rect.top / scrollableDistance);
      setProgress(nextProgress);
      frameRef.current = null;
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) {
        return;
      }
      frameRef.current = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const activeStep = useMemo(() => {
    return Math.min(steps.length - 1, Math.floor(clamp(progress) * steps.length));
  }, [progress]);

  const active = steps[activeStep];
  const frameNumber = Math.round(progress * 11) + 1;

  return (
    <section ref={sectionRef} className="relative h-[500vh] bg-[#07130F] text-[#F8F5EF]" aria-label="Canvas Scrollytelling Demo">
      <div className="sticky top-0 h-screen overflow-hidden">
        <CanvasSequence progress={progress} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07130F]/92 via-[#07130F]/38 to-[#07130F]/18" />
        <div className="absolute inset-x-0 top-0 z-20 border-b border-[#F8F5EF]/10 bg-[#07130F]/30 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
            <a href="#top" className="text-xs font-semibold uppercase tracking-[0.28em] text-[#F7F3EA]">
              Energy Infrastructure
            </a>
            <a
              href="#kontakt"
              className="rounded-full border border-[#F7F3EA]/18 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#F7F3EA] transition hover:border-[#D6A84F]/70 hover:text-[#D6A84F]"
            >
              Projekt besprechen
            </a>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid h-full max-w-7xl content-center px-5 pt-20 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="max-w-3xl">
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.34em] text-[#D6A84F] sm:text-sm"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Canvas Frame Sequence
            </motion.p>
            <motion.h1
              className="mt-5 max-w-4xl text-[clamp(3.1rem,8vw,7.9rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-[#F8F5EF]"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: "easeOut" }}
            >
              Skalierbare Solar- und Speicherparks für die Energieinfrastruktur von morgen.
            </motion.h1>
            <motion.p
              className="mt-7 max-w-2xl text-lg leading-8 text-[#F8F5EF]/72 sm:text-xl"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.16, ease: "easeOut" }}
            >
              Scrollen Sie durch den Weg von der Fläche zur netzgekoppelten Energieinfrastruktur.
            </motion.p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#kontakt"
                className="inline-flex w-fit items-center justify-center rounded-full bg-[#F7F3EA] px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#07130F] transition hover:bg-[#D6A84F] focus:outline-none focus:ring-2 focus:ring-[#D6A84F] focus:ring-offset-2 focus:ring-offset-[#07130F]"
              >
                Projekt besprechen
              </a>
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F8F5EF]/52">Scroll steuert Frame {String(frameNumber).padStart(2, "0")}/12</span>
            </div>

            <div className="mt-12 max-w-xl rounded-[2rem] border border-[#F8F5EF]/12 bg-[#07130F]/42 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#7BC7B5] shadow-[0_0_18px_rgba(123,199,181,0.7)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D6A84F]">Aktiver Beat 0{activeStep + 1}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <h2 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-[#F8F5EF] sm:text-3xl">{active.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#F8F5EF]/68 sm:text-base sm:leading-7">{active.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-5 right-5 z-20 mx-auto max-w-7xl lg:left-8 lg:right-8">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="h-1 overflow-hidden rounded-full bg-[#F8F5EF]/12">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#D6A84F] via-[#1F6B53] to-[#7BC7B5] transition-[width] duration-150 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between gap-4 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#F8F5EF]/55 lg:min-w-[34rem]">
              {steps.map((step, index) => (
                <span key={step.title} className={index === activeStep ? "text-[#D6A84F]" : undefined}>
                  0{index + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
