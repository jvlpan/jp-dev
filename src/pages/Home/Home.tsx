import { useEffect } from "react";
import LandingBanner from "@/homeSections/LandingSection";
import SkillsSection from "@/homeSections/SkillsSection";
import ProjectSection from "@/homeSections/ProjectSection";
import AboutSection from "@/homeSections/AboutSection";
import ContactSection from "@/homeSections/ContactSection";
import { useLenis } from "lenis/react";

export default function Home() {
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) {
      const hash = location.hash;
      const element = hash ? document.querySelector(hash) : null;
      if (element) {
        lenis.scrollTo(hash, { immediate: true, offset: -75 });
      } else {
        lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [lenis]);

  return (
    <>
      <LandingBanner />
      <SkillsSection />
      <ProjectSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
