const capabilities = [
  "Lastverschiebung und Vermarktungsoptionen",
  "Netzdienliche Speicherarchitektur",
  "Kombination mit PV-Erzeugung und Umspannwerk",
  "Skalierbare Container- und Sicherheitskonzepte",
];

export function BatteryStorageSection() {
  return (
    <section className="relative overflow-hidden bg-[#05070a] px-6 py-28 lg:px-8">
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="relative rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <div key={capability} className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <div className="mb-10 h-2 w-14 rounded-full bg-emerald-200/70" />
                <p className="text-sm leading-6 text-stone-300">{capability}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-emerald-200/70">Speicherparks</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Batteriespeicher für flexible Netze
          </h2>
          <p className="mt-6 text-lg leading-8 text-stone-400">
            Batteriespeicherparks ergänzen PV-Erzeugung um Flexibilität, Netzstabilität und zusätzliche Erlöspfade. Wir denken Speicher, Netzanschluss und Betriebsmodell als integrierte Infrastruktur.
          </p>
          <p className="mt-6 text-lg leading-8 text-stone-400">
            So entstehen Anlagen, die technisch robust, genehmigungsfähig und für professionelle Partner nachvollziehbar sind.
          </p>
        </div>
      </div>
    </section>
  );
}
