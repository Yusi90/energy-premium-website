import { AudienceSection } from "@/components/sections/AudienceSection";
import { BatteryStorageSection } from "@/components/sections/BatteryStorageSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectPhasesSection } from "@/components/sections/ProjectPhasesSection";
import { ScrollytellingSection } from "@/components/sections/ScrollytellingSection";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main className="min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
        <HeroSection />
        <ScrollytellingSection />
        <BatteryStorageSection />
        <ProjectPhasesSection />
        <AudienceSection />
        <ContactSection />
      </main>
    </>
  );
}
