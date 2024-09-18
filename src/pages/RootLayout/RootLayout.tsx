import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ReactLenis, { useLenis } from "lenis/react";
import useMediaQuery from "@/hooks/useMediaQuery";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkipNavigation from "@/components/SkipNavigation";
import SideDecorations from "@/components/SideDecorations";
import classes from "./RootLayout.module.css";

export default function RootLayout() {
  const location = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [lenis, location.pathname]);

  const shouldReduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const body = (
    <>
      <Navbar />
      <SkipNavigation id={"projects"} />
      <main id="main-content" className={classes.main}>
        <Outlet />
      </main>
      <SideDecorations />
      <Footer />
    </>
  );

  return shouldReduceMotion ? (
    body
  ) : (
    <ReactLenis
      root
      options={{
        lerp: 0.07,
      }}
    >
      {body}
    </ReactLenis>
  );
}
