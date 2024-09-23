import { useState } from "react";
import { motion } from "framer-motion";
import useMediaQuery from "@/hooks/useMediaQuery";
import classes from "./ImageCard.module.css";

interface ImageCardProps {
  photoImg: string;
  drawingImg: string;
  photoAlt: string;
  drawingAlt: string;
  hoverText: string;
}

export default function ImageCard({
  photoImg,
  drawingImg,
  photoAlt,
  drawingAlt,
  hoverText,
}: ImageCardProps) {
  const [isDrawingActive, setIsDrawingActive] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
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
            console.log(`pointerType ${event.pointerType} is not supported`);
        }
      }}
    >
      <div className={classes.wrapper}>
        <img src={photoImg} alt={photoAlt} className={classes["cover-image"]} />
      </div>
      <p className={classes.title} aria-hidden>
        {isDrawingActive
          ? hoverText
          : isDesktop
          ? `Hover me \u2728`
          : "Click on me \u2728"}
      </p>
      <img src={drawingImg} alt={drawingAlt} className={classes.character} />
    </motion.div>
  );
}
