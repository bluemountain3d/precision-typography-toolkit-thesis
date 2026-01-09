import type React from 'react';
import styles from './Backdrop.module.scss';
import classNames from 'clsx';

interface BackdropProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Backdrop = ({ onClick, children }: BackdropProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClick) {
      onClick();
    }
  };

  return (
    <div className={classNames(styles.backdrop)} onClick={handleBackdropClick}>
      {children}
    </div>
  );
};
