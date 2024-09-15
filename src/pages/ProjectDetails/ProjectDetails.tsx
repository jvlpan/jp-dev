import { Link, useLoaderData } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { getImageUrl } from "./projectdetails.loader";
import Markdown from "react-markdown";
import ExternalLink from "@/components/ExternalLink";
import Tags from "@/components/Tags";
import classes from "./ProjectDetails.module.css";

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
  const project = useLoaderData() as Project;
  const shouldReduceMotion = useReducedMotion();
  let content;

  if (project.detailed_description) {
    content = (
      <Markdown
        components={{
          img({ alt, src }) {
            if (src && src.endsWith(".mp4")) {
              const [slug, videoName] = src.split("/");
              const videoUrl = getImageUrl(slug, videoName);
              return (
                <>
                  <span id="videoDesc" className="sr-only">
                    {alt}
                  </span>
                  <video
                    controls
                    muted
                    loop
                    aria-describedby="videoDesc"
                    style={{ padding: "0.5rem" }}
                  >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </>
              );
            }
            if (src) {
              const [slug, imageName] = src.split("/");
              const imageUrl = getImageUrl(slug, imageName);
              return <img src={imageUrl} alt={alt} />;
            }
            return null;
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
      <motion.article
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
          <div className={classes.description}>
            <h3>Summary:</h3>
            <p>{project.description}</p>
          </div>

          <div className={classes.skills}>
            <h3 className={classes["call-to-filter"]}>
              See my other projects with these skills:
            </h3>
            <Tags tags={project.tags} shouldNavigate />
          </div>
          <ExternalLink link={project.link} className={classes["visit-link"]}>
            Visit the project
          </ExternalLink>
        </section>
        <section className={classes.markdown}>{content}</section>
        <Link to="/" className={classes["link-to-home"]}>
          Return to Home
        </Link>
      </motion.article>
    )
  );
}
