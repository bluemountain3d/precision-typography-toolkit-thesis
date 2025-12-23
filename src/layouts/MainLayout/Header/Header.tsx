import classNames from 'clsx';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={classNames(styles.header)}>
      <p>{'This is a header'}</p>
    </header>
  );
};
