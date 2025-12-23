import classNames from 'clsx';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={classNames(styles.footer)}>
      <p>{'This is a footer'}</p>
    </footer>
  );
};
