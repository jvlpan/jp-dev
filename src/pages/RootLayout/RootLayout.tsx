import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkipNavigation from "@/components/SkipNavigation";
import SideDecorations from "@/components/SideDecorations";
import classes from "./RootLayout.module.css";

export default function RootLayout() {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);
  return (
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
}
