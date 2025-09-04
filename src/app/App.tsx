import { useState, useEffect, useRef } from 'react';
import Header from '@/widgets/Header';
import Menu from '@ui/Menu';
import About from '@/widgets/About';
import Skills from '@/widgets/Skills';
import styles from './app.module.scss';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Portfolio from '@/widgets/Portfolio';

function App() {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const isAnimatingRef = useRef(false);
  const touchStartY = useRef<number>(0);

  const sections = [
    { id: 'home', component: <Header key="header" /> },
    { id: 'about', component: <About key="about" /> },
    { id: 'skills', component: <Skills key="skills" /> },
    { id: 'portfolio', component: <Portfolio key="portfolio" /> },
  ];

  const currentSectionRef = useRef(currentSection);
  useEffect(() => {
    currentSectionRef.current = currentSection;
    history.replaceState(null, '', `#${sections[currentSection].id}`);
  }, [currentSection]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const sectionIndex = sections.findIndex((section) => section.id === hash);
    if (sectionIndex >= 0) setCurrentSection(sectionIndex);
  }, []);

  // Переход к секции
  const goToSection = (index: number) => {
    if (index < 0 || index >= sections.length || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setCurrentSection(index);
  };

  const goToNext = () => goToSection(currentSectionRef.current + 1);
  const goToPrev = () => goToSection(currentSectionRef.current - 1);

  // Wheel и Touch
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (isAnimatingRef.current) return;
    e.deltaY > 0 ? goToNext() : goToPrev();
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (isAnimatingRef.current) return;
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goToNext() : goToPrev();
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleTransitionEnd = () => {
    isAnimatingRef.current = false;
  };

  const handleAnchorClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const sectionIndex = sections.findIndex((section) => section.id === id);
    if (sectionIndex >= 0 && sectionIndex !== currentSectionRef.current) {
      goToSection(sectionIndex);
    }
  };

  return (
    <div className={styles.scrollContainer}>
      <div
        className={styles.sectionsWrapper}
        style={{ transform: `translateY(-${currentSection * 100}vh)` }}
        onTransitionEnd={handleTransitionEnd}
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
          aria-label="Previous section"
        >
          <ArrowUpOutlined />
        </button>
      )}

      {currentSection < sections.length - 1 && (
        <button
          className={`${styles.navButton} ${styles.down}`}
          onClick={goToNext}
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
