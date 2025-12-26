import styles from './Icon.module.scss';
import classNames from 'clsx';
import type { IconSizeSpace, IconSizeText, IconVariant } from './Icon.types';
import type React from 'react';

interface IconProps {
  icon: React.ElementType<React.SVGProps<SVGSVGElement>>;
  fill?: IconVariant;
  size?: IconSizeText | IconSizeSpace | number | string;
  className?: string;
}

export const Icon = ({
  icon: IconComponent,
  fill,
  size = 'textBase',
  className,
}: IconProps) => {
  const isCustomSize = (
    size: IconSizeText | IconSizeSpace | number | string
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
