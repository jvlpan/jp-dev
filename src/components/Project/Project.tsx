import { Link } from "react-router-dom";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import classes from "./Project.module.css";
import ExternalLink from "../ExternalLink";

interface ProjectProps {
  slug: string;
  title: string;
  img: string;
  alt: string;
  description: string;
  link: string;
  tags: string[];
  className: string;
  onTagClick: (tag: string) => void;
}

const linkVariants = {
  default: { opacity: 1 },
  hover: { opacity: 0 },
};

const textVariants = {
  default: { y: 30, x: "-50%", opacity: 0 },
  hover: {
    y: 0,
    x: "-50%",
    opacity: 1,
    transition: {
      y: { type: "spring", stiffness: 300, damping: 15 },
      duration: 0.3,
    },
  },
};

const reducedMotionTextVariants = {
  default: { x: "-50%", opacity: 0 },
  hover: {
    x: "-50%",
    opacity: 1,
  },
};

export default function Project({
  slug,
  title,
  img,
  alt,
  link,
  description,
  tags,
  className,
  onTagClick,
}: ProjectProps) {
  const shouldReduceMotion = useReducedMotion();
  const linkAnimation = useAnimation();
  const textAnimation = useAnimation();

  function handleMouseEnter() {
    linkAnimation.start("hover");
    textAnimation.start("hover");
  }

  function handleMouseLeave() {
    linkAnimation.start("default");
    textAnimation.start("default");
  }

  return (
    <motion.li
      className={`${classes.project} ${className}`}
      layout={!shouldReduceMotion}
      variants={{
        hidden: { opacity: 0, x: shouldReduceMotion ? 0 : "50%" },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.75 }}
      initial="hidden"
      exit="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
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
        <ul className={classes["skills-list"]}>
          {tags.map((tag) => (
            <li key={tag}>
              <button
                className={classes["skill-tag"]}
                onClick={() => onTagClick(tag)}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
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
