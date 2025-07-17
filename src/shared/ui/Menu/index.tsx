import { useEffect, useState } from 'react';
import styles from './Menu.module.scss';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { label: 'Главная', value: 'home' },
    { label: 'Обо мне', value: 'about' },
    { label: 'Портфолио', value: 'portfolio' },
    { label: 'Контакты', value: 'contacts' },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <div className={`${styles.menuContainer} ${isOpen ? styles.open : ''}`}>
      <button className={styles.menuTrigger} onClick={toggleMenu}>
        <MenuOutlined />
      </button>

      <div className={styles.menuContent}>
        <button onClick={toggleMenu} className={styles.closeIcon}>
          <CloseOutlined />
        </button>
        <nav className={styles.nav}>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href={`#${item.value}`} onClick={toggleMenu}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
