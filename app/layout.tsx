import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Energy Premium | PV- und Batteriespeicherparks",
  description:
    "Professionelle Entwicklung, Planung und Realisierung skalierbarer Solar- und Batteriespeicherparks für Unternehmen, Kommunen, Flächeneigentümer und Investoren.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-[var(--background)] font-sans text-[var(--foreground)]">{children}</body>
    </html>
  );
}
