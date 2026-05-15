"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

type PremiumMediaFrameProps = {
  title: string;
  eyebrow: string;
  description: string;
  imageSrc?: string;
  videoSrc?: string;
  variant: "solar" | "battery" | "grid" | "land";
  className?: string;
};

const variantCopy = {
  land: { label: "Flächenanalyse", stat: "Topografie · Netz · Potenzial" },
  solar: { label: "PV-Konzept", stat: "Modulfeld · Wege · Trafo" },
  battery: { label: "Speicherpark", stat: "Flexibilität · Lastverschiebung" },
  grid: { label: "Netzintegration", stat: "Umspannwerk · Betrieb" },
} as const;

function LandVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_25%_20%,rgba(214,168,79,0.18),transparent_30%),linear-gradient(145deg,#f4ebdc,#d9c9aa)]">
      <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 900 620" fill="none" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, index) => (
          <path
            key={index}
            d={`M${-80 + index * 28} ${180 + index * 42} C 130 ${80 + index * 28}, 260 ${300 + index * 18}, 420 ${180 + index * 36} S 700 ${110 + index * 40}, 980 ${240 + index * 34}`}
            stroke="#0E3B2E"
            strokeOpacity="0.18"
            strokeWidth="2"
          />
        ))}
      </svg>
      <div className="absolute left-[18%] top-[34%] h-3 w-3 rounded-full bg-[var(--accent)] shadow-[0_0_24px_rgba(214,168,79,0.55)]" />
      <div className="absolute left-[58%] top-[48%] h-2.5 w-2.5 rounded-full bg-[var(--primary)]/80" />
      <div className="absolute bottom-[18%] right-[18%] h-24 w-36 rounded-[1.2rem] border border-[var(--primary)]/20 bg-white/30 backdrop-blur" />
    </div>
  );
}

function SolarVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_72%_18%,rgba(214,168,79,0.24),transparent_22%),linear-gradient(145deg,#0c2119,#07130f)]">
      <div className="absolute inset-0 dark-grid opacity-55" />
      <div className="absolute bottom-[20%] left-[8%] grid w-[62%] -rotate-6 grid-cols-6 gap-2">
        {Array.from({ length: 36 }).map((_, index) => (
          <span key={index} className="h-8 rounded-[0.35rem] bg-[#1f4850] ring-1 ring-white/10 shadow-inner" />
        ))}
      </div>
      <div className="absolute right-[14%] top-[20%] h-16 w-16 rounded-full bg-[var(--accent)]/70 blur-xl" />
      <div className="absolute left-[20%] top-[52%] h-px w-[62%] bg-gradient-to-r from-transparent via-[var(--accent)] to-[var(--cyan)] opacity-70" />
    </div>
  );
}

function BatteryVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_60%_24%,rgba(123,199,181,0.14),transparent_28%),linear-gradient(145deg,#10251d,#07130f)]">
      <div className="absolute inset-0 dark-grid opacity-45" />
      <div className="absolute left-[14%] right-[14%] top-[26%] grid gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
            <span className="h-12 w-28 rounded-xl bg-[#ddd6c7]" />
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.span className="block h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--cyan)]" animate={{ x: ["-55%", "0%", "45%"] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GridVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_50%_18%,rgba(214,168,79,0.16),transparent_24%),linear-gradient(145deg,#0b1b16,#07130f)]">
      <div className="absolute inset-0 dark-grid opacity-60" />
      <div className="absolute left-[16%] top-[46%] h-px w-[68%] bg-gradient-to-r from-[var(--accent)] via-[var(--cyan)] to-transparent opacity-75" />
      <div className="absolute right-[16%] top-[25%] h-40 w-52 rounded-[1.4rem] border border-white/14 bg-white/[0.055]">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/18" />
        <span className="absolute left-4 right-4 top-1/2 h-px bg-white/18" />
        <span className="absolute left-8 top-8 h-2 w-2 rounded-full bg-[var(--accent-soft)]" />
        <span className="absolute bottom-8 right-10 h-2 w-2 rounded-full bg-[var(--cyan)]" />
      </div>
      <div className="absolute bottom-[22%] left-[14%] grid grid-cols-5 gap-2 opacity-80">
        {Array.from({ length: 15 }).map((_, index) => (
          <span key={index} className="h-7 w-12 rounded bg-[#24454e] ring-1 ring-white/10" />
        ))}
      </div>
    </div>
  );
}

function FallbackVisual({ variant }: { variant: PremiumMediaFrameProps["variant"] }) {
  if (variant === "land") return <LandVisual />;
  if (variant === "solar") return <SolarVisual />;
  if (variant === "battery") return <BatteryVisual />;
  return <GridVisual />;
}

export function PremiumMediaFrame({ title, eyebrow, description, imageSrc, videoSrc, variant, className = "" }: PremiumMediaFrameProps) {
  const prefersReducedMotion = useReducedMotion();
  const [videoAvailable, setVideoAvailable] = useState(Boolean(videoSrc));
  const [imageAvailable, setImageAvailable] = useState(Boolean(imageSrc));
  const showVideo = Boolean(videoSrc && videoAvailable);
  const showImage = !showVideo && Boolean(imageSrc && imageAvailable);
  const meta = useMemo(() => variantCopy[variant], [variant]);

  return (
    <div className={`relative overflow-hidden rounded-[2.25rem] border border-white/35 bg-[var(--primary-dark)] p-3 shadow-[0_35px_100px_rgba(14,59,46,0.22)] ${className}`}>
      <div className="relative min-h-[28rem] overflow-hidden rounded-[1.85rem] border border-white/10 bg-[var(--primary-dark)] md:min-h-[36rem]">
        {showVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={videoSrc}
            preload="metadata"
            muted
            playsInline
            onError={() => setVideoAvailable(false)}
          />
        ) : showImage ? (
          <Image
            className="absolute inset-0 object-cover"
            src={imageSrc as string}
            alt={title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={variant === "solar"}
            onError={() => setImageAvailable(false)}
          />
        ) : (
          <FallbackVisual variant={variant} />
        )}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,15,0.08),rgba(7,19,15,0.52)),radial-gradient(circle_at_72%_18%,rgba(214,168,79,0.16),transparent_26%)]" />
        {!prefersReducedMotion && (
          <motion.div
            className="pointer-events-none absolute left-[-20%] top-[48%] h-px w-[70%] bg-gradient-to-r from-transparent via-[var(--accent-soft)] to-transparent opacity-60"
            animate={{ x: ["0%", "170%"] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <div className="absolute inset-x-5 bottom-5 rounded-[1.35rem] border border-white/12 bg-[#07130f]/72 p-5 text-[var(--background)] shadow-[0_18px_45px_rgba(0,0,0,0.26)] backdrop-blur-md md:inset-x-7 md:bottom-7 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--accent-soft)]">{eyebrow}</p>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-[#d6e3dc]">{meta.label}</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-white md:text-3xl">{title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#d6e3dc] md:text-base">{description}</p>
          <div className="mt-5 h-px w-full bg-gradient-to-r from-[var(--accent)] via-[var(--cyan)] to-transparent opacity-55" />
          <p className="mt-3 text-xs uppercase tracking-[0.22em] text-white/48">{meta.stat}</p>
        </div>
      </div>
    </div>
  );
}
