import { useRef } from "react";
import { useInView, motion, useReducedMotion } from "framer-motion";
import Typewriter from "typewriter-effect";
import classes from "./LandingSection.module.css";

const typewriterStrings = [
  "a front-end developer",
  "a UI designer",
  "a creative professional",
];

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function LandingBanner() {
  const bannerTextRef = useRef(null);
  const isInView = useInView(bannerTextRef);
  const shouldReduceMotion = useReducedMotion();

  let description = (
    <h2 className={classes.description}>
      I&apos;m a <span className={classes.highlight}>front-end developer</span>{" "}
      and a <span className={classes.highlight}>UI designer</span>
    </h2>
  );

  if (!shouldReduceMotion) {
    description = (
      <h2
        className={classes.description}
        aria-label="I'm a front-end developer, a UI designer, and a creative professional."
      >
        I am
        <Typewriter
          options={{
            strings: typewriterStrings,
            autoStart: true,
            loop: true,
            delay: 80,
            deleteSpeed: 50,
            wrapperClassName: classes.typewriter,
            cursorClassName: classes.cursor,
          }}
        />
      </h2>
    );
  }

  return (
    <section className={classes["landing-banner"]}>
      <motion.div
        ref={bannerTextRef}
        className={classes["banner-text"]}
        variants={shouldReduceMotion ? reducedMotionVariants : variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.5 }}
      >
        <h1>
          Hi, I'm <span className={classes.highlight}>Julia Pan</span>
        </h1>
        {description}
      </motion.div>
      <a href="#projects">Take a deep dive into my work.</a>
      <div
        className={`${classes.background} ${classes["transparent-gradient"]}`}
      ></div>
    </section>
  );
}
