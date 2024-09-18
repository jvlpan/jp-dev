import { HashLink } from "react-router-hash-link";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./MobileNavbar.module.css";
import LogoLink from "../LogoLink";
import { useLenis } from "lenis/react";

interface MobileNavbarProps {
  menuOpen: boolean;
  linkIds: string[];
  onClickMenu: () => void;
}

export default function MobileNavbar({
  menuOpen,
  linkIds,
  onClickMenu,
}: MobileNavbarProps) {
  const lenis = useLenis();
  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className={classes["mobile-overlay"]}
          variants={{
            hidden: {
              y: "-100%",
            },
            visible: {
              y: 0,
              transition: {
                duration: 0.3,
                ease: [0.12, 0, 0.39, 0],
              },
            },
            exit: {
              y: "-100%",
              transition: {
                delay: 0.4,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className={classes["mobile-overlay-items"]}>
            <motion.div
              className={classes["mobile-overlay-top"]}
              variants={{
                hidden: {
                  opacity: 0,
                  transition: {
                    delay: 0.15,
                    duration: 0.3,
                  },
                },
                visible: {
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                    duration: 0.5,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <LogoLink />
              <button className={classes["nav-button"]} onClick={onClickMenu}>
                Close
              </button>
            </motion.div>
            <motion.div
              className={classes["mobile-links"]}
              variants={{
                hidden: {
                  transition: { staggerChildren: 0.15, staggerDirection: -1 },
                },
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.15,
                    staggerDirection: 1,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {linkIds.map((id) => {
                return (
                  <div key={id} style={{ overflow: "hidden" }}>
                    <motion.div
                      className={classes["mobile-link"]}
                      variants={{
                        hidden: {
                          y: "50vh",
                          transition: {
                            duration: 0.35,
                            ease: [0.37, 0, 0.63, 1],
                          },
                        },
                        visible: {
                          y: 0,
                          transition: {
                            duration: 0.6,
                            ease: [0, 0.55, 0.45, 1],
                          },
                        },
                      }}
                    >
                      <HashLink
                        to={`/#${id}`}
                        onClick={() => {
                          if (lenis) lenis.scrollTo(`#${id}`, { offset: -75 });
                          onClickMenu();
                        }}
                      >
                        {id}
                      </HashLink>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  transition: {
                    delay: 0.15,
                    duration: 0.3,
                  },
                },
                visible: {
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                    duration: 0.5,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <p>Where are we heading?</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
