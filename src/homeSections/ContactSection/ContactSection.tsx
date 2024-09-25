import { motion, useReducedMotion } from "framer-motion";
import EmailForm from "@/components/EmailForm";
import RevealText from "@/components/RevealText";
import classes from "./ContactSection.module.css";

export default function ContactSection() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <section id="contact" className="nav-section">
      <RevealText>
        <h2>Contact Me</h2>
      </RevealText>
      <div className={classes.container}>
        <motion.p
          variants={{
            hidden: {
              opacity: 0,
              y: shouldReduceMotion ? 0 : "100%",
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                duration: 1,
              },
            },
          }}
          viewport={{ once: true, amount: 0.15 }}
          initial="hidden"
          exit="hidden"
          whileInView="visible"
        >
          I&apos;m currently on the lookout for part-time or full-time
          opportunities. If you need someone with experience in both design and
          development, I&apos;d love to talk and see if we can work together!
        </motion.p>
        <EmailForm className={classes.form} />
      </div>
    </section>
  );
}
