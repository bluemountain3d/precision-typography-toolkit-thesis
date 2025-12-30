import styles from './Flex.module.scss';
import classNames from 'clsx';
import type { FlexProps } from './Flex.types';
import type { JSX } from 'react';

export const Flex = ({
  children,
  as = 'div',
  direction,
  wrap,
  justifyContent,
  alignItems,
  alignContent,
  gap,
  rowGap,
  columnGap,
  marginTop,
  marginBottom,
  className,
  style,
}: FlexProps) => {
  const Component = as as keyof JSX.IntrinsicElements;
  return (
    <Component
      className={classNames(
        styles.flex,
        direction && styles[`flex--${direction}`],
        wrap && styles[`flex--${wrap}`],
        justifyContent && styles[`flex--justify-${justifyContent}`],
        alignItems && styles[`flex--align-items-${alignItems}`],
        alignContent && styles[`flex--align-content-${alignContent}`],
        gap && `gap-${gap}`,
        rowGap && `row-gap-${rowGap}`,
        columnGap && `column-gap-${columnGap}`,
        marginTop && `mt-${marginTop}`,
        marginBottom && `mb-${marginBottom}`,
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
};
