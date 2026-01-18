import styles from './DiagramRow.module.scss';
import classNames from 'clsx';
import type React from 'react';
import type { SpacingSize, SpacingStep } from '@/types';

interface DiagramRowProps {
  children: React.ReactNode;
  mediaHeight?: string | number;
  gap?: SpacingSize | SpacingStep;
}

export const DiagramRow = ({
  children,
  mediaHeight,
  gap = 'none',
}: DiagramRowProps) => {
  const mediaHeightValue =
    typeof mediaHeight === 'string'
      ? mediaHeight
      : `calc((${(mediaHeight || 0) * 1.5} * 1em) - 0.5em)`;
  const mediaStyle = {
    '--_media-height': mediaHeightValue,
  } as React.CSSProperties;

  return (
    <div
      className={classNames(styles['diagram-row'], `gap-${gap}`)}
      style={mediaStyle}
    >
      {children}
    </div>
  );
};
