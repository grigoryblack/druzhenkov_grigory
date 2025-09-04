'use client';
import { useState, useEffect, useRef } from 'react';
import Header from '@/widgets/Header';
import Menu from '@ui/Menu';
import About from '@/widgets/About';
import Skills from '@/widgets/Skills';
import Portfolio from '@/widgets/Portfolio';
import styles from './app.module.scss';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

function App() {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAnimatingRef = useRef(false);
  const touchStartY = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const SCROLL_THRESHOLD = 30; // порог колесика
  const TOUCH_THRESHOLD = 80;  // порог для тача

  const sections = [
    { id: 'home', component: <Header key="header" /> },
    { id: 'about', component: <About key="about" /> },
    { id: 'skills', component: <Skills key="skills" /> },
    { id: 'portfolio', component: <Portfolio key="portfolio" setIsModalOpen={setIsModalOpen} /> },
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

  const goToSection = (index: number) => {
    if (index < 0 || index >= sections.length || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setCurrentSection(index);
  };

  const goToNext = () => goToSection(currentSectionRef.current + 1);
  const goToPrev = () => goToSection(currentSectionRef.current - 1);

  const handleTransitionEnd = () => {
    isAnimatingRef.current = false;
  };

  // Проверка, дошли ли до низа текущей секции
  const isAtBottom = () => {
    const section = containerRef.current?.children[currentSectionRef.current] as HTMLElement;
    if (!section) return false;
    return section.scrollTop + section.clientHeight >= section.scrollHeight - 5;
  };

  // Проверка, вверху ли текущая секция
  const isAtTop = () => {
    const section = containerRef.current?.children[currentSectionRef.current] as HTMLElement;
    if (!section) return false;
    return section.scrollTop <= 5;
  };

  // Скролл колесом
  const handleWheel = (e: WheelEvent) => {
    if (isModalOpen) return;
    e.preventDefault();
    if (isAnimatingRef.current || Math.abs(e.deltaY) < SCROLL_THRESHOLD) return;

    const section = containerRef.current?.children[currentSectionRef.current] as HTMLElement;
    if (!section) return;

    if (e.deltaY > 0) {
      // вниз
      if (isAtBottom()) {
        goToNext();
      } else {
        section.scrollBy({ top: e.deltaY, behavior: 'smooth' });
      }
    } else {
      // вверх
      if (isAtTop()) {
        goToPrev();
      } else {
        section.scrollBy({ top: e.deltaY, behavior: 'smooth' });
      }
    }
  };

  // Скролл тачем
  const handleTouchStart = (e: TouchEvent) => {
    if (isModalOpen) return;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (isModalOpen || isAnimatingRef.current) return;
    const diff = touchStartY.current - e.changedTouches[0].clientY;

    const section = containerRef.current?.children[currentSectionRef.current] as HTMLElement;
    if (!section) return;

    if (diff > TOUCH_THRESHOLD) {
      // свайп вверх → листаем вниз
      if (isAtBottom()) goToNext();
      else section.scrollBy({ top: diff, behavior: 'smooth' });
    } else if (diff < -TOUCH_THRESHOLD) {
      // свайп вниз → листаем вверх
      if (isAtTop()) goToPrev();
      else section.scrollBy({ top: diff, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isModalOpen]);

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
        ref={containerRef}
        className={styles.sectionsWrapper}
        style={{ transform: `translateY(-${currentSection * 100}vh)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {sections.map((section, index) => (
          <div
            key={index}
            id={section.id}
            className={`${styles.section} ${index === currentSection ? styles.active : ''}`}
            style={{ overflowY: 'auto' }} // важно для скролла внутри секции
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
