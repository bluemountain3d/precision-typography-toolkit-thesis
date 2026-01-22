import styles from './ArticleIntroBlock.module.scss';
import classNames from 'clsx';
import { Flex } from '@/components/layout/Flex';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import { TextBox } from '@/components/typography/TextBox';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { Button } from '@/components/forms/Button';
import { ButtonGroup } from '@/components/layout/ButtonGroup';
import { TextMediaBlock } from '@/components/content/TextMediaBlock';
import { InlineSVG } from '@/components/ui/InlineSVG';
import { HalfLeadingDiagramSimple } from '@/pages/learning/FontMetricsAndWebTypography/diagrams';

export const ArticleIntroBlock = () => {
  const isBreakpoint = useMediaQuery(queries.isTabletLargeAndUp);

  const textContent = (
    <Flex direction="column" alignItems="stretch" width="full" gap="2xl">
      <TextBox flow="em">
        <Heading level={2} size="heading-3">
          Why line-height is lying to you
        </Heading>
        <Text size="md" weight="semibold" hyphens="auto">
          Ever set a margin to 20 pixels, only to see 30? That gap you can't
          explain isn't a bug, it is invisible spacing built into every font.
        </Text>
        <Text size="base" hyphens="auto">
          When you set <strong>font-size</strong> and{' '}
          <strong>line-height</strong>, you're not controlling letter placement,
          you're sizing invisible boxes. Each character lives in an Em-box, and
          line-height adds extra space called <strong>half-leadings</strong>{' '}
          above and below.
        </Text>
        <Text size="base" hyphens="auto">
          Type designers build spacing into fonts for legibility in running
          text, but in modern UI design it becomes a hindrance. To achieve true
          precision, we need to stop guessing and start using actual font
          metrics.
        </Text>
      </TextBox>
      <ButtonGroup>
        <Button href="learn/font-metrics-article">
          Read about why metrics matters
        </Button>
      </ButtonGroup>
    </Flex>
  );
  const mediaContent = (
    <div
      className={classNames(
        styles['article-intro-block__diagram'],
        isBreakpoint ? 'py-2xl' : 'px-xl'
      )}
    >
      {HalfLeadingDiagramSimple}
    </div>
  );

  return (
    <TextMediaBlock
      gap="2xl"
      breakpoint="isTabletLargeAndUp"
      textContent={textContent}
      mediaContent={mediaContent}
      reverseOrder={isBreakpoint ? false : true}
      contentRatio={isBreakpoint ? '3:2' : undefined}
    />
  );
};
