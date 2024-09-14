import { AnimationControls, motion, useReducedMotion } from "framer-motion";
import useMediaQuery from "@/hooks/useMediaQuery";

interface PopupSVGProps {
  animation: AnimationControls;
  children: React.ReactNode;
  className?: string;
}

const featuredSVGVariants = {
  default: { opacity: 0, scale: 0.75, y: "50%" },
  hover: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      scale: {
        type: "spring",
        stiffness: 400,
        damping: 20,
      },
      opacity: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  },
};

const reducedMotionSVGVariants = {
  default: { opacity: 0, scale: 0.9 },
  hover: {
    opacity: 1,
    scale: 1,
  },
};

export default function PopupSVG({
  animation,
  children,
  className,
}: PopupSVGProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={isDesktop ? "default" : "hover"}
      animate={animation}
      variants={
        shouldReduceMotion ? reducedMotionSVGVariants : featuredSVGVariants
      }
      style={{
        position: "absolute",
        transformOrigin: "bottom",
        pointerEvents: "none",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
