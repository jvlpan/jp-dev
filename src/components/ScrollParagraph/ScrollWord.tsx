import { motion, MotionValue, useTransform } from "framer-motion";
import classes from "./ScrollElements.module.css";

interface ScrollWordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: number[];
}

export default function ScrollWord({
  children,
  progress,
  range,
}: ScrollWordProps) {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className={classes.word} aria-hidden>
      <span className={classes.shadow}>{children}&nbsp;</span>
      <motion.span style={{ opacity: opacity, userSelect: "none" }}>
        {children}&nbsp;
      </motion.span>
    </span>
  );
}
