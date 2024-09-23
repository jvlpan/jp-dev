import useMediaQuery from "@/hooks/useMediaQuery";
import RevealText from "@/components/RevealText";
import ImageCard from "@/components/ImageCard";
import photoImg from "@/assets/photo.jpg";
import drawingImg from "@/assets/drawing.png";
import classes from "./AboutSection.module.css";
import ScrollParagraph from "@/components/ScrollParagraph";

export default function AboutSection() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <section id="about" className="nav-section">
      <RevealText>
        <h2>About Me</h2>
      </RevealText>
      <div className={classes["about-section"]}>
        <ImageCard
          photoImg={photoImg}
          drawingImg={drawingImg}
          photoAlt="Headshot of Julia Pan from the shoulders up, smiling"
          drawingAlt="A stylized self-portrait drawing of Julia Pan with a pastel rainbow"
          hoverText={`Hello! \u2728`}
        />
        <div className={classes["text-block"]}>
          <ScrollParagraph
            percentScrollStart={0.9}
            percentScrollEnd={isDesktop ? 0.7 : 0.5}
          >
            I specialize in front-end development and UI design, focusing on
            creating engaging experiences through storytelling and animation. I
            like to make designs that are user-centered and accessible, but also
            unique and visually appealing.
          </ScrollParagraph>
          <ScrollParagraph
            percentScrollStart={0.85}
            percentScrollEnd={isDesktop ? 0.65 : 0.45}
          >
            I also enjoy learning new tools, technologies, and frameworks, or
            trying out different approaches to solve complex problems.
            That&apos;s how I built this portfolio, with a lot of
            experimentation and MDN Docs permanently open on another tab.
          </ScrollParagraph>
          <ScrollParagraph
            percentScrollStart={0.8}
            percentScrollEnd={isDesktop ? 0.6 : 0.4}
          >
            I&apos;m currently on the lookout for part-time or full-time
            opportunities. If you need someone with experience in both design
            and development, I&apos;d love to talk and see if we can work
            together! Let&apos;s chat! &#x2728;
          </ScrollParagraph>
        </div>
      </div>
    </section>
  );
}
