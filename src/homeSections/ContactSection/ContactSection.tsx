import EmailForm from "@/components/EmailForm";
import RevealText from "@/components/RevealText";
import classes from "./ContactSection.module.css";
import ScrollParagraph from "@/components/ScrollParagraph";

export default function ContactSection() {
  return (
    <section id="contact" className="nav-section">
      <RevealText>
        <h2>Contact Me</h2>
      </RevealText>
      <div className={classes.container}>
        <ScrollParagraph percentScrollStart={0.8} percentScrollEnd={0.5}>
          I&apos;m currently on the lookout for part-time or full-time
          opportunities. If you need someone with experience in both design and
          development, I&apos;d love to talk and see if we can work together!
        </ScrollParagraph>
        <EmailForm className={classes.form} />
      </div>
    </section>
  );
}
