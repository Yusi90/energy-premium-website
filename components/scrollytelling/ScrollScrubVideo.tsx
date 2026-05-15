"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { PremiumMediaFrame } from "@/components/media/PremiumMediaFrame";

type ScrollStep = {
  title: string;
  text: string;
  variant: "solar" | "battery" | "grid" | "land";
};

type ScrollScrubVideoProps = {
  steps: ScrollStep[];
  videoSrc?: string;
};

export function ScrollScrubVideo({ steps, videoSrc = "/media/hero-video.mp4" }: ScrollScrubVideoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [duration, setDuration] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const activeStep = steps[activeIndex] ?? steps[0];

  useEffect(() => {
    return scrollYProgress.on("change", (value) => {
      const nextIndex = Math.min(steps.length - 1, Math.max(0, Math.floor(value * steps.length)));
      setActiveIndex(nextIndex);

      const video = videoRef.current;
      if (!video || !duration || reduceMotion) {
        return;
      }

      const targetTime = Math.min(duration - 0.05, Math.max(0, value * duration));
      if (Number.isFinite(targetTime)) {
        video.currentTime = targetTime;
      }
    });
  }, [duration, reduceMotion, scrollYProgress, steps.length]);

  const checkpoints = useMemo(() => steps.map((_, index) => `${Math.round((index / Math.max(1, steps.length - 1)) * 100)}%`), [steps]);

  return (
    <section ref={sectionRef} className="relative hidden min-h-[320vh] bg-[#07130F] px-6 lg:block lg:px-8">
      <div className="sticky top-0 mx-auto grid min-h-screen max-w-7xl grid-cols-[0.88fr_1.12fr] items-center gap-12 py-16">
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#D6A84F]">Geführte Projektentwicklung</p>
          <h2 className="mt-5 max-w-xl text-5xl font-semibold tracking-[-0.045em] text-[#F8F5EF]">
            Vom Standortsignal zur netzgekoppelten Energieinfrastruktur.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#F8F5EF]/68">
            Der Scrollpfad verbindet Analyse, Planung, Speicherintegration und Netzanschluss zu einer ruhigen, nachvollziehbaren Projektstory.
          </p>

          <div className="mt-12 grid gap-4">
            {steps.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.article
                  key={step.title}
                  className="relative rounded-3xl border p-5 transition-colors"
                  animate={{
                    borderColor: isActive ? "rgba(214,168,79,0.55)" : "rgba(248,245,239,0.1)",
                    backgroundColor: isActive ? "rgba(248,245,239,0.075)" : "rgba(248,245,239,0.025)",
                    opacity: isActive ? 1 : 0.62,
                  }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  <div className="flex gap-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D6A84F]">0{index + 1}</span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#F8F5EF]">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#F8F5EF]/64">{step.text}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-8 h-[calc(100%-4rem)] w-px bg-[#F8F5EF]/12">
            <motion.div className="w-px origin-top bg-gradient-to-b from-[#D6A84F] to-[#7BC7B5]" style={{ height: progressHeight }} />
            {checkpoints.map((top) => (
              <span key={top} className="absolute -left-1.5 h-3 w-3 rounded-full border border-[#D6A84F]/50 bg-[#07130F]" style={{ top }} />
            ))}
          </div>
          <motion.div style={{ y: reduceMotion ? 0 : visualY }} transition={{ duration: 0.8 }}>
            <div className="relative overflow-hidden rounded-[2.4rem] border border-[#F8F5EF]/12 bg-[#07130F] p-3 shadow-2xl shadow-black/35">
              {!videoFailed && (
                <video
                  ref={videoRef}
                  className="absolute inset-3 z-10 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] rounded-[1.8rem] object-cover opacity-90 mix-blend-screen"
                  src={videoSrc}
                  muted
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
                  onError={() => setVideoFailed(true)}
                />
              )}
              <PremiumMediaFrame
                title={activeStep.title}
                eyebrow="Scroll-Scrubbing bereit"
                description={activeStep.text}
                variant={activeStep.variant}
                className="min-h-[34rem]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
