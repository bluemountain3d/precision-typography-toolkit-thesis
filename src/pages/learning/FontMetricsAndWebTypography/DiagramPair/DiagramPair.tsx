import styles from './DiagramPair.module.scss';

export const DiagramPair = ({ children }: { children: React.ReactNode }) => (
  <div className={styles['diagram-pair']}>{children}</div>
);
