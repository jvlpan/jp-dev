import { RefObject, useRef } from "react";
import { useScroll } from "framer-motion";
import ScrollWord from "./ScrollWord";
import classes from "./ScrollElements.module.css";

interface ScrollParagraphProps {
  children: React.ReactNode;
  target?: RefObject<HTMLDivElement>;
  percentScrollStart?: number;
  percentScrollEnd?: number;
}

export default function ScrollParagraph({
  children,
  target,
  percentScrollStart = 0.9,
  percentScrollEnd = 0.5,
}: ScrollParagraphProps) {
  const paragraph = useRef(null);
  const { scrollYProgress } = useScroll({
    target: target ? target : paragraph,
    offset: [`start ${percentScrollStart}`, `start ${percentScrollEnd}`],
  });

  const text = typeof children === "string" ? children : "";
  const words = text.split(" ");

  return (
    <p ref={paragraph} className={classes.paragraph} aria-hidden>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <ScrollWord key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </ScrollWord>
        );
      })}
    </p>
  );
}
