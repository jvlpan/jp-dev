import { useRef } from "react";
import {
  useScroll,
  motion,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import classes from "./ParallaxBanner.module.css";

interface ParallaxBannerProps {
  backgroundImg: string;
  backgroundVideo?: string;
  className?: string;
  children: React.ReactNode;
}

export default function ParallaxBanner({
  backgroundImg,
  backgroundVideo,
  className,
  children,
}: ParallaxBannerProps) {
  const shouldReduceMotion = useReducedMotion();
  const imageRef = useRef(null);
  const textRef = useRef(null);

  const { scrollYProgress: imgScrollYProgress } = useScroll({
    target: imageRef,
    offset: ["end end", "end start"],
  });
  const { scrollYProgress: copyScrollYProgress } = useScroll({
    target: textRef,
    offset: ["start end", "end start"],
  });

  const imgScale = useTransform(imgScrollYProgress, [0, 1], [1, 0.85]);
  const imgCorners = useTransform(imgScrollYProgress, [0, 1], ["0", "1.5rem"]);
  const overlayOpacity = useTransform(imgScrollYProgress, [0, 1], [0.75, 0]);
  const textY = useTransform(copyScrollYProgress, [0, 1], [300, -300]);
  const textOpacity = useTransform(
    copyScrollYProgress,
    [0.3, 0.4, 0.5, 0.6, 0.7],
    [0, 1, 1, 1, 0]
  );

  return (
    <div className={`${classes["parallax-banner"]} ${className}`}>
      <motion.div
        className={classes.background}
        ref={imageRef}
        style={{
          backgroundImage: `url(${backgroundImg})`,
          scale: shouldReduceMotion ? 1 : imgScale,
          borderRadius: imgCorners,
          opacity: 1,
        }}
      >
        {backgroundVideo && !shouldReduceMotion && (
          <motion.video
            controls
            muted
            loop
            autoPlay={!shouldReduceMotion}
            playsInline
            className={classes.videoBackground}
            aria-describedby="videoDesc"
            preload="metadata"
            poster={backgroundImg}
            style={{
              borderRadius: imgCorners,
            }}
          >
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        )}
        <motion.div
          className={classes.overlay}
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>
      <motion.div
        className={classes.text}
        ref={textRef}
        style={{ y: shouldReduceMotion ? 0 : textY, opacity: textOpacity }}
      >
        {children}
      </motion.div>
    </div>
  );
}
