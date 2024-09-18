import { useState } from "react";
import { useLenis } from "lenis/react";
import {
  motion,
  useAnimation,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { HashLink } from "react-router-hash-link";
import useScrollSpy from "@/hooks/useScrollSpy";
import useMediaQuery from "@/hooks/useMediaQuery";
import classes from "./Navbar.module.css";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import LogoLink from "../LogoLink";
import StaggeredText from "../StaggeredText";

const fallbackIds = ["skills", "projects", "about"];

export default function Navbar() {
  let ids = fallbackIds;
  const { activeSection, sectionIds } = useScrollSpy(".nav-section");
  if (sectionIds.length > 0) {
    ids = sectionIds;
  }

  const [menuOpen, setMenuOpen] = useState(false);
  function handleToggleMenu() {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  }

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const lenis = useLenis();
  const hideNav = useAnimation();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isDesktop) {
      const previous = scrollY.getPrevious();
      if (previous && latest > previous && latest > 50) {
        hideNav.start({ y: "-100%" });
      } else {
        hideNav.start({ y: 0 });
      }
    } else {
      hideNav.start({ y: 0 });
    }
  });

  return (
    <>
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        transition={{ duration: 0.15 }}
        animate={hideNav}
        className={classes.navbar}
        id="navbar"
      >
        <LogoLink
          onClick={() => {
            if (lenis) lenis.scrollTo("#landing");
          }}
        />
        <div className={classes["nav-links"]}>
          {isDesktop &&
            ids.map((id) => {
              return (
                <HashLink
                  key={id}
                  to={`/#${id}`}
                  onClick={() => {
                    if (lenis) lenis.scrollTo(`#${id}`);
                  }}
                >
                  <StaggeredText
                    text={id}
                    wrapperClassName={
                      activeSection === id
                        ? `${classes["active-link"]} ${classes["nav-button"]}`
                        : classes["nav-button"]
                    }
                  />
                </HashLink>
              );
            })}

          {!isDesktop && (
            <button
              className={classes["nav-button"]}
              onClick={handleToggleMenu}
              style={{ lineHeight: 0.8 }}
            >
              Menu
            </button>
          )}
        </div>
      </motion.nav>
      <MobileNavbar
        menuOpen={menuOpen}
        linkIds={ids}
        onClickMenu={handleToggleMenu}
      />
    </>
  );
}
