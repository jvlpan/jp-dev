import { motion, useReducedMotion } from "framer-motion";
import { useLoaderData } from "react-router-dom";
import Tags from "@/components/Tags";
import TagType from "@/types/Tag";
import classes from "./SkillsCard.module.css";

interface SkillsCardProps {
  highlighted: string;
  remainderTitle: string;
  category: string;
  children: React.ReactNode;
}

export default function SkillsCard({
  highlighted,
  remainderTitle,
  category,
  children,
}: SkillsCardProps) {
  const { tags, error } = useLoaderData() as {
    tags: TagType[] | null;
    error: string | null;
  };
  const shouldReduceMotion = useReducedMotion();

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
          transition: { type: "spring", duration: 1 },
        },
      }}
    >
      <h3>
        <span className={classes["animated-div"]}>{highlighted}</span>{" "}
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
