import { useState, useEffect, useRef } from 'react';
import Header from '@/widgets/Header';
import Menu from '@ui/Menu';
import About from '@/widgets/About';
import styles from './app.module.scss';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

function App() {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const touchStartY = useRef<number>(0);
  const wheelTimeout = useRef<ReturnType<typeof setTimeout>>(0);
  const sections = [
    { id: 'home', component: <Header key="header" /> },
    { id: 'about', component: <About key="about" /> },
  ];

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const sectionIndex = sections.findIndex((section) => section.id === hash);
    if (sectionIndex >= 0) {
      setCurrentSection(sectionIndex);
    }
  }, []);

  useEffect(() => {
    history.replaceState(null, '', `#${sections[currentSection].id}`);
  }, [currentSection]);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();

    if (isAnimating) return;

    if (e.deltaY > 0) {
      goToNext();
    } else {
      goToPrev();
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (isAnimating) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  const goToNext = () => {
    if (currentSection < sections.length - 1) {
      setIsAnimating(true);
      setCurrentSection((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentSection > 0) {
      setIsAnimating(true);
      setCurrentSection((prev) => prev - 1);
    }
  };

  const handleAnchorClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const sectionIndex = sections.findIndex((section) => section.id === id);

    if (sectionIndex === currentSection) return;

    if (sectionIndex >= 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentSection(sectionIndex);
    }
  };

  useEffect(() => {
    if (wheelTimeout.current) clearTimeout(wheelTimeout.current);

    wheelTimeout.current = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);

    return () => {
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
    };
  }, [currentSection]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
    };
  }, [currentSection, isAnimating]);

  return (
    <div className={styles.scrollContainer}>
      <div
        className={styles.sectionsWrapper}
        style={{ transform: `translateY(-${currentSection * 100}vh)` }}
      >
        {sections.map((section, index) => (
          <div
            key={index}
            id={section.id}
            className={`${styles.section} ${index === currentSection ? styles.active : ''}`}
          >
            {section.component}
          </div>
        ))}
      </div>

      <div className={styles.progressIndicator}>
        {sections.map((section, index) => (
          <a
            key={index}
            href={`#${section.id}`}
            onClick={(e) => handleAnchorClick(e, section.id)}
            className={`${styles.indicatorDot} ${index === currentSection ? styles.active : ''}`}
          />
        ))}
      </div>

      {currentSection > 0 && (
        <button
          className={`${styles.navButton} ${styles.up}`}
          onClick={goToPrev}
          disabled={isAnimating}
          aria-label="Previous section"
        >
          <ArrowUpOutlined />
        </button>
      )}

      {currentSection < sections.length - 1 && (
        <button
          className={`${styles.navButton} ${styles.down}`}
          onClick={goToNext}
          disabled={isAnimating}
          aria-label="Next section"
        >
          <ArrowDownOutlined />
        </button>
      )}

      <Menu key="menu" handleAnchorClick={handleAnchorClick} />
    </div>
  );
}

export default App;
