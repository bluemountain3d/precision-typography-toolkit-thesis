import styles from './BreakoutFlex.module.scss';
import classNames from 'clsx';

import { Flex } from '@/components/layout/Flex';
import type React from 'react';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';

interface BreakoutFlexProps {
  children: React.ReactNode;
  mediaLeft?: React.ReactNode;
  mediaRight?: React.ReactNode;
  mediaHeight?: string | number;
  contentAlign?: 'start' | 'center' | 'end';
  breakout?: boolean;
  breakpoint?:
    | 'isPhabletAndUp'
    | 'isTabletAndUp'
    | 'isTabletLargeAndUp'
    | 'isLaptopAndUp'
    | 'isDesktopAndUp';
}

export const BreakoutFlex = ({
  children,
  mediaLeft,
  mediaRight,
  mediaHeight,
  contentAlign = 'center',
  breakout,
  breakpoint = 'isTabletAndUp',
}: BreakoutFlexProps) => {
  const isBreakpoint = useMediaQuery(queries[breakpoint]);
  const mediaHeightValue =
    typeof mediaHeight === 'string'
      ? mediaHeight
      : `calc((${(mediaHeight || 0) * 1.5} * 1em) - 0.5em)`;
  const mediaStyle = {
    '--_media-height': mediaHeightValue,
  } as React.CSSProperties;

  return (
    <Flex
      direction={isBreakpoint ? 'row' : mediaLeft ? 'column-reverse' : 'column'}
      gap={mediaLeft || mediaRight ? 'md' : 'none'}
      alignItems={isBreakpoint ? contentAlign : 'center'}
      className={classNames(styles['breakout-flex'])}
      style={mediaStyle}
    >
      {mediaLeft && (
        <div
          className={classNames(
            styles['breakout-flex__media'],
            styles['breakout-flex__media--left'],
            isBreakpoint &&
              breakout && [
                styles['breakout-flex__breakout'],
                styles['breakout-flex__breakout--left'],
              ]
          )}
        >
          {mediaLeft}
        </div>
      )}

      <div className={classNames(styles['breakout-flex__content'], 'flow-em')}>
        {children}
      </div>

      {mediaRight && (
        <div
          className={classNames(
            styles['breakout-flex__media'],
            styles['breakout-flex__media--right'],
            isBreakpoint &&
              breakout && [
                styles['breakout-flex__breakout'],
                styles['breakout-flex__breakout--right'],
              ]
          )}
        >
          {mediaRight}
        </div>
      )}
    </Flex>
  );
};
