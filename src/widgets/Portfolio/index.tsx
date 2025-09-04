import styles from './Portfolio.module.scss';
import SplitTextAnimation from '@ui/SplitText';
import { projectsConfig } from '@/widgets/Portfolio/Portfolio.config.ts';
import GlassIcons from '@ui/GlassIcons';
import { FolderOpenOutlined, FolderOutlined } from '@ant-design/icons';

const ICON_CONSTANT = [
  { icon: <FolderOutlined />, iconOpen: <FolderOpenOutlined />, color: 'blue', label: 'CableWalker' },
  { icon: <FolderOutlined />, iconOpen: <FolderOpenOutlined />, color: 'purple', label: 'KILLNOISE' },
  { icon: <FolderOutlined />, iconOpen: <FolderOpenOutlined />, color: 'red', label: 'Kampus' },
  { icon: <FolderOutlined />, iconOpen: <FolderOpenOutlined />, color: 'orange', label: 'Callibri' },
  { icon: <FolderOutlined />, iconOpen: <FolderOpenOutlined />, color: 'green', label: 'Simple IT' },
];

const Portfolio = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <SplitTextAnimation text="Work experience" delay={0.03} threshold={0.3} fontSize={2.3} />
        <div className={styles.container__inner}>
          <GlassIcons items={ICON_CONSTANT} />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
