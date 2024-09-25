import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import RevealText from "@/components/RevealText";
import ImageCard from "@/components/ImageCard";
import photoImg from "@/assets/photo.webp";
import drawingImg from "@/assets/drawing.webp";
import classes from "./AboutSection.module.css";

export default function AboutSection() {
  const lenis = useLenis();
  const shouldReduceMotion = useReducedMotion();
  return (
    <section id="about" className="nav-section">
      <RevealText>
        <h2>About Me</h2>
      </RevealText>
      <div className={classes["about-section"]}>
        <ImageCard
          photoImg={photoImg}
          drawingImg={drawingImg}
          photoAlt="Headshot of Julia Pan from the shoulders up, smiling"
          drawingAlt="A stylized self-portrait drawing of Julia Pan with a pastel rainbow"
          hoverText={`Hello! \u2728`}
          variants={{
            hidden: {
              opacity: 0,
              x: shouldReduceMotion ? 0 : "-25%",
            },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                duration: 1,
                delay: 0.2,
              },
            },
          }}
          viewport={{ once: true, amount: 0.15 }}
          initial="hidden"
          exit="hidden"
          whileInView="visible"
        />
        <motion.div
          className={classes["text-block"]}
          variants={{
            hidden: {
              opacity: 0,
              x: shouldReduceMotion ? 0 : "-50%",
            },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                duration: 1,
              },
            },
          }}
          viewport={{ once: true, amount: 0.15 }}
          initial="hidden"
          exit="hidden"
          whileInView="visible"
        >
          <p>
            I specialize in front-end development and UI design, focusing on
            creating engaging experiences through storytelling and animation. I
            like to make designs that are user-centered and accessible, but also
            unique and visually appealing.
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
            Whether it&apos;s messing around with CSS animations, or trying out
            a new JavaScript library, I love applying my skills and seeing how
            little tweaks can make a big difference. I&apos;m all about being
            adaptable and finding new ways to overcome whatever obstacles arise!
          </p>
          <p>
            Interested in working with me?{" "}
            <a
              href="#contact"
              onClick={() => {
                if (lenis) lenis.scrollTo("#contact", { offset: -75 });
              }}
            >
              Let&apos;s chat!
            </a>{" "}
            &#x2728;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
