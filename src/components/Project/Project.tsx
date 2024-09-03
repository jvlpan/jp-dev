import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
      <h3 className={classes["project-link"]}>
        <Link
          to={`/projects/${slug.toString()}`}
          title={`${title} Project Details`}
        >
          {title}
          <img className={classes["project-image"]} alt={alt} src={img} />
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
        <ExternalLink link={link} className={classes["visit-link"]}>
          Visit the project
        </ExternalLink>
      </div>
    </motion.li>
  );
}
