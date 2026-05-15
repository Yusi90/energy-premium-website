"use client";

import dynamic from "next/dynamic";

const EnergyScene = dynamic(() => import("@/components/three/EnergyScene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(111,148,130,0.22),transparent_30%),linear-gradient(135deg,#101820,#05070a)]" />
  ),
});

export function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden border-b border-white/10 bg-[#05070a]">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_top,black,transparent_72%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="relative z-10 max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-stone-300 shadow-2xl shadow-black/20 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
            Projektentwicklung für PV- und Speicherinfrastruktur
          </div>
          <h1 className="text-balance text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Skalierbare Solar- und Batteriespeicherparks für die Energieinfrastruktur von morgen.
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-stone-300 sm:text-xl">
            Wir entwickeln, planen und realisieren leistungsfähige PV- und Speicherprojekte — von der Flächenanalyse bis zum netzgekoppelten Betrieb.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-full bg-stone-100 px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-stone-950 transition hover:bg-emerald-100"
            >
              Projekt besprechen
            </a>
            <span className="text-sm leading-6 text-stone-400">
              Technische Due Diligence · Netzanschluss · EPC-nahe Realisierung
            </span>
          </div>
        </div>

        <div className="relative h-[28rem] md:h-[42rem]">
          <div className="hidden h-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 shadow-2xl shadow-black/50 md:block">
            <EnergyScene />
          </div>
          <div className="h-full rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_40%_25%,rgba(110,231,183,0.18),transparent_28%),linear-gradient(145deg,#111a21,#05070a_65%)] p-6 shadow-2xl shadow-black/50 md:hidden">
            <div className="flex h-full flex-col justify-end rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent)] p-6">
              <div className="mb-8 grid grid-cols-5 gap-2 opacity-70">
                {Array.from({ length: 15 }).map((_, index) => (
                  <span key={index} className="h-10 rounded-sm bg-slate-300/20 ring-1 ring-white/10" />
                ))}
              </div>
              <p className="text-sm uppercase tracking-[0.26em] text-emerald-100/80">Premium 3D Ansicht auf Desktop</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
