import { Link } from 'react-router-dom';
import styles from './Brand.module.scss';
import classNames from 'clsx';

interface BrandProps {}

export const Brand = ({}: BrandProps) => {
  return (
    <Link
      to="/"
      className={classNames(styles.brand)}
      aria-label="Go to homepage"
    >
      <span className={classNames(styles['brand__first-part'])}>
        PrecisionSpec
      </span>
      <span className={classNames(styles['brand__second-part'])}>.dev</span>
    </Link>
  );
};
