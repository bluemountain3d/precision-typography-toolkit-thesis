import styles from './MathOfPrecisionBlock.module.scss';
import { BreakoutFlex } from '@/components/content/BreakoutFlex';
import { Flex } from '@/components/layout/Flex';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import { TextBox } from '@/components/typography/TextBox';
import {
  CapHeightDiagram,
  LeadingTrimDiagram,
  MetricTrimsDiagram,
  WithLeadingTrimDiagram,
} from '../diagrams';
import { Math } from '@/utils/katexMathFormula';

export const MathOfPrecisionBlock = () => {
  return (
    <Flex direction="column" alignItems="center" width="full" gap="2xl">
      <TextBox widthSize="base" flow="em">
        <Heading level={2} size="heading-2">
          The Math of Precision: Solving for Asymmetry
        </Heading>
        <BreakoutFlex
          mediaRight={CapHeightDiagram}
          mediaHeight={7}
          contentAlign="center"
          breakpoint="isPhabletAndUp"
        >
          <Text hyphens="auto">
            To achieve <strong>pixel-perfect alignment</strong>, we must
            translate raw font data into predictable CSS margins. This process
            relies on the font's internal coordinate system, defined by its{' '}
            <span className="accent">Units Per Em</span> (
            <span className="accent">UPM</span>). But more importantly, it
            requires us to find <strong>the font's true visual anchor</strong>:
            the <span className="accent">Cap Height</span> (I). This specific
            value allows us to calculate the exact ratio between the font size
            and its capital letters.
          </Text>
        </BreakoutFlex>
        <BreakoutFlex
          mediaLeft={MetricTrimsDiagram}
          mediaHeight={7}
          contentAlign="center"
          breakpoint="isPhabletAndUp"
        >
          <Text hyphens="auto">
            The <span className="accent">Metric Trim</span> is the process of
            calculating the "dead air" inside the font file,{' '}
            <strong>
              the gap between <span className="accent">Em-box</span> boundaries
              and actual characters
            </strong>
            . By isolating these internal metrics, we can determine exactly how
            much we need to "shave off" to reach the optical edges of the
            glyphs. This ensures that your text containers{' '}
            <strong>wrap tightly around the characters</strong> without any
            invisible top or bottom spacing.
          </Text>
        </BreakoutFlex>
        <Heading level={3} size="heading-4">
          1. Normalizing the Vertical Space
        </Heading>
        <Text hyphens="auto">
          Using the font's <span className="accent">UPM</span> and OS tables, we
          first normalize the vertical space to account for any{' '}
          <strong>"overshoot"</strong> where the design exceeds its own{' '}
          <span className="accent">Em-box</span>.
        </Text>
        <Flex direction="column" gap="sm" className="color-text-secondary">
          <Math display formula="TotalHeight = F + |G|" />
          <Math display formula="Overshoot = \frac{TotalHeight - UPM}{2}" />
        </Flex>
        <Text size="sm" className="color-text-muted" align="center">
          where <span className="accent">F</span> = Ascender,{' '}
          <span className="accent">G</span> = Descender,{' '}
          <span className="accent">UPM</span> = Units Per Em
        </Text>
        <Heading level={3} size="heading-4">
          2. Isolating the Metric Trim
        </Heading>
        <Text hyphens="auto">
          Now we can isolate the exact gap for the{' '}
          <span className="accent">Metric Trim Top</span> (J) and{' '}
          <span className="accent">Metric Trim Bottom</span> (K):
        </Text>
        <Flex direction="column" gap="sm" className="color-text-secondary">
          <Math display formula="J = \frac{I - (F - Overshoot)}{UPM}" />
          <Math display formula="K = \frac{G - Overshoot}{UPM}" />
        </Flex>
        <Text size="sm" className="color-text-muted" align="center">
          where <span className="accent">I</span> = Cap Height,{' '}
          <span className="accent">F</span> = Ascender,{' '}
          <span className="accent">G</span> = Descender ,{' '}
          <span className="accent">UPM</span> = Units Per Em
        </Text>
        <Heading level={3} size="heading-4">
          3. Solving for the Final Leading Trim
        </Heading>
        <Text hyphens="auto">
          Finally, we add the <span className="accent">Half-leading</span> (C)
          created by your CSS <span className="accent">line-height</span> to
          find the <span className="accent">Total Leading Trim</span> (L & M):
        </Text>
        <Flex direction="column" gap="sm" className="color-text-secondary">
          <Math display formula="L = J + \frac{lineHeight - 1}{2}" />
          <Math display formula="M = K + \frac{lineHeight - 1}{2}" />
        </Flex>
        <Text size="sm" className="color-text-muted" align="center">
          where lineHeight = current <span className="accent">line-height</span>
          , like <span className="accent">1.5</span>.
        </Text>
        <BreakoutFlex
          mediaRight={LeadingTrimDiagram}
          mediaHeight={7}
          contentAlign="center"
          breakpoint="isPhabletAndUp"
        >
          <Text hyphens="auto">
            Applying these as asymmetrical negative margins, like
            <span className="accent"> -0.444em</span> and
            <span className="accent"> -0.432em</span>, eliminates the invisible
            gaps and ensures mathematical certainty in your layout.
          </Text>
        </BreakoutFlex>
        <Heading level={3} size="heading-4">
          The Result: Precision You Can Trust
        </Heading>
        <Text hyphens="auto">
          By applying the asymmetrical negative margins
          <strong>
            L (<span className="accent"> -0.444em </span>)
          </strong>
          and
          <strong>
            M (<span className="accent"> -0.432em</span>)
          </strong>
          , we effectively neutralize the "dead air" caused by the font file's
          internal noise.
        </Text>
        <Text hyphens="auto">
          By applying the <strong>asymmetrical negative margins</strong>{' '}
          <span className="accent">L</span> (-0.444em) and{' '}
          <span className="accent">M</span> (-0.432em), we effectively{' '}
          <strong>neutralize the "dead air"</strong> caused by the font file's
          internal noise.
        </Text>
        <Text hyphens="auto">
          The most critical takeaway of this final step is{' '}
          <strong>the preservation of vertical rhythm</strong>. While standard
          CSS focuses on the <span className="accent">Line-box</span> (B),
          designers typically think in terms of{' '}
          <span className="accent">Leading</span> (N) that is{' '}
          <strong>
            the actual distance measured from baseline to baseline
          </strong>
          .
        </Text>
        <Text hyphens="auto">
          As the final diagram illustrates, our goal isn't to disrupt this
          internal cadence. The distance <span className="accent">N</span>{' '}
          remains identical to your chosen{' '}
          <span className="accent">line-height</span>, but by collapsing the
          excess space at the edges of the text block, we ensure that a defined
          spacing (<span className="accent">O</span>) of{' '}
          <span className="accent">1.5rem</span> in your code translates to{' '}
          <strong>exactly 1.5rem of visual breathing room on the screen</strong>
          .
        </Text>
        <Text hyphens="auto">
          This final diagram brings together all the metrics we've explored,
          from the <span className="accent">Em-box</span> (A) and{' '}
          <span className="accent">Line-box</span> (B) to the calculated{' '}
          <span className="accent">Leading Trims</span> (L & M), showing how
          they combine to achieve <strong>pixel-perfect alignment</strong>.
        </Text>
        <Flex
          justifyContent="center"
          className={styles['with-leading-trim-diagram']}
        >
          {WithLeadingTrimDiagram}
        </Flex>
        <Text size="md" weight="semibold" align="center">
          We are no longer approximating; we are engineering with mathematical
          certainty.
        </Text>
      </TextBox>
    </Flex>
  );
};
