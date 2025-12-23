import classNames from 'clsx';
import styles from './Container.module.scss';
import type { ContainerHeight, ContainerVariant } from './Container.types';
import type React from 'react';
import type { Spacing } from '@models';

interface ContainerProps {
  children: React.ReactNode;
  variant: ContainerVariant;
  noGap?: boolean;
  marginTop?: Spacing | number;
  marginBottom?: Spacing | number;
  height?: ContainerHeight;
  className?: string;
}

export const Container = ({
  children,
  variant = 'boxed',
  noGap = false,
  marginTop,
  marginBottom,
  height,
  className,
}: ContainerProps) => {
  return (
    <div
      className={classNames(
        styles.container,
        styles[`container-${variant}`],
        noGap && styles['no-gap'],
        marginTop && `mbl-start-${marginTop}`,
        marginBottom && `mbl-end-${marginBottom}`,
        height && styles[`container-${height}`],
        className
      )}
    >
      {children}
    </div>
  );
};
