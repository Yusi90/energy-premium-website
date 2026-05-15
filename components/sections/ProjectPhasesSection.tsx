const phases = [
  "Flächen- und Netzscreening",
  "Technisches Parklayout",
  "Genehmigungs- und Stakeholderprozess",
  "Beschaffung und Baukoordination",
  "Inbetriebnahme und Betriebsführung",
];

export function ProjectPhasesSection() {
  return (
    <section className="bg-stone-100 px-6 py-28 text-stone-950 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-900/60">Projektphasen</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">PV-Parks mit System</h2>
          <p className="mt-6 text-lg leading-8 text-stone-600">
            Wir strukturieren Projekte so, dass technische Entscheidungen, Investitionssicherheit und Umsetzbarkeit transparent bleiben — vom ersten Standortsignal bis zum stabilen Betrieb.
          </p>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-5">
          {phases.map((phase, index) => (
            <div key={phase} className="rounded-3xl border border-stone-300/80 bg-white p-6 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">Phase {index + 1}</span>
              <h3 className="mt-8 min-h-16 text-xl font-semibold tracking-[-0.02em]">{phase}</h3>
              <div className="mt-8 h-px bg-gradient-to-r from-emerald-700/50 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
