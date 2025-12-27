import styles from './Icon.module.scss';
import classNames from 'clsx';
import type { IconFill } from './Icon.types';
import type React from 'react';
import type { FontSize, Spacing } from '@/types';

interface IconProps {
  icon: React.ElementType<React.SVGProps<SVGSVGElement>>;
  fill?: IconFill;
  size?: FontSize | Spacing | number | string;
  className?: string;
}

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
