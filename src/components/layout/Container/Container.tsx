import classNames from 'clsx';
import styles from './Container.module.scss';
import type { ContainerHeight, ContainerVariant } from './Container.types';
import type React from 'react';
import type { SpacingSize, SpacingStep } from '@/types';

interface ContainerProps {
  children: React.ReactNode;
  variant: ContainerVariant;
  noGap?: boolean;
  marginTop?: SpacingSize | SpacingStep;
  marginBottom?: SpacingSize | SpacingStep;
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
        marginTop && `mt-${marginTop}`,
        marginBottom && `mb-${marginBottom}`,
        height && styles[`container-${height}`],
        className
      )}
    >
      {children}
    </div>
  );
};
