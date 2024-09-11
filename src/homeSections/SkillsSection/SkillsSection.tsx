import { motion } from "framer-motion";
import SkillsCard from "@/components/SkillsCard";
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

export default function SkillsSection() {
  return (
    <section id="skills" className="nav-section">
      <h2>Skills & Experience</h2>
      <motion.div
        className={classes["skills-section"]}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        viewport={{ once: true, amount: 0.33 }}
        initial="hidden"
        whileInView="visible"
      >
        <SkillsCard
          highlighted="Frontend"
          remainderTitle="Development"
          category="frontend"
          colors={frontendColors}
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
        >
          <p>
            Experienced in cross-functional collaboration and research that
            complement my design and development skills. I work closely with
            diverse teams to ensure informed decision-making and deliver
            user-friendly solutions using user testing, research, and data
            visualizations.
          </p>
        </SkillsCard>
      </motion.div>
    </section>
  );
}
