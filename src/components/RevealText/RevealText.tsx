import {
  motion,
  useInView,
  useAnimation,
  useReducedMotion,
} from "framer-motion";
import classes from "./RevealText.module.css";
import { useEffect, useRef } from "react";

interface RevealTextProps {
  children: React.ReactNode;
}

const textVariant = {
  hidden: { opacity: 0, y: 75 },
  visible: { opacity: 1, y: 0 },
};

const reducedMotionTextVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function RevealText({ children }: RevealTextProps) {
  const revealRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(revealRef, { amount: 1 });
  const mainAnimation = useAnimation();
  const slideAnimation = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      slideAnimation.start("visible");
      mainAnimation.start("visible");
    }
  }, [isInView, slideAnimation, mainAnimation]);

  return (
    <div ref={revealRef} className={classes.reveal}>
      <motion.div
        variants={shouldReduceMotion ? reducedMotionTextVariant : textVariant}
        initial="hidden"
        animate={mainAnimation}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        {children}
      </motion.div>
      {!shouldReduceMotion && (
        <motion.div
          variants={{
            hidden: { left: 0 },
            visible: { left: "100%" },
          }}
          initial="hidden"
          animate={slideAnimation}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className={classes.cover}
        />
      )}
    </div>
  );
}
