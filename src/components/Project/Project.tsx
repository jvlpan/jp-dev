import { Link } from "react-router-dom";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import classes from "./Project.module.css";
import ExternalLink from "../ExternalLink";
import Tags from "../Tags";
import ProjectType from "@/types/Project";
import {
  linkVariants,
  textVariants,
  reducedMotionTextVariants,
  featuredSVGVariants,
  reducedMotionSVGVariants,
} from "./variants";

interface ProjectProps {
  project: ProjectType;
  className: string;
  onTagClick: (tag: string) => void;
}

export default function Project({
  project: {
    slug,
    title,
    image_url: img,
    image_alt: alt,
    link,
    description,
    is_featured,
    tags,
  },
  className,
  onTagClick,
}: ProjectProps) {
  const shouldReduceMotion = useReducedMotion();
  const linkAnimation = useAnimation();
  const textAnimation = useAnimation();
  const svgAnimation = useAnimation();

  function handleMouseEnter() {
    linkAnimation.start("hover");
    textAnimation.start("hover");
    svgAnimation.start("hover");
  }

  function handleMouseLeave() {
    linkAnimation.start("default");
    textAnimation.start("default");
    svgAnimation.start("default");
  }

  return (
    <motion.li
      className={`${classes.project} ${className}`}
      layout={!shouldReduceMotion}
      variants={{
        hidden: { opacity: 0, x: shouldReduceMotion ? 0 : "50%" },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.5 }}
      initial="hidden"
      exit="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.33 }}
    >
      {is_featured && (
        <motion.div
          initial="default"
          animate={svgAnimation}
          variants={
            shouldReduceMotion ? reducedMotionSVGVariants : featuredSVGVariants
          }
          className={classes["featured-svg"]}
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="124"
            height="124"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
          </svg>
        </motion.div>
      )}
      <h3
        className={classes["project-link"]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to={`/projects/${slug.toString()}`}
          title={`${title} Project Details`}
        >
          {title}
          <div className={classes["project-image-container"]}>
            <img className={classes["project-image"]} alt={alt} src={img} />
          </div>
        </Link>
      </h3>
      <div className={classes["text-block"]}>
        <p className={classes.description}>{description}</p>
        <Tags
          tags={tags}
          onTagClick={onTagClick}
          className={classes["skills-list"]}
        />
        <div className={classes["swap-text"]}>
          <ExternalLink
            link={link}
            className={classes["visit-link"]}
            animate={linkAnimation}
            variants={linkVariants}
          >
            Visit the project
          </ExternalLink>
          <motion.div
            animate={textAnimation}
            variants={
              shouldReduceMotion ? reducedMotionTextVariants : textVariants
            }
            initial={
              shouldReduceMotion
                ? { x: "-50%", opacity: 0 }
                : { y: 30, x: "-50%", opacity: 0 }
            }
            className={classes["see-details-text"]}
          >
            See project details
          </motion.div>
        </div>
      </div>
    </motion.li>
  );
}
