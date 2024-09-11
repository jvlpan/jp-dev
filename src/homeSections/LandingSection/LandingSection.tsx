import { motion, useReducedMotion } from "framer-motion";
import Typewriter from "typewriter-effect";
import ParallaxBanner from "@/components/ParallaxBanner";
import classes from "./LandingSection.module.css";
import backgroundImg from "@/assets/background.jpg";

const typewriterStrings = [
  "a front-end developer",
  "a UI designer",
  "a creative professional",
];

export default function LandingBanner() {
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
      <ParallaxBanner backgroundImg={backgroundImg}>
        <motion.div
          className={classes["banner-text"]}
          variants={{
            hidden: { opacity: 0, y: shouldReduceMotion ? 0 : "15%" },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                duration: 0.5,
              },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          <h1>
            Hi, I'm <span className={classes.highlight}>Julia Pan</span>
          </h1>
          {description}
        </motion.div>
        <a href="#skills">Take a deep dive into my work.</a>
      </ParallaxBanner>
    </section>
  );
}
