import { useState, useEffect, useRef } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./ProjectSection.module.css";
import Project from "@/components/Project";

interface Project {
  id: number;
  slug: string;
  title: string;
  image_name: string;
  image_alt: string;
  link: string;
  description: string;
  image_url: string;
  is_featured: boolean;
  tags: string[];
}

export default function ProjectSection() {
  const { projects, error } = useLoaderData() as {
    projects: Project[] | null;
    error: string | null;
  };

  const projectsRef = useRef<HTMLDivElement>(null);
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

  return (
    <section id="project-section" className={classes["project-section"]}>
      <h2>Previous Work</h2>
      {error && (
        <div className={classes.error}>
          <p>Sorry, we&apos;ve got an error: {error}.</p>
          <p> Please refresh the page to try again!</p>
        </div>
      )}
      <div id="projects" className="nav-section" ref={projectsRef}>
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
              filteredProjects.map((project) => {
                let cssClass = classes.project;
                if (project.is_featured) cssClass = classes["project-featured"];
                return (
                  <Project
                    key={project.id}
                    slug={project.slug}
                    title={project.title}
                    img={project.image_url}
                    alt={project.image_alt}
                    link={project.link}
                    description={project.description}
                    is_featured={project.is_featured}
                    tags={project.tags}
                    onTagClick={handleTagClick}
                    className={cssClass}
                  />
                );
              })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
