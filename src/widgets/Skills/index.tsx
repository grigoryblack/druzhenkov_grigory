import { useState } from 'react';
import styles from './Skills.module.scss';
import SplitTextAnimation from '@ui/SplitText';
import { SKILLS } from '@/widgets/Skills/Skills.config.ts';
import { StarFilled, StarOutlined } from '@ant-design/icons';

type TSkill = {
  id: number;
  name: string;
  rating: number;
  description: string[];
};

const Skills = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const visibleSkills = showAll ? SKILLS : SKILLS.slice(0, 6);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <SplitTextAnimation text="Skills" delay={0.03} threshold={0.3} />

        <div
          data-scrollable={showAll ? true : undefined}
          className={`${styles.container__info} ${showAll ? styles.scrollable : ''}`}
        >
          {visibleSkills.map((skill: TSkill) => (
            <div
              key={skill.id}
              className={`${styles.accordion} ${openId === skill.id ? styles.active : ''}`}
            >
              <button
                className={`${styles.accordion__header} ${openId === skill.id ? styles.active : ''}`}
                onClick={() => toggleAccordion(skill.id)}
              >
                <span>{skill.name}</span>
                <span className={styles.rating}>
                  {Array.from({ length: skill.rating }, (_, i) => (
                    <StarFilled key={`filled-${i}`} />
                  ))}
                  {Array.from({ length: 5 - skill.rating }, (_, i) => (
                    <StarOutlined key={`outlined-${i}`} />
                  ))}
                </span>
              </button>

              <div className={styles.accordion__content}>
                <ul>
                  {skill.description.map((desc: string, i: number) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <button className={styles.showMoreBtn} onClick={toggleShowAll}>
          {showAll ? 'Hide' : 'Show more'}
        </button>
      </div>
    </section>
  );
};

export default Skills;
