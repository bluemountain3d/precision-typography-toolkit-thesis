import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import { MetricAscentDiagram, MetricDescentDiagram } from '../diagrams';
import { BreakoutFlex } from '@/components/content/BreakoutFlex';
import { DiagramPair } from '../DiagramPair';

export const InternalMetricsBlock = (
  <>
    <Heading level={3} size="heading-3">
      Internal Metrics: The Designer's Intent
    </Heading>
    <Text hyphens="auto">
      Every font begins with a coordinate system. Within the{' '}
      <span className="accent">Em-box</span> characters are drawn relative to an
      invisible <span className="accent">baseline</span>, the horizontal axis
      serving as the 'floor' for most letters. It is{' '}
      <strong>the zero-point of the vertical scale</strong>; the{' '}
      <span className="accent">Metric Ascent</span> (D) represents the distance
      from this line to the top of the design, while the{' '}
      <span className="accent">Metric Descent</span> (E) is negative and marks
      the lowest point below it.
    </Text>
    <BreakoutFlex
      mediaLeft={
        <DiagramPair>
          {MetricAscentDiagram}
          {MetricDescentDiagram}
        </DiagramPair>
      }
      mediaHeight={7}
      contentAlign="center"
    >
      <Text hyphens="auto">
        These internal measures are{' '}
        <strong>the "true" dimensions of the font's design</strong> before any
        browser-specific rendering or OS-level scaling takes over. They define
        the proportions that ensure visual consistency.
      </Text>
    </BreakoutFlex>
  </>
);
