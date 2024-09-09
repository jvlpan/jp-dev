import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollSpy(selector: string) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sectionIds, setSectionIds] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const sections = document.querySelectorAll(selector);
    const ids = Array.from(sections).map((section) => section.id);
    setSectionIds(ids);
    setActiveSection(null);

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
      { rootMargin: "-50% 0px" }
    );

    if (sections) {
      sections.forEach((section) => observer.observe(section));
    }

    return () => {
      observer.disconnect();
    };
  }, [selector, location.pathname]);

  return { activeSection, sectionIds };
}
