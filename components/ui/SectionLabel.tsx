type SectionLabelProps = {
  children: React.ReactNode;
  tone?: "light" | "dark";
};

export function SectionLabel({ children, tone = "dark" }: SectionLabelProps) {
  return (
    <p
      className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] ${
        tone === "light" ? "text-[var(--accent-soft)]" : "text-[var(--primary)]"
      }`}
    >
      <span className="h-px w-10 bg-current opacity-55" />
      {children}
    </p>
  );
}
