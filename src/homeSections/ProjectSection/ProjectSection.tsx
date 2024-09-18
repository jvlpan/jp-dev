import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { useTagStore } from "@/store/tagStore";
import Project from "@/components/Project";
import ProjectType from "@/types/Project";
import classes from "./ProjectSection.module.css";

interface LoaderState {
  projects: ProjectType[] | null;
  error: string | null;
}

export default function ProjectSection() {
  const [{ projects, error }] = useState<LoaderState>(
    useLoaderData() as LoaderState
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTag = useTagStore((state) => state.selectedTag);
  const shouldScroll = useTagStore((state) => state.shouldScrollOnSelect);
  const resetSelectedTag = useTagStore((state) => state.resetSelectedTag);
  const setShouldScrollOnSelect = useTagStore(
    (state) => state.setShouldScrollOnSelect
  );

  function handleResetFilter() {
    searchParams.delete("filter");
    setSearchParams(searchParams);
    resetSelectedTag();
  }

  function computeDelay(index: number) {
    if (index < 6) {
      return (index % 3) * 0.15;
    } else {
      return ((index - 6) % 4) * 0.15;
    }
  }

  const filteredProjects = selectedTag
    ? projects?.filter((project) =>
        project.tags.some((tag) => tag === selectedTag)
      )
    : projects;

  const lenis = useLenis();
  useEffect(() => {
    if (lenis && shouldScroll) {
      lenis.scrollTo("#projects-grid", { offset: -70 });
      setShouldScrollOnSelect(false);
    }
  }, [lenis, shouldScroll, setShouldScrollOnSelect]);

  let content;

  if (error) {
    content = (
      <div className="error-inline">
        <p>
          Sorry, we&apos;ve got an error when we tried to fetch projects:{" "}
          {error}.
        </p>
        <p> Please refresh the page to try again!</p>
      </div>
    );
  } else {
    content = (
      <div id="projects-grid">
        {selectedTag && (
          <div className={classes.filter}>
            <p>
              Filtering projects by <span>{selectedTag}</span> tag
            </p>
            <button onClick={handleResetFilter}>Reset filter</button>
          </div>
        )}
        <motion.ul className={classes.projects}>
          <AnimatePresence>
            {filteredProjects &&
              filteredProjects.length > 0 &&
              filteredProjects.map((project, index) => {
                let cssClass = classes.project;
                const numProjects = filteredProjects.length;
                if (project.is_featured) cssClass = classes["project-featured"];
                if (numProjects >= 6) {
                  cssClass += ` ${classes["align-projects"]}`;
                }
                return (
                  <Project
                    key={project.id}
                    project={project}
                    className={cssClass}
                    delay={computeDelay(index)}
                  />
                );
              })}
          </AnimatePresence>
          {(!filteredProjects || filteredProjects.length === 0) && (
            <p>
              There are currently no projects with this tag. Please reset filter
              to see all projects!
            </p>
          )}
        </motion.ul>
      </div>
    );
  }

  return (
    <section
      id="projects"
      className={`nav-section ${classes["project-section"]}`}
    >
      <h2>Projects</h2>
      {content}
    </section>
  );
}
