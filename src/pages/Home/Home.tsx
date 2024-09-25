import { lazy, Suspense, useEffect } from "react";
import LandingBanner from "@/homeSections/LandingSection";
import ProjectSection from "@/homeSections/ProjectSection";
const SkillsSection = lazy(() => import("@/homeSections/SkillsSection"));
const AboutSection = lazy(() => import("@/homeSections/AboutSection"));
const ContactSection = lazy(() => import("@/homeSections/ContactSection"));
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
      <Suspense
        fallback={
          <p
            id="#skills"
            style={{
              textAlign: "center",
              fontSize: "1.25rem",
              padding: "0.25rem",
            }}
          >
            Loading...
          </p>
        }
      >
        <SkillsSection />
      </Suspense>
      <ProjectSection />
      <Suspense
        fallback={
          <p
            id="about"
            style={{
              textAlign: "center",
              fontSize: "1.25rem",
              padding: "0.25rem",
            }}
          >
            Loading...
          </p>
        }
      >
        <AboutSection />
      </Suspense>
      <Suspense
        fallback={
          <p
            id="contact"
            style={{
              textAlign: "center",
              fontSize: "1.25rem",
              padding: "0.25rem",
            }}
          >
            Loading...
          </p>
        }
      >
        <ContactSection />
      </Suspense>
    </>
  );
}
