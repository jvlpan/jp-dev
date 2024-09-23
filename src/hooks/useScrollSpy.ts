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

    const mutationObserver = new MutationObserver(() => {
      const newSections = document.querySelectorAll(selector);
      const newIds = Array.from(newSections).map((section) => section.id);
      setSectionIds(newIds);

      observer.disconnect();
      newSections.forEach((section) => observer.observe(section));
    });

    const parent = document.querySelector("body");
    if (parent) {
      mutationObserver.observe(parent, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [selector, location.pathname]);

  return { activeSection, sectionIds };
}
