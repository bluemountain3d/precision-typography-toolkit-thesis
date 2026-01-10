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
 * - Multiple visual variants (primary, secondary, accent, ghost, link, success, warning, danger, info, label)
 * - Size variants from xs to lg
 * - Icon support with customizable fill colors
 * - Loading and disabled states
 * - Icon-only variant with required aria-label
 * - Link functionality with external link support
 * - Full-width option
 * - Spacing utilities via margin props
 * - Dynamic gradient angle optimization based on button dimensions
 *
 * ## Variants
 * - **primary**: Main call-to-action (default)
 * - **secondary**: Alternative action
 * - **accent**: Highlighted/featured action
 * - **ghost**: Minimal styling, transparent background
 * - **link**: Styled as inline link
 * - **success**: Positive actions (green)
 * - **warning**: Caution-required actions (yellow/orange)
 * - **danger**: Destructive actions (red)
 * - **info**: Informational actions (blue)
 * - **label**: Non-interactive display for metric information (monospace font)
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
 *
 * @example
 * // Label variant for displaying metric information
 * <Button variant="label" radius="sm">
 *   Cap Height: 700 / 1000upm (0.700em)
 * </Button>
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'base',
  narrow = false,
  radius = 'md',
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
  ...rest
}: ButtonProps) => {
  // Combine all disabled states
  const isDisabled = disabled || loading;
  const isLabel = variant === 'label';

  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>(
    null
  );

  useLayoutEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    const { offsetWidth: width, offsetHeight: height } = el;

    // Compressing the width by a factor of 0.6 to maintain the steepness
    const adjustedWidth = width * 0.6;

    // Calculate angle
    const angleInRad = Math.atan2(height, adjustedWidth);
    const angleInDeg = angleInRad * (180 / Math.PI);

    // Make negative
    el.style.setProperty('--_gradient-angle', `${angleInDeg * -1}deg`);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLElement>
  ) => {
    if (!isDisabled && !isLabel && onClick) {
      onClick(e as React.MouseEvent<HTMLElement>);
    }
  };

  const commonClassNames = classNames(
    styles.button,
    styles[`button--${size}`],
    narrow && styles[`button--narrow`],
    styles[`button--${variant}`],
    styles[`button--radius-${radius}`],
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

  const Tag = href ? 'a' : isLabel ? 'div' : 'button';

  const commonProps = {
    className: commonClassNames,
    onClick: onClick ? (e: any) => handleClick(e) : undefined,
    'aria-busy': loading || undefined,
    'aria-disabled': isDisabled || undefined,
    'aria-label': ariaLabel,
    title: iconOnly ? ariaLabel : undefined,
    ...rest,
  };

  const specificProps = href
    ? {
        href,
        target: external ? '_blank' : undefined,
        rel: external ? 'noopener noreferrer' : undefined,
        tabIndex: isDisabled ? -1 : undefined,
      }
    : isLabel
      ? {}
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
            variant !== 'label' && `text-${size}`,
            variant !== 'label' && 'text-medium',
            variant === 'label' && `text-sm`,
            variant === 'label' && 'font-family-mono',
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
