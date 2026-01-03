import { Link } from 'react-router-dom';
import styles from './Brand.module.scss';
import classNames from 'clsx';

interface BrandProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Brand = ({ size = 'lg', className }: BrandProps) => {
  return (
    <Link
      to="/"
      className={classNames(
        styles.brand,
        styles[`brand--size-${size}`],
        className
      )}
      aria-label="Go to homepage"
    >
      <span className={classNames(styles['brand__first-part'])}>
        PrecisionSpec
      </span>
      <span className={classNames(styles['brand__second-part'])}>.dev</span>
    </Link>
  );
};
