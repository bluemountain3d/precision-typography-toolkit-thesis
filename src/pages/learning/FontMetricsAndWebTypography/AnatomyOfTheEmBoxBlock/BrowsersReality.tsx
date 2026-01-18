import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import { TypoAscenderDiagram, TypoDescenderDiagram, UserSelectDiagram } from '../diagrams';
import { BreakoutFlex } from '@/components/content/BreakoutFlex';
import { DiagramPair } from '../DiagramPair';

export const BrowsersReality = (
  <>
    <Heading level={3} size="heading-3">
      OS Tables: The Browser's Reality
    </Heading>

    <BreakoutFlex
      mediaRight={
        <DiagramPair>
          {TypoAscenderDiagram}
          {TypoDescenderDiagram}
        </DiagramPair>
      }
      mediaHeight={7}
      contentAlign="center"
    >
      <Text hyphens="auto">
        This is where the "lie" deepens. Browsers look at specific font tables (
        <span className="accent">hhea</span> or{' '}
        <span className="accent">sTypo</span>) to determine the{' '}
        <strong>Ascender (F)</strong> and <strong>Descender (G)</strong>.
      </Text>
    </BreakoutFlex>
    <BreakoutFlex
      mediaLeft={UserSelectDiagram}
      mediaHeight={7}
      contentAlign="center"
    >
      <Text hyphens="auto">
        Because these values often extend beyond the Em-box boundaries (dashed
        lines), they dictate the height of the <strong>User-select (H)</strong>{' '}
        area, the <strong>blue highlight</strong> you see
        when selecting text, rather than the actual{' '}
        <span className="accent">font-size</span> you defined in CSS.
      </Text>
    </BreakoutFlex>
  </>
);
