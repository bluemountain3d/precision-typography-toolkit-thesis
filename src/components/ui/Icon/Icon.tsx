import styles from './Icon.module.scss';
import classNames from 'clsx';
import type { IconProps } from './Icon.types';
import type { FontSize, Spacing } from '@/types';

/**
 * Icon component for rendering SVG icons with consistent sizing and coloring.
 * Supports both predefined design system sizes and custom CSS values.
 *
 * @example
 * // Basic icon with design system size
 * <Icon icon={CopyIcon} size="textLg" fill="primary" />
 *
 * @example
 * // Icon with custom size
 * <Icon icon={SaveIcon} size="1.5em" fill="success" />
 *
 * @example
 * // Icon inheriting parent color
 * <Icon icon={InfoIcon} size="textBase" fill="inherit" />
 */
export const Icon = ({
  icon: IconComponent,
  fill,
  size = 'textBase',
  className,
}: IconProps) => {
  const isCustomSize = (
    size: FontSize | Spacing | number | string
  ): size is number | string => {
    return (
      typeof size === 'number' ||
      (typeof size === 'string' &&
        (size.includes('px') || size.includes('rem') || size.includes('em')))
    );
  };

  const getSizeClass = () => {
    if (isCustomSize(size)) return undefined;
    return styles[`icon-size--${size}`];
  };

  return (
    <IconComponent
      className={classNames(
        styles.icon,
        styles[`icon-fill--${fill}`],
        styles[`icon-size--${size}`],
        getSizeClass(),
        className
      )}
      style={isCustomSize(size) ? { width: size, height: size } : undefined}
    />
  );
};
