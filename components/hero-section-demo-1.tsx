"use client";

import {
  HeroSection,
  FeaturesGrid,
  HowItWorks,
  HeroFooter,
} from "@/components/hero";

export default function HeroSectionOne() {
  return (
    <div className="min-h-screen bg-white font-sans font-medium text-black">
      <HeroSection />
      <FeaturesGrid />
      <HowItWorks />
      <HeroFooter />
    </div>
  );
}
