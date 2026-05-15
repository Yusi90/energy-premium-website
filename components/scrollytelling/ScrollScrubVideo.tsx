"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { PremiumMediaFrame } from "@/components/media/PremiumMediaFrame";

type ScrubStep = {
  eyebrow: string;
  title: string;
  text: string;
  variant: "solar" | "battery" | "grid" | "land";
};

type ScrollScrubVideoProps = {
  steps: ScrubStep[];
  videoSrc?: string;
  className?: string;
};

export function ScrollScrubVideo({ steps, videoSrc = "/media/hero-video.mp4", className = "" }: ScrollScrubVideoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoAvailable, setVideoAvailable] = useState(Boolean(videoSrc));
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 55, damping: 22, restDelta: 0.001 });
  const visualScale = useTransform(smoothProgress, [0, 0.5, 1], prefersReducedMotion ? [1, 1, 1] : [0.985, 1, 0.985]);
  const glowX = useTransform(smoothProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["-16%", "16%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextStep = Math.min(steps.length - 1, Math.max(0, Math.floor(latest * steps.length)));
    setActiveStep(nextStep);

    const video = videoRef.current;
    if (!video || !videoReady || prefersReducedMotion || !Number.isFinite(video.duration)) return;

    const targetTime = Math.min(video.duration - 0.02, Math.max(0, latest * video.duration));
    if (Math.abs(video.currentTime - targetTime) > 0.035) {
      video.currentTime = targetTime;
    }
  });

  const currentStep = steps[activeStep];

  return (
    <section ref={sectionRef} className={`relative hidden h-[320vh] bg-[var(--primary-dark)] lg:block ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden px-8 py-8 text-[var(--background)]">
        <div className="dark-grid absolute inset-0 opacity-40" />
        <motion.div className="absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/10 blur-3xl" style={{ x: glowX }} />

        <div className="relative mx-auto grid h-full max-w-7xl grid-cols-[0.88fr_1.12fr] items-center gap-12">
          <div className="z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent-soft)]">Geführte Projektstory</p>
            <h2 className="mt-6 max-w-xl text-balance text-5xl font-semibold tracking-[-0.055em] text-white">
              Scrollen wie durch eine technische Präsentation.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[#cdd9d2]">
              Das Visual bleibt auf der Bühne, während die Projektlogik Schritt für Schritt sichtbar wird — von der Fläche bis zum netzgekoppelten Betrieb.
            </p>

            <div className="mt-10 flex gap-5">
              <div className="relative mt-2 h-48 w-px overflow-hidden rounded-full bg-white/12">
                <motion.div className="absolute left-0 top-0 h-full w-full origin-top bg-gradient-to-b from-[var(--accent)] to-[var(--cyan)]" style={{ scaleY: smoothProgress }} />
              </div>
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const isActive = index === activeStep;
                  return (
                    <button
                      key={step.title}
                      type="button"
                      className={`block max-w-xl rounded-3xl border p-5 text-left transition-all duration-500 ${
                        isActive
                          ? "border-[var(--accent)]/50 bg-white/[0.095] shadow-[0_20px_55px_rgba(0,0,0,0.18)]"
                          : "border-white/10 bg-white/[0.035] opacity-56"
                      }`}
                      onClick={() => {
                        const top = sectionRef.current?.offsetTop ?? 0;
                        const target = top + (index / Math.max(1, steps.length - 1)) * window.innerHeight * 2.2;
                        window.scrollTo({ top: target, behavior: prefersReducedMotion ? "auto" : "smooth" });
                      }}
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--accent-soft)]">{step.eyebrow}</span>
                      <span className="mt-3 block text-2xl font-semibold tracking-[-0.035em] text-white">{step.title}</span>
                      <span className="mt-3 block text-sm leading-6 text-[#cfdbd4]">{step.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <motion.div style={{ scale: visualScale }} className="relative min-h-[72vh]">
            <div className="absolute inset-5 rounded-[2.5rem] bg-[var(--cyan)]/10 blur-3xl" />
            {videoAvailable ? (
              <div className="relative h-full min-h-[72vh] overflow-hidden rounded-[2.4rem] border border-white/16 bg-[#07130f] p-3 shadow-[0_40px_110px_rgba(0,0,0,0.32)]">
                <video
                  ref={videoRef}
                  className="h-full min-h-[calc(72vh-1.5rem)] w-full rounded-[1.85rem] object-cover"
                  src={videoSrc}
                  preload="metadata"
                  muted
                  playsInline
                  onLoadedMetadata={() => setVideoReady(true)}
                  onError={() => setVideoAvailable(false)}
                />
                <div className="pointer-events-none absolute inset-3 rounded-[1.85rem] bg-[linear-gradient(180deg,rgba(7,19,15,0.05),rgba(7,19,15,0.58))]" />
                <div className="absolute inset-x-10 bottom-10 rounded-[1.5rem] border border-white/12 bg-[#07130f]/72 p-6 backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-soft)]">{currentStep.eyebrow}</p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">{currentStep.title}</h3>
                  <p className="mt-3 max-w-xl text-base leading-7 text-[#d6e3dc]">{currentStep.text}</p>
                </div>
              </div>
            ) : (
              <PremiumMediaFrame
                key={currentStep.variant}
                eyebrow={currentStep.eyebrow}
                title={currentStep.title}
                description={currentStep.text}
                variant={currentStep.variant}
                className="h-full min-h-[72vh]"
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
