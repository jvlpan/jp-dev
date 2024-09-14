import { Link } from "react-router-dom";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import useMediaQuery from "@/hooks/useMediaQuery";
import classes from "./Project.module.css";
import ExternalLink from "@/components/ExternalLink";
import Tags from "@/components/Tags";
import PopupSVG from "@/components/PopupSVG";
import ProjectType from "@/types/Project";
import featuredSVG from "@/assets/sparkle.svg";
import {
  linkVariants,
  textVariants,
  reducedMotionTextVariants,
} from "./variants";

interface ProjectProps {
  project: ProjectType;
  className: string;
  delay?: number;
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
  delay,
}: ProjectProps) {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const linkAnimation = useAnimation();
  const textAnimation = useAnimation();
  const svgAnimation = useAnimation();

  function handleMouseEnter() {
    if (isDesktop) {
      linkAnimation.start("hover");
      textAnimation.start("hover");
      svgAnimation.start("hover");
    }
  }

  function handleMouseLeave() {
    if (isDesktop) {
      linkAnimation.start("default");
      textAnimation.start("default");
      svgAnimation.start("default");
    }
  }

  return (
    <motion.li
      className={`${classes.project} ${className}`}
      layout={!shouldReduceMotion}
      variants={{
        hidden: {
          opacity: 0,
          x: shouldReduceMotion ? 0 : "50%",
        },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            type: "spring",
            duration: 1,
            delay: isDesktop ? delay : 0,
          },
        },
      }}
      viewport={{ once: true, amount: 0.15 }}
      initial="hidden"
      exit="hidden"
      whileInView="visible"
    >
      {is_featured && (
        <PopupSVG animation={svgAnimation} className={classes["featured-svg"]}>
          <svg>
            <use href={`${featuredSVG}#sparkle`} />
          </svg>
        </PopupSVG>
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

        <Tags tags={tags} className={classes["skills-list"]} />
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
