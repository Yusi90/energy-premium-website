import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Energy Premium | Solar- und Speicherparks",
  description:
    "Premium-Projektentwicklung für skalierbare PV-Parks und Batteriespeicherparks: Flächenanalyse, Planung, Genehmigung, Bau und netzgekoppelter Betrieb.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
