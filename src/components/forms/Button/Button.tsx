import styles from './Button.module.scss';
import classNames from 'clsx';
import type { ButtonProps } from './Button.types';
import type React from 'react';
import { Icon } from '@/components/ui/Icon';

/**
 * Button component with support for multiple variants, sizes, icons, and states.
 * Can render as either a button or anchor tag based on props.
 *
 * @example
 * // Basic button
 * <Button variant="primary" onClick={handleClick}>
 *   Save
 * </Button>
 *
 * @example
 * // Button with icon
 * <Button variant="secondary" icon={CopyIcon} iconFill="primary">
 *   Copy
 * </Button>
 *
 * @example
 * // Button as link
 * <Button href="/docs" external>
 *   Documentation
 * </Button>
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'base',
  icon,
  iconFill = 'inherit',
  disabled = false,
  loading = false,
  onClick,
  href,
  external = false,
  type = 'button',
  fullWidth,
  marginTop,
  marginBottom,
  className,
}: ButtonProps) => {
  // Combine all disabled states
  const isDisabled = disabled || loading;

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    if (!isDisabled && onClick) {
      onClick(e as React.MouseEvent<HTMLButtonElement>);
    }
  };

  const commonClassNames = classNames(
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    icon && styles[`button--icon-spacing`],
    {
      [styles['button--disabled']]: isDisabled,
      [styles['button--loading']]: loading,
      [styles['button--full-width']]: fullWidth,
    },
    marginTop && `mt-${marginTop}`,
    marginBottom && `mb-${marginBottom}`,
    className
  );

  const Component = href ? 'a' : 'button';

  if (Component === 'a') {
    return (
      <Component
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick ? (e) => handleClick(e) : undefined}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : undefined}
        className={commonClassNames}
      >
        {icon && (
          <span className={styles.button__icon} aria-hidden="true">
            <Icon icon={icon} size="1.2em" fill={iconFill} />
          </span>
        )}
        <span
          className={classNames(
            `text-${size}`,
            'text-medium',
            styles.button__text
          )}
        >
          {children}
        </span>
      </Component>
    );
  }

  return (
    <Component
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
      className={commonClassNames}
    >
      {icon && (
        <span className={styles.button__icon} aria-hidden="true">
          <Icon icon={icon} size="1.2em" fill={iconFill} />
        </span>
      )}
      <span
        className={classNames(
          `text-${size}`,
          'text-medium',
          styles.button__text
        )}
      >
        {children}
      </span>
    </Component>
  );
};
