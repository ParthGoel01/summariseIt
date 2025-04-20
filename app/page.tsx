import HeroSection from "@/components/home/hero-section";
import BgGradient from "@/components/common/bg-gradient";
import HowItWorksSection from "@/components/home/how-it-works-section";
import CTASection from "@/components/home/cta-section";
import DemoSection from "@/components/home/demo-section";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <HeroSection />
      <DemoSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
}
