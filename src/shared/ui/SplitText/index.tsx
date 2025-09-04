import { useState, useEffect, useRef } from 'react';
import './index.scss';

interface SplitTextAnimationProps {
  text: string;
  delay?: number;
  threshold?: number;
  fontSize?: number;
}

const SplitTextAnimation = ({
  text,
  delay = 0.05,
  fontSize = 3,
  threshold = 0.5,
}: SplitTextAnimationProps) => {
  const [letters, setLetters] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLetters(text.split(''));
  }, [text]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={containerRef} className="split-text-container">
      {letters.map((letter, index) => (
        <span
          key={index}
          className={`split-text-letter ${isVisible ? 'animate' : ''}`}
          style={{
            animationDelay: isVisible ? `${index * delay}s` : 'none',
            display: letter === ' ' ? 'inline' : 'inline-block',
            fontSize: `${fontSize}rem`,
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </div>
  );
};

export default SplitTextAnimation;
