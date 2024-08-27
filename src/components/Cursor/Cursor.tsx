import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import classes from "./Cursor.module.css";

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [cursorVariant, setCursorVariant] = useState("default");

  const variants: Variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      transition: {
        type: "spring",
        stiffness: 2000,
        damping: 60,
      },
    },
    text: {
      height: 80,
      width: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      backgroundColor: "rgb(172, 205, 103)",
      opacity: 0.4,
      transition: {
        type: "spring",
        stiffness: 2000,
        damping: 60,
      },
    },
    button: {
      height: 0,
      width: 0,
      x: mousePosition.x,
      y: mousePosition.y,
    },
  };

  useEffect(() => {
    function mouseMove(event: MouseEvent) {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    }

    function handleMouseEnter(event: MouseEvent) {
      const target = event.target as HTMLElement;

      if (target.closest("#navbar")) {
        if (target.closest("a")) {
          setCursorVariant("button");
        }
        return;
      }

      if (target.closest("a")) {
        setCursorVariant("text");
      }
      if (target.closest("button")) {
        setCursorVariant("button");
      }
    }

    function handleMouseLeave(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (target.closest("a") || target.closest("button")) {
        setCursorVariant("default");
      }
    }

    window.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, []);

  return (
    <motion.div
      variants={variants}
      animate={cursorVariant}
      className={classes.cursor}
    />
  );
}
