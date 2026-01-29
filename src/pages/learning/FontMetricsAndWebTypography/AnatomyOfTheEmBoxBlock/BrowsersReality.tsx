import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import {
  TypoAscenderDiagram,
  TypoDescenderDiagram,
  UserSelectDiagram,
} from '../diagrams';
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
        Here, the "lie" deepens. Browsers look at specific font tables (
        <span className="accent">hhea</span> or{' '}
        <span className="accent">sTypo</span>) to determine the{' '}
        <span className="accent">Ascender</span> (F) and{' '}
        <span className="accent">Descender</span> (G). These internal metrics
        act as <strong>the true source of truth for vertical alignment</strong>.
      </Text>
    </BreakoutFlex>
    <BreakoutFlex
      mediaLeft={UserSelectDiagram}
      mediaHeight={7}
      contentAlign="center"
    >
      <Text hyphens="auto">
        Because these values often{' '}
        <strong>
          extend beyond the <span className="accent">Em-box</span> boundaries
        </strong>{' '}
        (dashed lines), they dictate the height of the{' '}
        <span className="accent">User-select</span> (H) area, the blue highlight
        you see when selecting text, rather than the actual{' '}
        <span className="accent">font-size</span> you defined in CSS. This
        explains why highlights often appear{' '}
        <strong>shifted or taller than the text itself</strong>, regardless of
        your <span className="accent">padding</span> or{' '}
        <span className="accent">line-height</span> settings.
      </Text>
    </BreakoutFlex>
  </>
);
