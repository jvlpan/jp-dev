import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ReactLenis from "lenis/react";
import useMediaQuery from "@/hooks/useMediaQuery";
import AnimatedOutlet from "@/pages/AnimatedOutlet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkipNavigation from "@/components/SkipNavigation";
import SideDecorations from "@/components/SideDecorations";
import classes from "./RootLayout.module.css";

export default function RootLayout() {
  const location = useLocation();
  const shouldReduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <ReactLenis
      root
      options={{
        lerp: shouldReduceMotion ? 0 : 0.07,
      }}
    >
      <Navbar />
      <SkipNavigation id="skills" />
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}>
          {!shouldReduceMotion && (
            <>
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={classes["slide-in"]}
              />
              <motion.div
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={classes["slide-out"]}
              />
            </>
          )}
          <main id="main-content" className={classes.main}>
            <AnimatedOutlet />
          </main>
        </motion.div>
      </AnimatePresence>
      <SideDecorations />
      <Footer />
    </ReactLenis>
  );
}
