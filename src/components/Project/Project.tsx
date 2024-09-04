import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import classes from "./Project.module.css";
import ExternalLink from "../ExternalLink";

type ProjectProps = {
  slug: string;
  title: string;
  img: string;
  alt: string;
  description: string;
  link: string;
  tags: string[];
  className: string;
  onTagClick: (tag: string) => void;
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
  const linkAnimation = useAnimation();
  const textAnimation = useAnimation();

  const handleMouseEnter = () => {
    linkAnimation.start({ opacity: 0, transition: { duration: 0.3 } });
    textAnimation.start({
      y: 0,
      x: "-50%",
      opacity: 1,
      transition: {
        y: { type: "spring", stiffness: 300, damping: 15 },
        duration: 0.3,
      },
    });
  };

  const handleMouseLeave = () => {
    linkAnimation.start({ opacity: 1, transition: { duration: 0.3 } });
    textAnimation.start({
      y: 30,
      x: "-50%",
      opacity: 0,
      transition: { duration: 0.3 },
    });
  };
  return (
    <motion.li
      className={`${classes.project} ${className}`}
      layout
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
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
          >
            Visit the project
          </ExternalLink>
          <motion.div
            animate={textAnimation}
            initial={{ y: 30, x: "-50%", opacity: 0 }}
            className={classes["see-details-text"]}
          >
            See project details
          </motion.div>
        </div>
      </div>
    </motion.li>
  );
}
