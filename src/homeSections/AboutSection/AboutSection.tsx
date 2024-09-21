import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import useMediaQuery from "@/hooks/useMediaQuery";
import RevealText from "@/components/RevealText";
import photoImg from "@/assets/photo.jpg";
import drawingImg from "@/assets/drawing.png";
import classes from "./AboutSection.module.css";
import ScrollParagraph from "@/components/ScrollParagraph";

export default function AboutSection() {
  const [isDrawingActive, setIsDrawingActive] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const shouldReduceMotion = useReducedMotion();
  return (
    <section id="about" className="nav-section">
      <RevealText>
        <h2>About Me</h2>
      </RevealText>
      <div className={classes["about-section"]}>
        <motion.div
          className={`${classes.card} ${
            !isDesktop && isDrawingActive ? classes["active-card"] : ""
          }`}
          onHoverStart={() => {
            if (isDesktop) setIsDrawingActive(true);
          }}
          onHoverEnd={() => {
            if (isDesktop) setIsDrawingActive(false);
          }}
          onPointerDown={(event) => {
            switch (event.pointerType) {
              case "mouse":
                if (!isDesktop) setIsDrawingActive((prevState) => !prevState);
                break;
              case "touch":
                event.preventDefault();
                setIsDrawingActive((prevState) => !prevState);
                break;
              default:
                console.log(
                  `pointerType ${event.pointerType} is not supported`
                );
            }
          }}
        >
          <div className={classes.wrapper}>
            <img
              src={photoImg}
              alt="Headshot of Julia Pan from the shoulders up, smiling"
              className={classes["cover-image"]}
            />
          </div>
          <p className={classes.title} aria-hidden>
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
          {!shouldReduceMotion && (
            <>
              <ScrollParagraph percentScrollStart={0.9} percentScrollEnd={0.7}>
                I specialize in front-end development and UI design, focusing on
                creating engaging experiences through storytelling and
                animation. I like to make designs that are user-centered and
                accessible, but also unique and visually appealing.
              </ScrollParagraph>
              <ScrollParagraph
                percentScrollStart={0.85}
                percentScrollEnd={0.65}
              >
                I also enjoy learning new tools, technologies, and frameworks,
                or trying out different approaches to solve complex problems.
                That&apos;s how I built this portfolio, with a lot of
                experimentation and MDN Docs permanently open on another tab.
              </ScrollParagraph>
              <ScrollParagraph percentScrollStart={0.8} percentScrollEnd={0.6}>
                I&apos;m currently on the lookout for part-time or full-time
                opportunities. If you need someone with experience in both
                design and development, I&apos;d love to talk and see if we can
                work together! Let&apos;s chat! &#x2728;
              </ScrollParagraph>
            </>
          )}
          <p className={shouldReduceMotion ? "" : "sr-only"}>
            I specialize in front-end development and UI design, focusing on
            creating engaging experiences through storytelling and animation. I
            like to make designs that are user-centered and accessible, but also
            unique and visually appealing.
          </p>
          <p className={shouldReduceMotion ? "" : "sr-only"}>
            I also enjoy learning new tools, technologies, and frameworks, or
            trying out different approaches to solve complex problems.
            That&apos;s how I built this portfolio, with a lot of
            experimentation and MDN Docs permanently open on another tab.
          </p>
          <p className={shouldReduceMotion ? "" : "sr-only"}>
            I&apos;m currently on the lookout for part-time or full-time
            opportunities. If you need someone with experience in both design
            and development, I&apos;d love to talk and see if we can work
            together! Let&apos;s chat! &#x2728;
          </p>
        </div>
      </div>
    </section>
  );
}
