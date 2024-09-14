import { motion, useAnimation, useReducedMotion } from "framer-motion";
import classes from "./StaggeredText.module.css";

const DURATION = 0.25;
const STAGGER = 0.025;

interface StaggeredTextProps {
  text: string;
  wrapperClassName?: string;
}

export default function StaggeredText({
  text,
  wrapperClassName,
}: StaggeredTextProps) {
  const hoverAnimation = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div
        className={wrapperClassName ? wrapperClassName : ""}
        style={{
          lineHeight: 0.82,
        }}
      >
        {text}
      </div>
    );
  }

  let stringArray;

  if (/\s/.test(text)) {
    stringArray = text.split(/(\s+)/);
  } else {
    stringArray = text.split("");
  }

  return (
    <motion.div
      onHoverStart={() => hoverAnimation.start("hover")}
      onHoverEnd={() => hoverAnimation.start("default")}
      className={wrapperClassName ? wrapperClassName : ""}
    >
      <motion.div
        initial="default"
        animate={hoverAnimation}
        className={classes["staggered-text"]}
        style={{
          lineHeight: 0.82,
        }}
      >
        <div>
          {stringArray.map((letter, index) => (
            <motion.span
              variants={{
                default: {
                  y: 0,
                },

                hover: {
                  y: "-150%",
                },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * index,
              }}
              style={{
                display: letter.trim() === "" ? "inline" : "inline-block",
                whiteSpace: letter.trim() === "" ? "pre" : "nowrap",
              }}
              key={index}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <div className={classes["hidden-text"]}>
          {stringArray.map((letter, index) => (
            <motion.span
              variants={{
                default: {
                  y: "150%",
                },

                hover: {
                  y: 0,
                },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * index,
              }}
              style={{
                display: letter.trim() === "" ? "inline" : "inline-block",
                whiteSpace: letter.trim() === "" ? "pre" : "nowrap",
              }}
              key={index}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
