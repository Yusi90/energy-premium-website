import { BatteryStorageSection } from "@/components/sections/BatteryStorageSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectPhasesSection } from "@/components/sections/ProjectPhasesSection";
import { ScrollytellingSection } from "@/components/sections/ScrollytellingSection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070a] text-stone-100">
      <HeroSection />
      <ScrollytellingSection />
      <ProjectPhasesSection />
      <BatteryStorageSection />
      <ContactSection />
    </main>
  );
}
