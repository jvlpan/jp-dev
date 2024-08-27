import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import classes from "./ProjectDetails.module.css";

type Project = {
  id: number;
  title: string;
  image_url: string;
  alt: string;
  description: string;
  link: string;
  tags: string[];
};

export default function ProjectDetails() {
  const navigate = useNavigate();
  const project = useLoaderData() as Project;

  function handleTagClick(tag: string) {
    navigate(`/?filter=${tag}#projects`);
  }

  return (
    project && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className={classes.header}>Project Details</h1>
        <div className={classes.project}>
          <h2 className={classes["project-link"]}>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.title}
              <img
                className={classes["project-image"]}
                alt={project.alt}
                src={project.image_url}
              />
            </a>
          </h2>
          <div className={classes["text-block"]}>
            <p className={classes.description}>
              This page is a work in progress! Please check back later for more
              information on my work.
            </p>
            <p className={classes["call-to-filter"]}>
              See my other projects with these skills:
            </p>
            <ul className={classes["skills-list"]}>
              {project.tags.map((tag) => (
                <button
                  key={tag}
                  className={classes["skill-tag"]}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </ul>
            <Link to="/">Return to home!</Link>
          </div>
        </div>
      </motion.div>
    )
  );
}
