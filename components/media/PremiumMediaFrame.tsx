"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

type PremiumMediaVariant = "solar" | "battery" | "grid" | "land";

type PremiumMediaFrameProps = {
  title: string;
  eyebrow: string;
  description: string;
  imageSrc?: string;
  videoSrc?: string;
  variant: PremiumMediaVariant;
  className?: string;
};

const variantCopy: Record<PremiumMediaVariant, { label: string; color: string; glow: string }> = {
  land: { label: "GIS · Topografie", color: "from-[#7BC7B5]/35", glow: "bg-[#7BC7B5]/20" },
  solar: { label: "PV · Layout", color: "from-[#D6A84F]/35", glow: "bg-[#D6A84F]/20" },
  battery: { label: "BESS · Flexibilität", color: "from-[#7BC7B5]/30", glow: "bg-[#7BC7B5]/18" },
  grid: { label: "Netz · Anschluss", color: "from-[#D6A84F]/28", glow: "bg-[#D6A84F]/16" },
};

function LandVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(123,199,181,0.22),transparent_30%),linear-gradient(135deg,#162a22,#07130f_70%)]">
      <div className="absolute inset-8 rounded-[2rem] border border-[#F8F5EF]/10" />
      {[0, 1, 2, 3, 4].map((line) => (
        <div
          key={line}
          className="absolute left-[-8%] h-28 w-[116%] rounded-[50%] border border-[#F7F3EA]/12"
          style={{ top: `${18 + line * 13}%`, transform: `rotate(${-7 + line * 2}deg)` }}
        />
      ))}
      {["18%", "34%", "58%", "76%"].map((left, index) => (
        <span
          key={left}
          className="absolute h-2.5 w-2.5 rounded-full bg-[#7BC7B5] shadow-[0_0_26px_rgba(123,199,181,0.72)]"
          style={{ left, top: `${28 + index * 11}%` }}
        />
      ))}
      <div className="absolute bottom-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#F8F5EF]/30 to-transparent" />
    </div>
  );
}

function SolarVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_82%_18%,rgba(214,168,79,0.34),transparent_22%),linear-gradient(140deg,#10221b,#07130f_68%)]">
      <div className="absolute right-12 top-10 h-16 w-16 rounded-full bg-[#D6A84F]/80 blur-sm" />
      <div className="absolute inset-x-8 bottom-12 grid origin-bottom -skew-y-6 grid-cols-7 gap-2 opacity-90">
        {Array.from({ length: 35 }).map((_, index) => (
          <span key={index} className="h-9 rounded-sm border border-[#F8F5EF]/10 bg-[#122c33]/80 shadow-inner shadow-[#7BC7B5]/10" />
        ))}
      </div>
      <div className="absolute left-10 top-12 h-[70%] w-px bg-gradient-to-b from-[#D6A84F]/0 via-[#D6A84F]/50 to-[#D6A84F]/0" />
      <div className="absolute left-10 right-16 top-1/2 h-px bg-gradient-to-r from-[#D6A84F]/70 via-[#7BC7B5]/40 to-transparent" />
    </div>
  );
}

function BatteryVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_80%_18%,rgba(123,199,181,0.22),transparent_26%),linear-gradient(145deg,#06100d,#10231c_58%,#07130f)]">
      <div className="absolute inset-x-12 bottom-14 grid grid-cols-3 gap-4">
        {[0, 1, 2].map((item) => (
          <div key={item} className="relative h-36 rounded-2xl border border-[#F8F5EF]/12 bg-[#dfe5dd]/10 p-4 shadow-2xl shadow-black/30">
            <div className="h-full rounded-xl border border-[#F8F5EF]/10 bg-gradient-to-br from-[#F8F5EF]/16 to-transparent" />
            <span className="absolute left-5 top-5 h-2 w-12 rounded-full bg-[#7BC7B5]/70" />
          </div>
        ))}
      </div>
      {[18, 34, 50, 66].map((top) => (
        <div key={top} className="absolute left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#7BC7B5]/45 to-transparent" style={{ top: `${top}%` }} />
      ))}
      <span className="absolute right-16 top-16 h-3 w-3 rounded-full bg-[#D6A84F] shadow-[0_0_34px_rgba(214,168,79,0.78)]" />
    </div>
  );
}

function GridVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(rgba(248,245,239,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(248,245,239,0.055)_1px,transparent_1px),radial-gradient(circle_at_50%_30%,rgba(214,168,79,0.18),transparent_30%),#07130f] bg-[size:42px_42px,42px_42px,auto]">
      <div className="absolute bottom-16 left-1/2 h-28 w-44 -translate-x-1/2 rounded-2xl border border-[#F8F5EF]/12 bg-[#F8F5EF]/8" />
      {[-60, 0, 60].map((offset) => (
        <div key={offset} className="absolute bottom-44 left-1/2 h-28 w-px origin-bottom bg-[#F8F5EF]/28" style={{ transform: `translateX(${offset}px) rotate(${offset / 8}deg)` }} />
      ))}
      <div className="absolute left-16 right-16 top-[40%] h-px bg-gradient-to-r from-transparent via-[#D6A84F]/55 to-transparent" />
      <div className="absolute left-[18%] top-[40%] h-3 w-3 rounded-full bg-[#7BC7B5] shadow-[0_0_24px_rgba(123,199,181,0.7)]" />
      <div className="absolute right-[18%] top-[40%] h-3 w-3 rounded-full bg-[#D6A84F] shadow-[0_0_24px_rgba(214,168,79,0.7)]" />
    </div>
  );
}

function FallbackVisual({ variant }: { variant: PremiumMediaVariant }) {
  const reduceMotion = useReducedMotion();
  const Visual = variant === "land" ? LandVisual : variant === "solar" ? SolarVisual : variant === "battery" ? BatteryVisual : GridVisual;

  return (
    <motion.div
      className="absolute inset-0"
      animate={reduceMotion ? undefined : { scale: [1, 1.025, 1], y: [0, -8, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    >
      <Visual />
    </motion.div>
  );
}

export function PremiumMediaFrame({ title, eyebrow, description, imageSrc, videoSrc, variant, className = "" }: PremiumMediaFrameProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const showVideo = Boolean(videoSrc && !videoFailed);
  const showImage = Boolean(!showVideo && imageSrc && !imageFailed);
  const meta = variantCopy[variant];

  return (
    <div className={`group relative overflow-hidden rounded-[2rem] border border-[rgba(248,245,239,0.14)] bg-[#07130F] shadow-2xl shadow-black/25 ${className}`}>
      <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full ${meta.glow} blur-3xl`} />
      <div className="relative aspect-[16/11] min-h-[22rem] overflow-hidden">
        {!showVideo && !showImage && <FallbackVisual variant={variant} />}
        {showVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={videoSrc}
            muted
            playsInline
            preload="metadata"
            onError={() => setVideoFailed(true)}
          />
        )}
        {showImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={imageSrc}
            alt=""
            onError={() => setImageFailed(true)}
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,15,0)_20%,rgba(7,19,15,0.88)_100%)]" />
        <div className={`absolute left-6 top-6 rounded-full border border-[#F8F5EF]/12 bg-[#07130F]/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#F8F5EF]/75 backdrop-blur ${meta.color}`}>
          {meta.label}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D6A84F]">{eyebrow}</p>
          <h3 className="mt-3 max-w-xl text-2xl font-semibold tracking-[-0.03em] text-[#F8F5EF] sm:text-3xl">{title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#F8F5EF]/72 sm:text-base">{description}</p>
        </div>
      </div>
    </div>
  );
}
