import type { JSX } from 'react';
import type { HeadingProps } from './Heading.types';
import classNames from 'clsx';
import styles from './Heading.module.scss';

export const Heading = ({
  children,
  level,
  size,
  weight,
  align,
  variant,
  family,
  marginTop,
  marginBottom,
  className,
  ...rest
}: HeadingProps) => {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Component
      className={classNames(
        styles.heading,
        `${size}`,
        family && `font-family-${family}`,
        weight && `font-weight-${weight}`,
        align && `text-align-${align}`,
        variant && `color-text-${variant}`,
        marginTop && `mt-${marginTop}`,
        marginBottom && `mb-${marginBottom}`,
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
