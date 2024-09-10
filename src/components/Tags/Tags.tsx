import classes from "./Tags.module.css";

interface TagsProps {
  tags: string[];
  onTagClick: (tag: string) => void;
  className?: string;
}

export default function Tags({ tags, onTagClick, className = "" }: TagsProps) {
  return (
    <ul className={`${classes["skills-list"]} ${className}`}>
      {tags.map((tag) => (
        <li key={tag}>
          <button onClick={() => onTagClick(tag)}>{tag}</button>
        </li>
      ))}
    </ul>
  );
}
