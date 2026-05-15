import { ScrollFrameHero } from "@/components/scrollytelling/ScrollFrameHero";
import { BatteryStorageSection } from "@/components/sections/BatteryStorageSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ProjectPhasesSection } from "@/components/sections/ProjectPhasesSection";

export default function Home() {
  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-[#07130F] text-[#F8F5EF]">
      <ScrollFrameHero />
      <ProjectPhasesSection />
      <BatteryStorageSection />
      <ContactSection />
    </main>
  );
}
