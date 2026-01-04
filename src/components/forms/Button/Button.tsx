import styles from './Button.module.scss';
import classNames from 'clsx';
import type { ButtonProps } from './Button.types';
import { Icon } from '@/components/ui/Icon';
import { useLayoutEffect, useRef } from 'react';

/**
 * A versatile Button component supporting multiple variants, sizes, icons, and states.
 * Can render as either a `<button>` or `<a>` tag based on whether an `href` prop is provided.
 *
 * ## Features
 * - Multiple visual variants (primary, secondary, accent, ghost, link, etc.)
 * - Size variants from xs to lg
 * - Icon support with customizable fill colors
 * - Loading and disabled states
 * - Icon-only variant with required aria-label
 * - Link functionality with external link support
 * - Full-width option
 * - Spacing utilities via margin props
 * - Dynamic gradient angle optimization based on button dimensions
 *
 * ## Gradient Angle Optimization
 * The button automatically calculates and applies an optimized gradient angle based on its
 * dimensions. This creates a visually consistent diagonal gradient regardless of button size:
 * - Uses `useLayoutEffect` to measure rendered dimensions before paint
 * - Compresses width by 0.6× to maintain gradient steepness across different aspect ratios
 * - Calculates angle using `atan2(height, adjustedWidth)` for proper diagonal flow
 * - Sets CSS custom property `--_gradient-angle` for use in button styles
 * - Updates on mount to ensure gradient matches actual rendered dimensions
 *
 * ## Accessibility
 * - Properly handles disabled and loading states with aria attributes
 * - Requires aria-label for icon-only buttons
 * - Adds appropriate rel and target attributes for external links
 * - Keyboard navigable with proper tab index handling
 *
 * @component
 *
 * @example
 * // Basic primary button
 * <Button variant="primary" onClick={handleClick}>
 *   Save Changes
 * </Button>
 *
 * @example
 * // Button with icon
 * <Button variant="secondary" icon={CopyIcon} iconFill="primary">
 *   Copy to Clipboard
 * </Button>
 *
 * @example
 * // Icon-only button (requires aria-label)
 * <Button
 *   variant="ghost"
 *   icon={CloseIcon}
 *   iconOnly
 *   aria-label="Close dialog"
 * />
 *
 * @example
 * // Button as external link
 * <Button href="https://docs.example.com" external>
 *   View Documentation
 * </Button>
 *
 * @example
 * // Loading state
 * <Button variant="primary" loading>
 *   Saving...
 * </Button>
 *
 * @example
 * // Full-width button with spacing
 * <Button variant="accent" fullWidth marginTop="md">
 *   Continue
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
  iconOnly = false,
  'aria-label': ariaLabel,
}: ButtonProps) => {
  // Combine all disabled states
  const isDisabled = disabled || loading;

  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    const { offsetWidth: width, offsetHeight: height } = el;

    // THE MAGIC: We compress the width by a factor of 0.6 to maintain the steepness
    const adjustedWidth = width * 0.6;

    // Calculate angle
    const angleInRad = Math.atan2(height, adjustedWidth);
    const angleInDeg = angleInRad * (180 / Math.PI);

    // Make negative
    el.style.setProperty('--_gradient-angle', `${angleInDeg * -1}deg`);
  }, []);

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
    iconOnly && styles['button--icon-only'],
    {
      [styles['button--disabled']]: isDisabled,
      [styles['button--loading']]: loading,
      [styles['button--full-width']]: fullWidth,
    },
    marginTop && `mt-${marginTop}`,
    marginBottom && `mb-${marginBottom}`,
    className
  );

  const Tag = href ? 'a' : 'button';

  const commonProps = {
    className: commonClassNames,
    onClick: onClick ? (e: any) => handleClick(e) : undefined,
    'aria-busy': loading || undefined,
    'aria-disabled': isDisabled || undefined,
    'aria-label': ariaLabel,
    title: iconOnly ? ariaLabel : undefined,
  };

  const specificProps = href
    ? {
        href,
        target: external ? '_blank' : undefined,
        rel: external ? 'noopener noreferrer' : undefined,
        tabIndex: isDisabled ? -1 : undefined,
      }
    : {
        type,
        disabled: isDisabled,
      };

  const content = (
    <>
      {icon && (
        <span className={styles.button__icon} aria-hidden="true">
          <Icon icon={icon} size="1.2em" fill={iconFill} />
        </span>
      )}
      {!iconOnly && children && (
        <span
          className={classNames(
            `text-${size}`,
            'text-medium',
            styles.button__text
          )}
        >
          {children}
        </span>
      )}
    </>
  );

  return (
    <Tag ref={btnRef as any} {...commonProps} {...specificProps}>
      {content}
    </Tag>
  );
};
