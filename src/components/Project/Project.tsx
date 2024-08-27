import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import classes from "./Project.module.css";

type ProjectProps = {
  slug: string;
  title: string;
  img: string;
  alt: string;
  description: string;
  link: string;
  tags: string[];
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
  onTagClick,
}: ProjectProps) {
  return (
    <motion.li
      className={classes.project}
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
        <a href={link} target="_blank" rel="noopener noreferrer">
          {title}
          <img className={classes["project-image"]} alt={alt} src={img} />
        </a>
      </h3>
      <p className={classes.description}>{description}</p>
      <ul className={classes["skills-list"]}>
        {tags.map((tag) => (
          <button
            key={tag}
            className={classes["skill-tag"]}
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </ul>
      <Link to={`/projects/${slug.toString()}`}>Check project details</Link>
    </motion.li>
  );
}
