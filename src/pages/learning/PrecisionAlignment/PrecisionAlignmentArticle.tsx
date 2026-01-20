import styles from './PrecisionAlignmentArticle.module.scss';
import classNames from 'clsx';
import { Container } from '@/components/layout/Container';
import { Flex } from '@/components/layout/Flex';
import { PageSection } from '@/components/layout/PageSection';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import { TextBox } from '@/components/typography/TextBox';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import {
  SideBearingsLowercaseF,
  SideBearingsLowercaseG,
  SideBearingsLowercaseI,
  SideBearingsLowercaseM,
  SideBearingsLowercaseO,
  SideBearingsLowercaseV,
  SideBearingsUppercaseA,
  SideBearingsUppercaseH,
  SideBearingsUppercaseJ,
  SideBearingsUppercaseO,
  SideBearingsUppercaseT,
  SideBearingsUppercaseZ,
} from './diagrams';
import { Toggle } from '@/components/forms/Toggle';
import { useState } from 'react';

export const PrecisionAlignmentArticle = () => {
  const [toggles, setToggles] = useState({
    sideBearing: false,
  });

  const handleToggleChange = (key: string) => (checked: boolean) => {
    setToggles((prev) => ({ ...prev, [key]: checked }));
  };

  const isBreakpoint = useMediaQuery(queries.isTabletLargeAndUp);
  return (
    <PageSection as="section" padding="large">
      <Container variant={isBreakpoint ? 'narrow' : 'boxed'}>
        <Flex direction="column" alignItems="center" gap="4xl">
          <TextBox widthSize="base" flow="em">
            <Heading level={1} size="heading-2">
              Precision Alignment: Solving for Optical Balance
            </Heading>
            <Text size="lg">
              Implementing a mathematical approach to horizontal white space and
              glyph positioning.
            </Text>
            <Text>
              Standard web layout treats text as a series of rectangles, but
              typography is an art of shapes and air. While CSS gives us tools
              for margins and padding, it is blind to the{' '}
              <span className="accent">Side-bearings</span>—the internal white
              space baked into the font file itself. To achieve{' '}
              <strong>true optical balance</strong>, we must look past the
              bounding box and measure{' '}
              <strong>
                the actual distance between the grid and the glyph
              </strong>
              .
            </Text>

            <Heading level={2} size="heading-3">
              The Deception of the Advance Width
            </Heading>
            <Text>
              The <span className="accent">Advance Width</span> (A) is the total
              horizontal footprint assigned to a character, but it is{' '}
              <strong>rarely a reflection of the letter's actual width</strong>.
              Instead, it acts as a rigid container that dictates where the next
              character begins. To the browser, this is the only width that
              exists, even if the visual character only fills a fraction of that
              space. This fundamental abstraction means that your CSS{' '}
              <span className="accent">width</span> is{' '}
              <strong>
                measuring a container of air rather than the ink of the
                letterform
              </strong>
              .
            </Text>
            <div className={styles['diagram-presentation']}>
              {SideBearingsUppercaseH}
              {SideBearingsLowercaseI}
              {SideBearingsLowercaseO}
              {SideBearingsUppercaseO}
            </div>

            <Heading level={2} size="heading-3">
              Side-Bearing Sabotage: The silent killer of clean layouts
            </Heading>
            <Text>
              <span className="accent">Side-bearings</span> (B & C) are the
              internal air baked into the font file to ensure legibility and
              rhythm. While essential for reading flow,{' '}
              <strong>they become a liability in UI design</strong>. These
              buffers act as forced padding that pushes your text away from grid
              lines, making true left or right alignment impossible with
              standard CSS properties. Because these values vary wildly—from a
              wide m to a narrow 'i'—they create an{' '}
              <strong>
                inconsistent 'stutter' that breaks your layout's edge alignment
              </strong>
              .
            </Text>
            <div className={styles['diagram-presentation']}>
              {SideBearingsUppercaseJ}
              {SideBearingsLowercaseF}
              {SideBearingsUppercaseA}
              {SideBearingsLowercaseV}
            </div>

            <Heading level={2} size="heading-3">
              Optical Justice: Aligning to the shape, not the box
            </Heading>
            <Text>
              The goal of Precision Typography is to reach the{' '}
              <span className="accent">Optical Edge</span> (D)—
              <strong>the exact point where the glyph's pixels begin</strong>.
              By calculating the difference between the{' '}
              <span className="accent">Advance Width</span> and the{' '}
              <span className="accent">Side-bearings</span>, we can apply
              precise negative offsets. This 'shaves off' the internal margins,
              allowing the glyph to sit flush against your layout's boundaries.
              By using a{' '}
              <strong>weighted average of high-frequency characters</strong>{' '}
              like{' '}
              <span className="accent">[a, e, h, i, l, m, n, o, r, s]</span>, we
              can mathematically neutralize this legacy padding for a
              razor-sharp, pixel-perfect finish.
            </Text>
            <div className={styles['diagram-presentation']}>
              {SideBearingsUppercaseT}
              {SideBearingsUppercaseZ}
              {SideBearingsLowercaseG}
              {SideBearingsLowercaseM}
            </div>

            <Heading level={2} size="heading-3">
              The Path to Precision: The Weighted Average
            </Heading>
            <Text>
              Since we cannot practically apply unique negative margins to every
              single character in a dynamic string, we need a smarter approach.
              To achieve a stable "optical edge" for a line of text, we don't
              look at the entire character set, but at{' '}
              <strong>a specific subset of high-frequency letters</strong>:{' '}
              <span className="accent">a, e, h, i, l, m, n, o, r, s</span>.
            </Text>
            <Text>
              By calculating the average{' '}
              <span className="accent">Left Side-Bearing</span> (
              <span className="accent">LSB</span>) across these ten characters,
              we find the{' '}
              <strong>"statistical" start of the font's visual weight</strong>.
              This allows the Toolkit to determine the exact negative offset
              required to pull the text flush against its container's edge.
              Instead of guessing with arbitrary padding, we{' '}
              <strong>use the font's own internal logic</strong> to neutralize
              the invisible space.
            </Text>
            <Text size="md" weight="semibold">
              Why these 10 characters?
            </Text>
            <ul>
              <li>
                <strong>High Frequency:</strong> These letters make up the vast
                majority of Latin-based text, ensuring the offset feels "right"
                for most words.
              </li>
              <li>
                <strong>Geometric Variety:</strong> The list includes vertical
                stems (<span className="accent">h, l, i</span>), curves (
                <span className="accent">o, e, a</span>), and complex density (
                <span className="accent">m, n, s</span>), providing a balanced
                cross-section of the font's horizontal behavior.
              </li>
              <li>
                <strong>Predictability:</strong> By focusing on the "average"
                experience of the eye, we{' '}
                <strong>eliminate the jitter caused by outliers</strong> like{' '}
                <span className="accent">'J'</span> or{' '}
                <span className="accent">'A'</span>, creating a smooth,
                professional alignment that standard CSS properties cannot
                achieve.
              </li>
            </ul>

            <Heading level={2} size="heading-3">
              The Power of the Weighted Average
            </Heading>
            <Text>
              Typography on the web is dynamic, and applying individual offsets
              to every character is technically impossible without breaking text
              flow. Instead, our approach{' '}
              <strong>focuses on the container level</strong>. By calculating a
              weighted average of the most frequent characters, we determine{' '}
              <strong>a single, unified offset for the entire block</strong>.
            </Text>
            <Text>
              When you toggle the solution, we apply a calculated{' '}
              <span className="accent">margin-inline</span> to the text element.
              This doesn't change the internal spacing between letters; it
              simply shifts the entire block so that its{' '}
              <strong>
                "statistical edge" aligns perfectly with your grid
              </strong>
              . It's a global solution to a local problem—precision through
              statistical elegance.
            </Text>

            {/* Interactive Demo */}
            <Flex direction="column" gap="sm">
              <Toggle
                toggleId="side-bearings-on-off"
                onChange={handleToggleChange('sideBearing')}
                checked={toggles.sideBearing}
                label={`Toggle side bearings adjust:`}
                labelPosition="before"
              />
              <Text size="sm" variant="secondary" family="mono">
                margin-inline: {toggles.sideBearing ? '-0.026em -0.027em' : '0'}
              </Text>
              <div className={styles['side-bearings-viz']}>
                <Flex
                  direction="column"
                  justifyContent="start"
                  alignItems="start"
                  className={styles['side-bearings-viz__inner']}
                >
                  <div
                    className={classNames(
                      styles['side-bearings-viz__title'],
                      toggles.sideBearing &&
                        toggles.sideBearing &&
                        styles['side-bearings-on']
                    )}
                  >
                    The Solution
                  </div>
                  <div
                    className={classNames(
                      styles['side-bearings-viz__body'],
                      toggles.sideBearing &&
                        toggles.sideBearing &&
                        styles['side-bearings-on']
                    )}
                  >
                    Aligning to the optical edge
                    <br />
                    rather than the font container
                    <br />
                    creates a razor-sharp grid
                  </div>
                </Flex>
              </div>
              <Text size="sm" variant="secondary">
                The font family and weight in this example is Cormorant Garamond Regular.
              </Text>
            </Flex>
          </TextBox>
        </Flex>
      </Container>
    </PageSection>
  );
};
