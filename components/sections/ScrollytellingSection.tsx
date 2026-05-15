const storyItems = [
  {
    title: "Von der Fläche zum Energiepark",
    text: "Am Anfang steht eine belastbare Standortprüfung: Flächenzuschnitt, Netzverfügbarkeit, planungsrechtliche Rahmenbedingungen und wirtschaftliche Eckdaten werden gemeinsam bewertet.",
  },
  {
    title: "PV-Parks mit System",
    text: "Aus der Analyse entsteht ein technisches Layout mit klarer Ertragslogik, servicefähiger Infrastruktur und einem Projektpfad, der Genehmigung, Bau und Betrieb früh zusammendenkt.",
  },
  {
    title: "Netzanschluss, Betrieb und Skalierung",
    text: "Netzanschluss, Umspannwerk, Monitoring und Erweiterbarkeit werden nicht nachgelagert betrachtet, sondern als zentrale Bausteine einer langlebigen Energieinfrastruktur geplant.",
  },
];

export function ScrollytellingSection() {
  return (
    <section className="relative bg-[#070a0d] px-6 py-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-20 lg:h-fit">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-emerald-200/70">Entwicklungspfad</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Von der Fläche zum Energiepark
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-400">
            Professionelle Energieprojekte entstehen durch präzise Vorarbeit, belastbare Technik und eine klare Abstimmung zwischen Eigentümern, Kommunen, Netzbetreibern und Kapitalpartnern.
          </p>
        </div>

        <div className="space-y-6">
          {storyItems.map((item, index) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 shadow-2xl shadow-black/20 backdrop-blur"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-200/60 via-sky-200/20 to-transparent opacity-70" />
              <span className="text-sm font-medium text-stone-500">0{index + 1}</span>
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.02em] text-white">{item.title}</h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-stone-400">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
