'use client';
import { useState, useRef } from 'react';
import styles from './Portfolio.module.scss';
import SplitTextAnimation from '@ui/SplitText';
import { projectsConfig } from '@/widgets/Portfolio/Portfolio.config.ts';
import GlassIcons from '@ui/GlassIcons';
import { FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const ICON_CONSTANT = [
  { icon: <FolderOutlined />, iconOpen: <FolderOpenOutlined />, color: 'gray', label: 'CableWalker' },
  { icon: <FolderOutlined />, iconOpen: <FolderOpenOutlined />, color: 'gray', label: 'KILLNOISE' },
  { icon: <FolderOutlined />, iconOpen: <FolderOpenOutlined />, color: 'gray', label: 'Kampus' },
  { icon: <FolderOutlined />, iconOpen: <FolderOpenOutlined />, color: 'gray', label: 'Callibri' },
  { icon: <FolderOutlined />, iconOpen: <FolderOpenOutlined />, color: 'gray', label: 'Simple IT' },
];

interface PortfolioProps {
  setIsModalOpen: (value: boolean) => void;
}

const Portfolio = ({ setIsModalOpen }: PortfolioProps) => {
  const [selectedProject, setSelectedProject] = useState<typeof projectsConfig[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleIconClick = (label: string) => {
    const project = projectsConfig.find((p) => p.name === label) || null;
    setSelectedProject(project);
    setModalOpen(true);
    setIsModalOpen(true); // уведомляем App о модалке
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
    setIsModalOpen(false); // уведомляем App, что модалка закрыта
  };

  const ICONS_WITH_CLICK = ICON_CONSTANT.map((item) => ({
    ...item,
    onClick: () => handleIconClick(item.label),
  }));

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <SplitTextAnimation text="Work experience" delay={0.03} threshold={0.3} fontSize={2.3} />
        <div className={styles.container__inner}>
          <GlassIcons items={ICONS_WITH_CLICK as any} />
        </div>
      </div>

      <Modal
        title={selectedProject?.name}
        open={modalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        {selectedProject && (
          <div ref={modalRef} className={styles.modal__wrapper}>
            <p>{selectedProject.description}</p>
            {selectedProject?.src && (
              <picture className={styles.imgWrapper}>
                {selectedProject.webpSrc && (
                  <source srcSet={selectedProject.webpSrc} type="image/webp" />
                )}
                <img
                  src={selectedProject.src}
                  alt={selectedProject.name}
                  className={styles.img}
                />
              </picture>
            )}
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: selectedProject.experience }} />
            {selectedProject.link && (
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Visit project
              </a>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Portfolio;
