import { AnimatedSection } from "@/components/home/animated-section";
import { CtaSection } from "@/components/home/cta-section";
import { FeaturesSection } from "@/components/home/features-section";
import { HeroSection } from "@/components/home/hero-section";
import { PopularLanguagesSection } from "@/components/home/popular-languages-secion";
import { SectionDivider } from "@/components/home/section-divider";
import { StatsSection } from "@/components/home/stats-section";

export const revalidate = 86400;

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <AnimatedSection>
        <HeroSection />
        <SectionDivider className="max-md:bottom-8" />
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection>
        <FeaturesSection />
        <SectionDivider />
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection>
        <StatsSection />
        <SectionDivider />
      </AnimatedSection>

      {/* Popular Languages Section */}
      <AnimatedSection>
        <PopularLanguagesSection />
        <SectionDivider />
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <CtaSection />
        <SectionDivider className="bottom-12" />
      </AnimatedSection>
    </div>
  );
}
