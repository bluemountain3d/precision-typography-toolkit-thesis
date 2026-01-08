import styles from './Flex.module.scss';
import classNames from 'clsx';
import type { FlexProps } from './Flex.types';
// import type { JSX } from 'react';

export const Flex = ({
  children,
  as = 'div',
  width,
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
  ...rest
}: FlexProps) => {
  const Component = as as React.ElementType;
  return (
    <Component
      className={classNames(
        styles.flex,
        width && styles[`flex--width-${width}`],
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
      {...rest}
    >
      {children}
    </Component>
  );
};
