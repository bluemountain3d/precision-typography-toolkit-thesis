import type { TextProps } from './Text.types';
import styles from './Text.module.scss';
import classNames from 'clsx';

export const Text = ({
  children,
  as: Component = 'p',
  size = 'base',
  weight,
  align,
  variant,
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
        weight && styles[`text--${weight}`],
        variant && styles[`text--${variant}`],
        align && styles[`text--${align}`],
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
