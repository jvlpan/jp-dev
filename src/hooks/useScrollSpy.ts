import { useState, useEffect } from "react";

export default function useScrollSpy(selector: string) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sectionIds, setSectionIds] = useState<string[]>([]);

  useEffect(() => {
    const sections = document.querySelectorAll(selector);
    const ids = Array.from(sections).map((section) => section.id);
    setSectionIds(ids);

    const observer = new IntersectionObserver(
      (entries) => {
        let hasVisibleSection = false;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            hasVisibleSection = true;
          }
        });

        if (!hasVisibleSection) {
          setActiveSection(null);
        }
      },
      { threshold: 0.5 }
    );

    if (sections) {
      sections.forEach((section) => observer.observe(section));
    }

    return () => {
      observer.disconnect();
    };
  }, [activeSection, selector]);

  return { activeSection, sectionIds };
}
