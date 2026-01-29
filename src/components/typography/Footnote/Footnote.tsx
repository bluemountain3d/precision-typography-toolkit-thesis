import type React from 'react';
import styles from './Footnote.module.scss';
import classNames from 'clsx';

interface FootnoteProps {
  children: React.ReactNode;
}

export const Footnote = ({ children }: FootnoteProps) => {
  return (
    <p
      className={classNames(styles.footnote, 'text-xs', 'color-text-secondary')}
    >
      {children}
    </p>
  );
};
