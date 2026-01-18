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
      Every font starts with a coordinate system. Within the Em-box, characters
      are drawn relative to an invisible baseline. The{' '}
      <strong>Metric Ascent (D)</strong> represents the distance to the top of
      the design, while the <strong>Metric Descent (E)</strong>
      marks the lowest point.
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
    ><Text hyphens="auto">
      These internal measures are the "true" dimensions of the font's design
      before any browser-specific rendering or OS-level scaling takes over.
    </Text></BreakoutFlex>
    
  </>
);
