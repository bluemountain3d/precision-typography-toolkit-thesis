// import styles from './AnatomyOfTheEmBoxBlock.module.scss';
// import classNames from 'clsx';
import { Flex } from '@/components/layout/Flex';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import { TextBox } from '@/components/typography/TextBox';
import { EmBoxDiagram } from '../diagrams/EmBoxDiagram';
import { LineBoxDiagram } from '../diagrams/LineBoxDiagram';
import { HalfLeadingDiagram } from '../diagrams/HalfLeadingDiagram';
import { BreakoutFlex } from '@/components/content/BreakoutFlex';
import { InternalMetricsBlock } from './InternalMetricsBlock';
import { BrowsersReality } from './BrowsersReality';

export const AnatomyOfTheEmBoxBlock = () => {
  return (
    <Flex direction="column" alignItems="center" width="full" gap="2xl">
      <TextBox widthSize="base" flow="em">
        <Heading level={2} size="heading-2">
          The Anatomy of a Lie: Decoding the Vertical Space
        </Heading>

        <BreakoutFlex
          mediaRight={EmBoxDiagram}
          mediaHeight={7}
          contentAlign="center"
          breakpoint="isPhabletAndUp"
        >
          <Text hyphens="auto">
            The Em-box (A) is the fundamental coordinate system of a font and
            equal to its UPM value (Units Per EM). When you define a{' '}
            <span className="accent">font-size</span>, you are sizing this
            invisible square, but rarely the letters themselves. It serves as
            the baseline for all other calculations in the font file.
          </Text>
        </BreakoutFlex>
        <BreakoutFlex
          mediaLeft={LineBoxDiagram}
          mediaHeight={7}
          contentAlign="center"
          breakpoint="isPhabletAndUp"
        >
          <Text hyphens="auto">
            The Line-box (B) represents the total vertical area a line of text
            occupies. Controlled by <span className="accent">line-height</span>,
            it acts as the "physical" boundary that determines the spacing
            between lines and pushes surrounding UI elements away.
          </Text>
        </BreakoutFlex>
        <BreakoutFlex
          mediaRight={HalfLeadingDiagram}
          mediaHeight={7}
          contentAlign="center"
          breakpoint="isPhabletAndUp"
        >
          <Text hyphens="auto">
            The difference between the{' '}
            <span className="accent">line-height</span> and{' '}
            <strong>font-size</strong> is distributed equally above and below
            the Em-box as half-leadings (C). This is the primary source of the
            "lying" spacing that makes pixel-perfect vertical alignment
            impossible with standard CSS.
          </Text>
        </BreakoutFlex>
        <Text variant="secondary" hyphens="auto">
          As of 2024, the CSS Inline Layout Module introduced native properties
          to solve the "lying box" problem:{' '}
          <span className="accent">text-box-trim</span> and{' '}
          <span className="accent">text-box-edge</span>. These properties allow
          the browser to automatically trim both the half-leadings and adjust
          based on the font's internal metrics (
          <span className="accent">cap-height</span>,{' '}
          <span className="accent">x-height</span>,{' '}
          <span className="accent">ascenders</span>,{' '}
          <span className="accent">descenders</span>).
        </Text>
        <Text variant="secondary" hyphens="auto">
          However, while these properties are the future, they currently lack
          full cross-browser support. This means that for production-ready
          interfaces that need to look perfect today, we still need to calculate
          these trims manually using negative margins—the exact math this
          toolkit provides.
        </Text>
        {InternalMetricsBlock}
        {BrowsersReality}
      </TextBox>
      {/* <TextBox widthSize="base" flow="em"></TextBox> */}
    </Flex>
  );
};
