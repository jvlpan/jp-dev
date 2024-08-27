import classes from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <>
      <div className={classes.card}>
        <div className={classes.wrapper}>
          <img src="" className={classes["cover-image"]} />
        </div>
        <img src="" className={classes.title} />
        <img src="" className={classes.character} />
      </div>
    </>
  );
}
