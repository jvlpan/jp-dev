import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./ProjectSection.module.css";
import Project from "@/components/Project";
import Tags from "@/components/Tags";
import ProjectType from "@/types/Project";

interface ProjectSectionProps {
  selectedTag: string | null;
  onTagClick: (tag: string) => void;
  onResetClick: () => void;
}

export default function ProjectSection({
  selectedTag,
  onTagClick,
  onResetClick,
}: ProjectSectionProps) {
  const { projects, error } = useLoaderData() as {
    projects: ProjectType[] | null;
    error: string | null;
  };

  const projectsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (projectsRef.current && selectedTag) {
      projectsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTag]);

  const filteredProjects = selectedTag
    ? projects?.filter((project) =>
        project.tags.some((tag) => tag === selectedTag)
      )
    : projects;

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
      <div id="projects" className="nav-section" ref={projectsRef}>
        {selectedTag && (
          <div className={classes.filter}>
            <p>
              Filtering projects by <span>{selectedTag}</span> tag
            </p>
            <button onClick={onResetClick}>Reset filter</button>
          </div>
        )}
        <motion.ul className={classes.projects}>
          <AnimatePresence>
            {filteredProjects &&
              filteredProjects.length > 0 &&
              filteredProjects.map((project) => {
                let cssClass = classes.project;
                if (project.is_featured) cssClass = classes["project-featured"];
                return (
                  <Project
                    key={project.id}
                    project={project}
                    className={cssClass}
                  >
                    <Tags
                      tags={project.tags}
                      onTagClick={onTagClick}
                      className={classes["skills-list"]}
                    />
                  </Project>
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
    <section id="project-section" className={classes["project-section"]}>
      <h2>Projects</h2>
      {content}
    </section>
  );
}
