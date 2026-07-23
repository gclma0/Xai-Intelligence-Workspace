import { AutomationBuilder } from "@/components/sections/automation-builder";
import { HeroSection } from "@/components/sections/hero-section";
import { IntelligenceDashboard } from "@/components/sections/intelligence-dashboard";
import { NeuralPipeline } from "@/components/sections/neural-pipeline";
import { ReasoningEngine } from "@/components/sections/reasoning-engine";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <NeuralPipeline />
        <IntelligenceDashboard />
        <ReasoningEngine />
        <AutomationBuilder />
      </main>
      <SiteFooter />
    </>
  );
}
