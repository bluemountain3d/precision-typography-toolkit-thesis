import classNames from 'clsx';
import styles from './Main.module.scss';

interface MainProps {
  children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <main id="main-content" className={classNames(styles.main)}>
      {children}
    </main>
  );
};
