import type { TextProps } from './Text.types';
import styles from './Text.module.scss';
import classNames from 'clsx';

export const Text = ({
  children,
  as: Component = 'p',
  size = 'base',
  weight,
  italic,
  align,
  variant,
  family,
  marginTop,
  marginBottom,
  className,
  ...rest
}: TextProps) => {
  return (
    <Component
      className={classNames(
        styles.text,
        size && `text-${size}`,
        family && `font-family-${family}`,
        italic && `font-style-italic`,
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
