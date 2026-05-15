export function ContactSection() {
  return (
    <section id="kontakt" className="bg-stone-100 px-6 py-28 text-stone-950 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#07100d] p-8 text-white shadow-2xl shadow-stone-300/40 md:p-12 lg:p-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-emerald-200/70">Kontakt</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Für Flächeneigentümer, Unternehmen und Investoren
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300">
              Sie prüfen eine Fläche, planen Eigenerzeugung oder suchen einen Entwicklungspartner für skalierbare Energieinfrastruktur? Wir sprechen gern über technische Machbarkeit, Zeitplan und nächste Schritte.
            </p>
          </div>
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="space-y-4 text-sm leading-6 text-stone-300">
              <p>Erstgespräch mit Fokus auf Standort, Netzanschluss und Projektziel.</p>
              <p>Vertrauliche Prüfung ohne Veröffentlichung sensibler Flächen- oder Unternehmensdaten.</p>
            </div>
            <a
              href="mailto:kontakt@energy-premium.example"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-stone-950 transition hover:bg-emerald-100"
            >
              Projekt besprechen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
