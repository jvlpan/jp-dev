import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import LandingBanner from "@/pageSections/LandingSection";
import ProjectSection from "@/pageSections/ProjectSection";
import AboutSection from "@/pageSections/AboutSection";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <LandingBanner />
      <ProjectSection />
      <AboutSection />
    </motion.div>
  );
}
