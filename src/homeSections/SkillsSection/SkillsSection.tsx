import SkillsCard from "@/components/SkillsCard";
import classes from "./SkillsSection.module.css";

interface SkillsSectionProps {
  onTagClick: (tag: string) => void;
}

export default function SkillsSection({ onTagClick }: SkillsSectionProps) {
  return (
    <section id="experience" className={classes["scroll-margin"]}>
      <h2>Skills & Experience</h2>
      <div className={classes["skills-section"]}>
        <SkillsCard
          highlighted="Frontend"
          remainderTitle="Development"
          category="frontend"
          onTagClick={onTagClick}
        >
          <p>Detailed description coming soon!</p>
        </SkillsCard>
        <SkillsCard
          highlighted="UI/UX"
          remainderTitle="Design"
          category="design"
          onTagClick={onTagClick}
        >
          <p>Detailed description coming soon!</p>
        </SkillsCard>
        <SkillsCard
          highlighted="Collaboration"
          remainderTitle="and Research"
          category="research"
          onTagClick={onTagClick}
        >
          <p>Detailed description coming soon!</p>
        </SkillsCard>
      </div>
    </section>
  );
}
