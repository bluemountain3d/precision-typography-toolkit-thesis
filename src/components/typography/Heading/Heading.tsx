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
        weight && styles[`text--${weight}`],
        align && styles[`text--${align}`],
        variant && styles[`text--${variant}`],
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
