import { useState } from "react";
import { motion, useReducedMotion, useAnimation } from "framer-motion";
import { useLoaderData } from "react-router-dom";
import useMediaQuery from "@/hooks/useMediaQuery";
import Tags from "@/components/Tags";
import TagType from "@/types/Tag";
import { IconType } from "react-icons";
import PopupSVG from "@/components/PopupSVG";
import classes from "./SkillsCard.module.css";

interface SkillsCardProps {
  highlighted: string;
  remainderTitle: string;
  category: string;
  colors?: {
    background: string;
    color: string;
    "background-hover": string;
  };
  delay?: number;
  svgs?: {
    svgComponent:
      | React.FC<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>
      | IconType;
    title: string;
    className: string;
  }[];
  children: React.ReactNode;
}

interface LoaderState {
  tags: TagType[] | null;
  error: string | null;
}

export default function SkillsCard({
  highlighted,
  remainderTitle,
  category,
  colors,
  delay,
  svgs,
  children,
}: SkillsCardProps) {
  const [{ tags, error }] = useState<LoaderState>(
    useLoaderData() as LoaderState
  );
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const svgAnimation = useAnimation();

  function getTagsByCategory(category: string, tags: TagType[]) {
    return tags
      .filter((tag) => tag.category === category)
      .map((tag) => tag.name);
  }

  return (
    <motion.div
      className={classes.card}
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : "25%" },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            duration: 0.75,
            delay: isDesktop ? delay : 0,
          },
        },
        hover: {
          scale: 1.02,
          boxShadow: "2px 7px 15px 0px #0e1e1b",
          zIndex: 1,
          transition: {
            type: "spring",
            duration: 0.5,
          },
        },
      }}
      viewport={{ once: true, amount: 0.15 }}
      initial="hidden"
      whileInView="visible"
      whileHover={isDesktop ? "hover" : ""}
      onHoverStart={() => {
        if (isDesktop) {
          svgAnimation.start("hover");
        }
      }}
      onHoverEnd={() => {
        if (isDesktop) {
          svgAnimation.start("default");
        }
      }}
    >
      {svgs &&
        svgs.map((svg) => (
          <PopupSVG
            animation={svgAnimation}
            className={svg.className}
            key={svg.title}
          >
            <svg.svgComponent title={svg.title} />
          </PopupSVG>
        ))}
      <h3>
        <span
          className={classes["animated-div"]}
          style={
            {
              "--background-color": colors?.background,
              "--background-color-hover": colors?.["background-hover"],
              "--color-text": colors?.color,
            } as React.CSSProperties
          }
        >
          {highlighted}
        </span>{" "}
        {remainderTitle}
      </h3>
      {children}
      {tags && (
        <>
          <Tags
            tags={getTagsByCategory(category, tags)}
            className={classes["skills-list"]}
          />
        </>
      )}
      {error && (
        <div className="error-inline">
          <p>
            Sorry, we&apos;ve got an error when we tried to fetch tags: {error}.
          </p>
          <p> Please refresh the page to try again!</p>
        </div>
      )}
    </motion.div>
  );
}
