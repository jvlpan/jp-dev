import photoImg from "@/assets/photo.jpg";
import classes from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <>
      {/* wrapping section in a fragment for a banner later */}
      <section id="about" className="nav-section">
        <h2>About Me</h2>
        <div className={classes["about-section"]}>
          <div className={classes.card}>
            <div className={classes.wrapper}>
              <img src={photoImg} className={classes["cover-image"]} />
            </div>
            <img src="" className={classes.title} />
            <img src="" className={classes.character} />
          </div>
          <div className={classes["text-block"]}>
            <p>
              I specialize in front-end development and UI design, focusing on
              creating engaging experiences through storytelling and animation.
              I like to make designs that are user-centered and accessible, but
              also unique and visually appealing.
            </p>
            <p>
              I also enjoy learning new tools, technologies, and frameworks, or
              trying out different approaches to solve complex problems.
              That&apos;s how I built this portfolio, with a lot of
              experimentation and{" "}
              <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
                MDN Docs
              </a>{" "}
              permanently open on another tab.
            </p>
            <p>
              I&apos;m currently on the lookout for part-time or full-time
              opportunities. If you need someone with experience in both design
              and development, I&apos;d love to talk and see if we can work
              together!{" "}
              <a href="mailto:julia.vl.pan@gmail.com">Let&apos;s chat!</a>{" "}
              &#x2728;
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
