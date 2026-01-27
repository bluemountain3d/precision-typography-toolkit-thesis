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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={classNames(styles.backdrop)}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Close backdrop"
    >
      {children}
    </div>
  );
};
