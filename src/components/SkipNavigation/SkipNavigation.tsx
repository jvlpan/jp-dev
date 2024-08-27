import classes from "./SkipNavigation.module.css";

export default function SkipNavigation({ id }: { id: string }) {
  return (
    <a href={`#${id}`} className={classes["skip-nav-link"]}>
      Skip to main content
    </a>
  );
}
