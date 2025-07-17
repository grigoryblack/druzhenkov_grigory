import styles from './Header.module.scss';
import Waves from '@ui/WaveBackground';
import TextPressure from '@ui/PressureText';

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <Waves
        lineColor="#2F0101"
        backgroundColor="white"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
      />

      <div className={styles.container}>
        <TextPressure
          text="WASSUP!"
          flex={true}
          alpha={false}
          stroke={true}
          width={true}
          weight={true}
          italic={true}
          textColor="white"
          strokeColor="black"
          minFontSize={36}
        />
      </div>
    </header>
  );
};

export default Header;
