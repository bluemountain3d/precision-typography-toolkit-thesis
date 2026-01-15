import { useMediaQuery } from '@/hooks';
import { queries, type TextSize } from '@/types';
import styles from './TextWrapperBlock.module.scss';
import classNames from 'clsx';
import { TextBox } from '@/components/typography/TextBox';

interface TextWrapperBlockProps {
  leftMedia?: React.ReactNode;
  rightMedia?: React.ReactNode;
  children: React.ReactNode;
  mediaHeight?: string; // '100px', '6rem', '5lh', '20ch'
  breakpoint:
    | 'isPhabletAndUp'
    | 'isTabletAndUp'
    | 'isTabletLargeAndUp'
    | 'isLaptopAndUp'
    | 'isDesktopAndUp';
  textBoxWidthSize?: TextSize;
  textBoxFlow?: 'em' | 'space';
}

export const TextWrapperBlock = ({
  leftMedia,
  rightMedia,
  children,
  mediaHeight = '200px',
  breakpoint,
  textBoxWidthSize = 'base',
  textBoxFlow = 'em',
}: TextWrapperBlockProps) => {
  const isBreakpoint = useMediaQuery(queries[breakpoint]);
  const mediaStyle = {
    '--media-height': mediaHeight,
  } as React.CSSProperties;

  return (
    <TextBox
      widthSize={textBoxWidthSize}
      flow={textBoxFlow}
      className={classNames(
        styles['text-wrapper-block'],
        isBreakpoint && styles[`text-wrapper-block--breakpoint`]
      )}
      style={mediaStyle}
    >
      {leftMedia && (
        <div
          className={classNames(
            styles['text-wrapper-block__media'],
            styles['text-wrapper-block__media--left']
          )}
        >
          {leftMedia}
        </div>
      )}
      {rightMedia && (
        <div
          className={classNames(
            styles['text-wrapper-block__media'],
            styles['text-wrapper-block__media--right']
          )}
        >
          {rightMedia}
        </div>
      )}
      {children}
    </TextBox>
  );
};
