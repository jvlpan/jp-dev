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

  function getTagsByCategory(category: string, tags: TagType[]) {
    return tags
      .filter((tag) => tag.category === category)
      .map((tag) => tag.name);
  }

  return (
    <div className={classes.card}>
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
    </div>
  );
}
