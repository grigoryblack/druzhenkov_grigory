import styles from './About.module.scss';
import SplitTextAnimation from '@ui/SplitText';
import TiltedCard from '@ui/TiltedCard';
import myself from '../../assets/img/myself.webp';
import MagnetLines from '@ui/MagnetLines';

const About = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <SplitTextAnimation text="Who am I?" delay={0.03} threshold={0.3} />

        <div className={styles.container__info}>
          <div lang={styles.card__wrapper}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
