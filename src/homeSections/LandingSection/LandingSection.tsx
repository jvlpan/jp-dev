import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import Typewriter from "typewriter-effect";
import ParallaxBanner from "@/components/ParallaxBanner";
import StaggeredText from "@/components/StaggeredText";
import backgroundImg from "@/assets/background.jpg";
import SparkleSVG from "@/assets/sparkle.svg?react";
import classes from "./LandingSection.module.css";
import backgroundVideo from "@/assets/background.mp4";

const typewriterStrings = [
  "front-end developer",
  "UI designer",
  "creative professional",
];

export default function LandingBanner() {
  const lenis = useLenis();
  const shouldReduceMotion = useReducedMotion();

  let description = (
    <h2 className={classes.description} style={{ width: "75%" }}>
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
        I am a
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
    <section className={classes["landing-banner"]} id="landing">
      <ParallaxBanner
        backgroundImg={backgroundImg}
        backgroundVideo={backgroundVideo}
      >
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
          <h1 className={classes.title}>
            Hi, I&apos;m <span className={classes.highlight}>Julia Pan</span>
            <SparkleSVG
              className={classes.sparkles}
              title={"Decorations for featured project"}
            />
          </h1>
          {description}
        </motion.div>
        <a
          href="#skills"
          onClick={() => {
            if (lenis) lenis.scrollTo("#skills", { offset: -75 });
          }}
          aria-label="Take a deep dive into my work - scroll to skills section."
        >
          <StaggeredText
            text="Take a deep dive into my work."
            wrapperClassName={classes["link-wrapper"]}
          />
        </a>
      </ParallaxBanner>
    </section>
  );
}
