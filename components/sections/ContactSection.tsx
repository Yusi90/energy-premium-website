const tags = ["Projektfläche", "Batteriespeicher", "PV-Park", "Investorenanfrage"];

export function ContactSection() {
  return (
    <section id="kontakt" className="bg-[var(--background)] px-6 py-28 text-[var(--foreground)] lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-[rgba(248,245,239,0.12)] bg-[#07130F] p-8 text-[#F8F5EF] shadow-2xl shadow-[#0E3B2E]/20 md:p-12 lg:p-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#D6A84F]">Kontakt</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Bereit, Energieinfrastruktur skalierbar zu entwickeln?
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#F8F5EF]/68">
              Ob Projektfläche, Unternehmensstandort oder Investitionsvorhaben — wir prüfen das Potenzial und besprechen den nächsten sinnvollen Schritt.
            </p>
            <a
              href="mailto:kontakt@energy-premium.example"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-[#F8F5EF] px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#07130F] transition hover:bg-[#D6A84F]"
            >
              Projektanfrage starten
            </a>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-[#F8F5EF]/10 bg-[#F8F5EF]/[0.045] p-6">
            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[#7BC7B5]/10 blur-3xl" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D6A84F]">Anfrageprofil</p>
            <div className="mt-8 space-y-4 text-sm leading-6 text-[#F8F5EF]/68">
              <p>Erstgespräch mit Fokus auf Standort, Netzanschluss, Speicheroptionen und Projektziel.</p>
              <p>Vertrauliche Prüfung ohne Veröffentlichung sensibler Flächen- oder Unternehmensdaten.</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[#F8F5EF]/10 bg-[#07130F]/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F8F5EF]/78">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-10 rounded-3xl border border-[#F8F5EF]/10 bg-[#07130F]/70 p-5">
              <div className="flex items-center justify-between border-b border-[#F8F5EF]/10 pb-4">
                <span className="text-sm text-[#F8F5EF]/58">Nächster Schritt</span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#7BC7B5] shadow-[0_0_18px_rgba(123,199,181,0.78)]" />
              </div>
              <p className="mt-4 text-lg font-semibold tracking-[-0.02em]">Potenzial, Zeitplan und technische Machbarkeit einordnen.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
