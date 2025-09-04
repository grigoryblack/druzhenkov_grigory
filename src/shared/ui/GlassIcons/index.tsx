import React, { useState } from 'react';
import './GlassIcons.scss';

export interface GlassIconsItem {
  icon: React.ReactElement;
  iconOpen: React.ReactElement;
  color: string;
  label: string;
  customClass?: string;
  onClick?: () => void; // добавляем поддержку клика
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}

const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={`icon-btns ${className || ''}`}>
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          className={`icon-btn ${item.customClass || ''}`}
          aria-label={item.label}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={item.onClick}
        >
          <span className="icon-btn__back"></span>
          <span className="icon-btn__front">
            <span className="icon-btn__icon" aria-hidden="true">
              {hoveredIndex === index ? item.iconOpen : item.icon}
            </span>
          </span>
          <span className="icon-btn__label">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default GlassIcons;
