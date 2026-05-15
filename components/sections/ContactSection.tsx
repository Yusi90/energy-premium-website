const tags = ["Projektfläche", "PV-Park", "Batteriespeicher", "Netzanschluss", "Investitionsvorhaben"];

export function ContactSection() {
  return (
    <section id="kontakt" className="bg-[#F7F3EA] px-5 py-28 text-[#14211C] sm:py-36 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.8rem] border border-[#14211C]/10 bg-[#07130F] text-[#F8F5EF] shadow-[0_36px_100px_rgba(7,19,15,0.28)]">
        <div className="grid gap-12 p-8 md:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:p-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#D6A84F]">Kontakt</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">
              Bereit, Energieinfrastruktur skalierbar zu entwickeln?
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#F8F5EF]/68">
              Ob Projektfläche, Unternehmensstandort oder Investitionsvorhaben — wir prüfen das Potenzial und besprechen den nächsten sinnvollen Schritt.
            </p>
            <a
              href="mailto:kontakt@energy-premium.example"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-[#F8F5EF] px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#07130F] transition hover:bg-[#D6A84F] focus:outline-none focus:ring-2 focus:ring-[#D6A84F] focus:ring-offset-2 focus:ring-offset-[#07130F]"
            >
              Projektanfrage starten
            </a>
          </div>

          <div className="relative rounded-[2rem] border border-[#F8F5EF]/10 bg-[#F8F5EF]/[0.045] p-6 backdrop-blur">
            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[#7BC7B5]/10 blur-3xl" />
            <p className="relative text-xs font-bold uppercase tracking-[0.26em] text-[#D6A84F]">Anfrageprofil</p>
            <div className="relative mt-8 space-y-4 text-sm leading-6 text-[#F8F5EF]/68">
              <p>Erstgespräch mit Fokus auf Standort, Netzanschluss, Speicheroptionen und Projektziel.</p>
              <p>Vertrauliche Prüfung ohne Veröffentlichung sensibler Flächen- oder Unternehmensdaten.</p>
            </div>
            <div className="relative mt-10 flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[#F8F5EF]/10 bg-[#07130F]/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F8F5EF]/78">
                  {tag}
                </span>
              ))}
            </div>
            <div className="relative mt-10 rounded-3xl border border-[#F8F5EF]/10 bg-[#07130F]/70 p-5">
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
