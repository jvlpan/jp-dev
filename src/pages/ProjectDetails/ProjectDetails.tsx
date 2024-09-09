import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { getImageUrl } from "./projectdetails.loader";
import classes from "./ProjectDetails.module.css";
import Markdown from "react-markdown";
import ExternalLink from "@/components/ExternalLink";

interface Project {
  id: number;
  title: string;
  image_url: string;
  alt: string;
  description: string;
  detailed_description: string;
  link: string;
  tags: string[];
}

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function ProjectDetails() {
  const navigate = useNavigate();
  const project = useLoaderData() as Project;
  const shouldReduceMotion = useReducedMotion();

  function handleTagClick(tag: string) {
    navigate(`/?filter=${tag}#projects`);
  }

  let content;

  if (project.detailed_description) {
    content = (
      <Markdown
        className={classes.markdown}
        components={{
          img({ alt, src }) {
            if (src) {
              const [slug, imageName] = src.split("/");
              const imageUrl = getImageUrl(slug, imageName);

              return <img src={imageUrl} alt={alt} />;
            }
          },
          em(props) {
            const { ...rest } = props;
            return <i style={{ color: "#accd67" }} {...rest} />;
          },
        }}
      >
        {project.detailed_description}
      </Markdown>
    );
  } else {
    content = (
      <p className={classes.description}>
        Details for this project are still being written! Please check back
        later for more information.
      </p>
    );
  }

  return (
    project && (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={shouldReduceMotion ? reducedMotionVariants : variants}
        transition={{ duration: 0.3 }}
        className={classes.project}
      >
        <p className={classes.header}>Project Details</p>
        <h1 className={classes["project-title"]}>{project.title}</h1>
        <section className={classes.introduction}>
          <div className={classes["image-wrapper"]}>
            <img
              className={classes["project-image"]}
              alt={project.alt}
              src={project.image_url}
            />
          </div>
          <ExternalLink link={project.link} className={classes["visit-link"]}>
            Visit the project
          </ExternalLink>
          <div className={classes.description}>
            <h3>Summary:</h3>
            <p>{project.description}</p>
          </div>

          <div className={classes.skills}>
            <h3 className={classes["call-to-filter"]}>
              See my other projects with these skills:
            </h3>
            <ul className={classes["skills-list"]}>
              {project.tags.map((tag) => (
                <li key={tag}>
                  <button
                    className={classes["skill-tag"]}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {content}
        <Link to="/" className={classes["link-to-home"]}>
          Return to Home
        </Link>
      </motion.div>
    )
  );
}
