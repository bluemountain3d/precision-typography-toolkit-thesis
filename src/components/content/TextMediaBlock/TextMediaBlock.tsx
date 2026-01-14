import { Flex } from '@/components/layout/Flex';
// import styles from './TextMediaBLock.module.scss';
// import classNames from 'clsx';
import type React from 'react';
import { queries, type SpacingSize, type SpacingStep } from '@/types';
import { useMediaQuery } from '@/hooks';

interface TextMediaBlockProps {
  breakpoint:
    | 'isPhabletAndUp'
    | 'isTabletAndUp'
    | 'isTabletLargeAndUp'
    | 'isLaptopAndUp'
    | 'isDesktopAndUp';
  textContent: React.ReactNode;
  mediaContent: React.ReactNode;
  reverseOrder?: boolean;
  gap?: SpacingSize | SpacingStep;
  contentRatio?: keyof typeof ratioMap;
}

const ratioMap = {
  '1:1': { content: 1, media: 1 },
  '2:1': { content: 2, media: 1 },
  '1:2': { content: 1, media: 2 },
  '3:2': { content: 3, media: 2 },
  '2:3': { content: 2, media: 3 },
  '3:1': { content: 3, media: 1 },
  '1:3': { content: 1, media: 3 },
  '4:3': { content: 4, media: 3 },
  '3:4': { content: 3, media: 4 },
  '5:2': { content: 5, media: 2 },
  '2:5': { content: 2, media: 5 },
};

export const TextMediaBlock = ({
  textContent,
  mediaContent,
  breakpoint = 'isTabletAndUp',
  reverseOrder,
  gap = 'xl',
  contentRatio,
}: TextMediaBlockProps) => {
  const isBreakpoint = useMediaQuery(queries[breakpoint]);

  const rowDirection = reverseOrder ? 'row-reverse' : 'row';
  const columnDirection = reverseOrder ? 'column-reverse' : 'column';

  const ratio = ratioMap[contentRatio ?? '1:1'];

  return (
    <Flex
      direction={isBreakpoint ? rowDirection : columnDirection}
      alignItems="stretch"
      gap={gap}
      width="full"
    >
      <Flex style={{ flex: ratio.content }}>{textContent}</Flex>
      <Flex style={{ flex: ratio.media }}>{mediaContent}</Flex>
    </Flex>
  );
};
