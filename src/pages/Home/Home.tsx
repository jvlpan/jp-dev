import { useLayoutEffect } from "react";
import LandingBanner from "@/homeSections/LandingSection";
import SkillsSection from "@/homeSections/SkillsSection";
import ProjectSection from "@/homeSections/ProjectSection";
import AboutSection from "@/homeSections/AboutSection";

export default function Home() {
  useLayoutEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "instant" });
      }
    }
  }, []);

  return (
    <>
      <LandingBanner />
      <SkillsSection />
      <ProjectSection />
      <AboutSection />
    </>
  );
}
