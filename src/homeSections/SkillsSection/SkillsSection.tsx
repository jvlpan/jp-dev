import SkillsCard from "@/components/SkillsCard";
import ReactSVG from "@/assets/logos/react.svg?react";
import JavaScriptSVG from "@/assets/logos/javascript.svg?react";
import PhotoshopSVG from "@/assets/logos/adobe-photoshop.svg?react";
import IllustratorSVG from "@/assets/logos/adobe-illustrator.svg?react";
import FigmaSVG from "@/assets/logos/figma.svg?react";
import CollaborationSVG from "@/assets/logos/collaboration.svg?react";
import WebsiteSVG from "@/assets/logos/website.svg?react";

import classes from "./SkillsSection.module.css";

const frontendColors = {
  background: "#13526b",
  color: "#67cdcc",
  "background-hover": "#67cdcc",
};

const designColors = {
  background: "#742222",
  color: "#ffa69d",
  "background-hover": "#ffa69d",
};

const researchColors = {
  background: "#44215c",
  color: "#d5b6f9",
  "background-hover": "#d5b6f9",
};

const frontendSVGs = [
  {
    svgComponent: ReactSVG,
    title: "React Icon",
    className: classes["react-svg"],
  },
  {
    svgComponent: JavaScriptSVG,
    title: "JavaScript Icon",
    className: classes["javascript-svg"],
  },
];

const designSVGs = [
  {
    svgComponent: PhotoshopSVG,
    title: "Adobe Photoship Icon",
    className: classes["photoshop-svg"],
  },
  {
    svgComponent: IllustratorSVG,
    title: "Adobe Illutrator Icon",
    className: classes["illustrator-svg"],
  },
  {
    svgComponent: FigmaSVG,
    title: "Figma Icon",
    className: classes["figma-svg"],
  },
];

const researchSVG = [
  {
    svgComponent: CollaborationSVG,
    title: "Handshake Icon to represent collaboration",
    className: classes["collaboration-svg"],
  },
  {
    svgComponent: WebsiteSVG,
    title: "Generic Browser Window Icon",
    className: classes["website-svg"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="nav-section">
      <h2>Skills & Experience</h2>
      <div className={classes["skills-section"]}>
        <SkillsCard
          highlighted="Frontend"
          remainderTitle="Development"
          category="frontend"
          colors={frontendColors}
          delay={0.15}
          svgs={frontendSVGs}
        >
          <p>
            Dedicated to creating efficient, engaging, and responsive web
            experiences. With a strong passion for interactive media and
            animation, I craft unique and dynamic websites while ensuring my
            work remains accessible. I also love continuously learning new web
            development technologies and frameworks.
          </p>
        </SkillsCard>
        <SkillsCard
          highlighted="UI/UX"
          remainderTitle="Design"
          category="design"
          colors={designColors}
          delay={0.3}
          svgs={designSVGs}
        >
          <p>
            Passionate about designing intuitive UIs with strong, cohesive
            visual identity. Through rapid prototypes and interactive mockups, I
            bring concepts to life and design web experiences that are engaging
            and user-friendly.
          </p>
        </SkillsCard>
        <SkillsCard
          highlighted="Collaboration"
          remainderTitle="and Research"
          category="research"
          colors={researchColors}
          delay={0.45}
          svgs={researchSVG}
        >
          <p>
            Experienced in cross-functional collaboration and research that
            complement my design and development skills. I work closely with
            diverse teams to ensure informed decision-making and deliver
            user-friendly solutions using user testing, research, and data
            visualizations.
          </p>
        </SkillsCard>
      </div>
    </section>
  );
}
