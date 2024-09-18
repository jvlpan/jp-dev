import { useState } from "react";
import { motion } from "framer-motion";
import useMediaQuery from "@/hooks/useMediaQuery";
import photoImg from "@/assets/photo.jpg";
import drawingImg from "@/assets/drawing.png";
import classes from "./AboutSection.module.css";

export default function AboutSection() {
  const [isDrawingActive, setIsDrawingActive] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <>
      {/* wrapping section in a fragment for a banner later */}
      <section id="about" className="nav-section">
        <h2>About Me</h2>
        <div className={classes["about-section"]}>
          <motion.div
            className={`${classes.card} ${
              !isDesktop && isDrawingActive ? classes["active-card"] : ""
            }`}
            onHoverStart={() => {
              if (isDesktop) setIsDrawingActive(true);
            }}
            onHoverEnd={() => {
              if (!isDesktop) setIsDrawingActive(false);
            }}
            onTouchStart={(event) => {
              event.preventDefault();
              setIsDrawingActive((prevState) => !prevState);
            }}
            onMouseDown={(event) => {
              event.preventDefault();
              setIsDrawingActive((prevState) => !prevState);
            }}
          >
            <div className={classes.wrapper}>
              <img
                src={photoImg}
                alt="Headshot of Julia Pan from the shoulders up, smiling"
                className={classes["cover-image"]}
              />
            </div>
            <p className={classes.title}>
              {isDrawingActive
                ? `Hello! \u2728`
                : isDesktop
                ? `Hover me \u2728`
                : "Click on me \u2728"}
            </p>

            <img
              src={drawingImg}
              alt="A stylized self-portrait drawing of Julia Pan with a pastel rainbow"
              className={classes.character}
            />
          </motion.div>
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
