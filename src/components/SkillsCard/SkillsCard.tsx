import { motion, useReducedMotion } from "framer-motion";
import { useLoaderData } from "react-router-dom";
import useMediaQuery from "@/hooks/useMediaQuery";
import Tags from "@/components/Tags";
import TagType from "@/types/Tag";
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
  children: React.ReactNode;
}

export default function SkillsCard({
  highlighted,
  remainderTitle,
  category,
  colors,
  delay,
  children,
}: SkillsCardProps) {
  const { tags, error } = useLoaderData() as {
    tags: TagType[] | null;
    error: string | null;
  };
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
            duration: 1,
            delay: isDesktop ? delay : 0,
          },
        },
      }}
      viewport={{ once: true, amount: 0.15 }}
      initial="hidden"
      whileInView="visible"
    >
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
