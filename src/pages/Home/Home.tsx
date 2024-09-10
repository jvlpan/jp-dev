import { useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { motion } from "framer-motion";
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

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTagFromQuery = searchParams.get("filter");

  const [selectedTag, setSelectedTag] = useState<string | null>(
    selectedTagFromQuery
  );

  function handleTagClick(tag: string) {
    setSearchParams({ filter: tag });
    setSelectedTag(tag);
  }

  function handleResetFilter() {
    searchParams.delete("filter");
    setSearchParams(searchParams);
    setSelectedTag(null);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <LandingBanner />
      <SkillsSection onTagClick={handleTagClick} />
      <ProjectSection
        selectedTag={selectedTag}
        onTagClick={handleTagClick}
        onResetClick={handleResetFilter}
      />
      <AboutSection />
    </motion.div>
  );
}
