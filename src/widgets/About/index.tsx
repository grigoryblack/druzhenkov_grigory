import { useEffect, useRef } from "react";
import styles from './About.module.scss';
import SplitTextAnimation from '@ui/SplitText';
import TiltedCard from '@ui/TiltedCard';
import myself from '../../assets/img/myself.webp';

const About = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (window.innerWidth >= 768) return;

    let hasAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;

            setTimeout(() => {
              const start = el.scrollLeft;
              const distance = 120;
              const duration = 1200;

              let startTime: number | null = null;

              const animate = (time: number) => {
                if (!startTime) startTime = time;
                const progress = (time - startTime) / duration;

                if (progress < 1) {
                  el.scrollLeft = start + distance * Math.sin(progress * Math.PI);
                  requestAnimationFrame(animate);
                } else {
                  el.scrollLeft = start;
                }
              };

              requestAnimationFrame(animate);
            }, 1000);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>
          <SplitTextAnimation text="Who am I?" delay={0.03} threshold={0.3} />
        </div>

        <div className={styles.container__info} ref={scrollRef}>
          <div className={styles.card__wrapper}>
            <TiltedCard>
              <div className={styles.card}>
                <img src={myself} alt="myself-img" />
                <h2>Druzhenkov Grigory</h2>
                <div className={styles.about}>
                  <p>
                    Role — <span>Frontend-developer</span>
                  </p>
                  <p>
                    work experience — <span>4 years</span>
                  </p>
                </div>
              </div>
            </TiltedCard>
          </div>

          <div className={styles.education}>
            <div className={styles.title__desctop}>
              <SplitTextAnimation text="Who am I?" delay={0.03} threshold={0.3} />
            </div>
            <h3>Education</h3>

            <p>
              Ural Federal University named after the first President of Russia B. N. Yeltsin
              ,(UrFU), Yekaterinburg
              <span>August 2020 — June 2024</span>
              <span>Applied Informatics</span>
            </p>

            <br />

            <p>
              Military training center named after Hero of the Soviet Union B. G. Rossokhin, (UrFU),
              Yekaterinburg
              <span>November 2021 — July 2024</span>
              <span>Troops: Air Defense, Lieutenant</span>
            </p>

            <h3>Work now</h3>
            <p><a className={styles.accent} href={"https://callibri.ru/"} target={"_blank"}>Callibri</a> — services for automating work with leads at all stages of the funnel.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
