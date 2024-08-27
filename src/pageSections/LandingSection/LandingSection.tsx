import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import Typewriter from "typewriter-effect";

import classes from "./LandingSection.module.css";

const typewriterStrings = [
  "a front-end developer",
  "a UI designer",
  "a creative professional",
];

const variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

export default function LandingBanner() {
  const bannerTextRef = useRef(null);
  const isInView = useInView(bannerTextRef);

  return (
    <section className={classes["landing-banner"]}>
      <motion.div
        ref={bannerTextRef}
        className={classes["banner-text"]}
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.5 }}
      >
        <h1>
          Hello, I'm <span className={classes.name}>Julia Pan</span>
        </h1>
        <h2>
          I am
          <Typewriter
            options={{
              strings: typewriterStrings,
              autoStart: true,
              loop: true,
              delay: 70,
              deleteSpeed: 50,
              wrapperClassName: classes.typewriter,
            }}
          />
        </h2>
      </motion.div>
      <a href="#projects">Take a deep dive into my work.</a>
      <div
        className={`${classes.background} ${classes["transparent-gradient"]}`}
      ></div>
    </section>
  );
}
