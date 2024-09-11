import SkillsCard from "@/components/SkillsCard";
import classes from "./SkillsSection.module.css";

export default function SkillsSection() {
  return (
    <section id="experience" className={classes["scroll-margin"]}>
      <h2>Skills & Experience</h2>
      <div className={classes["skills-section"]}>
        <SkillsCard
          highlighted="Frontend"
          remainderTitle="Development"
          category="frontend"
        >
          <p>Detailed description coming soon!</p>
        </SkillsCard>
        <SkillsCard
          highlighted="UI/UX"
          remainderTitle="Design"
          category="design"
        >
          <p>Detailed description coming soon!</p>
        </SkillsCard>
        <SkillsCard
          highlighted="Collaboration"
          remainderTitle="and Research"
          category="research"
        >
          <p>Detailed description coming soon!</p>
        </SkillsCard>
      </div>
    </section>
  );
}
