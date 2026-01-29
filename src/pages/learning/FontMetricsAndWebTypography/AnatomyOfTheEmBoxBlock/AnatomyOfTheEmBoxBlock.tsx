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
          mediaLeft={EmBoxDiagram}
          mediaHeight={7}
          contentAlign="center"
          breakpoint="isPhabletAndUp"
        >
          <Text hyphens="auto">
            The <span className="accent">Em-box</span> (A) is the fundamental
            coordinate system of a font and equal to its{' '}
            <span className="accent">UPM</span> value (Units Per EM). When you
            define a <span className="accent">font-size</span>, you are sizing
            this invisible square, but{' '}
            <strong>rarely the letters themselves</strong>. It serves as the
            foundation for all other calculations in the font file.
            Understanding this abstraction is the first step toward recognizing
            that CSS <span className="accent">font-size</span> is actually{' '}
            <strong>a measure of container height</strong>.
          </Text>
        </BreakoutFlex>
        <BreakoutFlex
          mediaRight={LineBoxDiagram}
          mediaHeight={7}
          contentAlign="center"
          breakpoint="isPhabletAndUp"
        >
          <Text hyphens="auto">
            The <span className="accent">Line-box</span> (B) represents the
            total vertical area a line of text occupies. Controlled by{' '}
            <span className="accent">line-height</span>, it acts as the
            "physical" boundary that determines the spacing between lines and
            pushes surrounding UI elements away. It functions as an outer shell
            encapsulating the glyphs, often creating{' '}
            <strong>unwanted distance</strong> between your text and adjacent
            interface components.
          </Text>
        </BreakoutFlex>
        <BreakoutFlex
          mediaLeft={HalfLeadingDiagram}
          mediaHeight={7}
          contentAlign="center"
          breakpoint="isPhabletAndUp"
        >
          <Text hyphens="auto">
            The difference between the{' '}
            <span className="accent">line-height</span> and{' '}
            <span className="accent">font-size</span> is distributed equally
            above and below the <span className="accent">Em-box</span> as{' '}
            <span className="accent">half-leadings</span> (C). This is{' '}
            <strong>the primary source of the "lying" spacing</strong> that
            makes pixel-perfect vertical alignment impossible with standard CSS,
            forcing glyphs to float awkwardly within an invisible, rigid frame.
          </Text>
        </BreakoutFlex>
        <Text variant="secondary" hyphens="auto">
          As of 2024, the{' '}
          <span className="accent">CSS Inline Layout Module</span> introduced
          native properties to solve the "lying box" problem:{' '}
          <span className="accent">text-box-trim</span> and{' '}
          <span className="accent">text-box-edge</span>. These properties allow
          the browser to{' '}
          <strong>automatically trim both the half-leadings</strong> and adjust
          based on the font's internal metrics (
          <span className="accent">cap-height</span>,{' '}
          <span className="accent">x-height</span>,{' '}
          <span className="accent">ascenders</span>,{' '}
          <span className="accent">descenders</span>).
        </Text>
        <Text variant="secondary" hyphens="auto">
          The logic is sound, the implementation straightforward.
        </Text>
        <Text variant="secondary" hyphens="auto">
          However, while these properties are the future, they currently{' '}
          <strong>lack full cross-browser support</strong>, with{' '}
          <span className="accent">Firefox</span> notably lagging behind. This
          means that for production-ready interfaces that need to look perfect
          today, we still need to{' '}
          <strong>calculate these trims manually</strong> using negative
          margins—the exact math that{' '}
          <strong>Precision Typography Toolkit</strong> provides.
        </Text>
        {InternalMetricsBlock}
        {BrowsersReality}
      </TextBox>
    </Flex>
  );
};
