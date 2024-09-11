import { useSearchParams, useNavigate } from "react-router-dom";
import { useTagStore } from "@/store/tagStore";
import classes from "./Tags.module.css";

interface TagsProps {
  tags: string[];
  className?: string;
  shouldNavigate?: boolean;
}

export default function Tags({
  tags,
  className = "",
  shouldNavigate,
}: TagsProps) {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const setSelectedTag = useTagStore((state) => state.setSelectedTag);

  let handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setSearchParams({ filter: tag });
  };

  if (shouldNavigate) {
    handleTagClick = (tag: string) => {
      setSelectedTag(tag);
      navigate(`/?filter=${tag}#projects`);
    };
  }

  return (
    <ul className={`${classes["skills-list"]} ${className}`}>
      {tags.map((tag) => (
        <li key={tag}>
          <button onClick={() => handleTagClick(tag)}>{tag}</button>
        </li>
      ))}
    </ul>
  );
}
