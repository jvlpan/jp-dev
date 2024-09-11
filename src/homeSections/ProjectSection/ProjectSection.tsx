import { useLoaderData, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTagStore } from "@/store/tagStore";
import Project from "@/components/Project";
import ProjectType from "@/types/Project";
import classes from "./ProjectSection.module.css";

export default function ProjectSection() {
  const { projects, error } = useLoaderData() as {
    projects: ProjectType[] | null;
    error: string | null;
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTag = useTagStore((state) => state.selectedTag);
  const resetSelectedTag = useTagStore((state) => state.resetSelectedTag);

  function handleResetFilter() {
    searchParams.delete("filter");
    setSearchParams(searchParams);
    resetSelectedTag();
  }

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
      <div id="projects" className="nav-section">
        {selectedTag && (
          <div className={classes.filter}>
            <p>
              Filtering projects by <span>{selectedTag}</span> tag
            </p>
            <button onClick={handleResetFilter}>Reset filter</button>
          </div>
        )}
        <motion.ul
          className={classes.projects}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1, staggerDirection: -1 },
            },
          }}
          viewport={{ once: true, amount: 0.2 }}
          initial="hidden"
          exit="hidden"
          whileInView="visible"
        >
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
    <section id="project-section" className={classes["project-section"]}>
      <h2>Projects</h2>
      {content}
    </section>
  );
}
