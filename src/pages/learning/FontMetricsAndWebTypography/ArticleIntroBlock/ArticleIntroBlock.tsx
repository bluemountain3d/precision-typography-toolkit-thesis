// import styles from './ArticleIntroBlock.module.scss';
// import classNames from 'clsx';
import { Flex } from '@/components/layout/Flex';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import { TextBox } from '@/components/typography/TextBox';
import { TextWrapperBlock } from '@/components/content/TextWrapperBlock';
import { HalfLeadingDiagramSimple } from '../diagrams';

export const ArticleIntroBlock = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      width="full"
      style={{ gap: '1.5em' }}
    >
      <TextBox flow="em">
        <Heading level={1} size="heading-1">
          Why line-height is lying to you
        </Heading>
        <Text size="md" weight="semibold" hyphens="auto">
          Ever set a margin to <span className="accent">20 pixels</span>, only
          to see <span className="accent">30</span>? That gap you can't explain
          isn't a bug, it is invisible spacing built into every font.
        </Text>
      </TextBox>

      <TextWrapperBlock
        breakpoint="isTabletAndUp"
        mediaHeight="7.5lh"
        rightMedia={HalfLeadingDiagramSimple}
      >
        <Text size="base" hyphens="auto">
          This discrepancy isn't just a minor annoyance; it's a systemic issue
          in how web layout engines treat typography. Historically, type was
          designed for paper, where the physical block of lead determined the
          line spacing. On the web, we've inherited this 'block' mentality, but
          with the added complexity of digital rendering engines that distribute
          space in ways that often defy our intent for pixel-perfect alignment.
        </Text>
        <Text size="base" hyphens="auto">
          But there's a way out.
        </Text>
        <Text size="base" hyphens="auto">
          To bridge this gap, we have to look past the surface. We need to
          dissect the <span className="accent">Units Per Em (UPM)</span> and the
          specific coordinate system defined within the font file. By
          understanding metrics like <span className="accent">Cap Height</span>,{' '}
          <span className="accent">Ascent</span>, and{' '}
          <span className="accent">Descent</span>, we can finally stop treating
          text as a black box and start controlling it with the same
          mathematical certainty we use for layout grids and spacing scales.
        </Text>
      </TextWrapperBlock>
    </Flex>
  );
};
