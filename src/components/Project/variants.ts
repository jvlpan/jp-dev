export const linkVariants = {
  default: { opacity: 1 },
  hover: { opacity: 0 },
};

export const textVariants = {
  default: { y: 30, x: "-50%", opacity: 0 },
  hover: {
    y: 0,
    x: "-50%",
    opacity: 1,
    transition: {
      y: { type: "spring", stiffness: 300, damping: 15 },
      duration: 0.3,
    },
  },
};

export const reducedMotionTextVariants = {
  default: { x: "-50%", opacity: 0 },
  hover: {
    x: "-50%",
    opacity: 1,
  },
};
