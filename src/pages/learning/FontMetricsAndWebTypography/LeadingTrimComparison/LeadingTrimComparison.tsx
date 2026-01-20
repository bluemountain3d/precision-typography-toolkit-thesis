import { MeasureLetter } from './MeasureLetter';
import { Glyph } from './Glyph';
import { MeasureLine } from './MeasureLine';
import {
  measureLettersLeft,
  measureLettersRight1,
  measureLettersLeft2,
  measureLettersRight2,
  glyphsSet1,
  glyphsSet2,
  measureLinesLeftTall,
  measureLinesRightEm,
  measureLinesLeft2,
  measureLinesRightTall2,
} from './LeadingTrimData';
import { InlineSVG } from '@/components/ui/InlineSVG';

interface Props {
  viewBox?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function LeadingTrimComparisonDiagram({
  viewBox = '0 0 9376 8500',
  title = 'Before and after Leading Trim comparison',
  description = 'Side-by-side comparison showing standard CSS layout with uncontrolled spacing (left) versus precision-trimmed layout with calculated negative margins L and M (right), demonstrating how Leading Trim eliminates invisible gaps while preserving vertical rhythm (N)',
  className = 'metric-diagram',
}: Props) {
  return (
    <InlineSVG
      viewBox={viewBox}
      title={title}
      description={description}
      className={className}
    >
      {/* Background boxes */}
      <rect className="metric-box" width="4000" height="500" />
      <rect className="metric-box" width="4000" height="500" y="8000" />
      <rect className="metric-box" width="4000" height="500" x="5400" y="447" />
      <rect
        className="metric-box"
        width="4000"
        height="500"
        x="5400"
        y="7569"
      />

      <rect
        className="metric-box--muted"
        width="2536"
        height="447"
        x="731.5"
        y="2000"
      />
      <rect
        className="metric-box--muted"
        width="2536"
        height="433"
        x="731.5"
        y="6069"
      />
      <rect
        className="metric-box--highlighted"
        width="2536"
        height="447"
        x="6131.5"
        y="2000"
      />
      <rect
        className="metric-box--highlighted"
        width="2536"
        height="433"
        x="6131.5"
        y="6069"
      />

      {/* Frame lines */}
      <g className="metric-line dashed">
        <path d="M0.5 0V5000" transform="translate(731, 1750)" />
        <path d="M0.5 0V5000" transform="translate(3268, 1750)" />
        <path d="M0.5 0V5000" transform="translate(6132, 1750)" />
        <path d="M0.5 0V5000" transform="translate(8668, 1750)" />
        <path d="M0 0.5L3036 0.499735" transform="translate(482, 2000)" />
        <path d="M0 0.5L3036 0.499735" transform="translate(482, 6500)" />
        <path d="M0 0.5L3036 0.499735" transform="translate(5882, 2000)" />
        <path d="M0 0.5L3036 0.499735" transform="translate(5882, 6500)" />
      </g>

      {/* Measure lines - left tall */}
      {measureLinesLeftTall.map((props, i) => (
        <MeasureLine key={`left-tall-${i}`} {...props} />
      ))}

      {/* Measure lines - right em */}
      {measureLinesRightEm.map((props, i) => (
        <MeasureLine key={`right-em-${i}`} {...props} />
      ))}

      {/* Measure lines - left 2 */}
      {measureLinesLeft2.map((props, i) => (
        <MeasureLine key={`left-2-${i}`} {...props} />
      ))}

      {/* Measure lines - right tall 2 */}
      {measureLinesRightTall2.map((props, i) => (
        <MeasureLine key={`right-tall-2-${i}`} {...props} />
      ))}

      {/* Measure letters - left column */}
      {measureLettersLeft.map((props, i) => (
        <MeasureLetter key={`measure-left-${i}`} {...props} />
      ))}

      {/* Measure letters - right column 1 */}
      {measureLettersRight1.map((props, i) => (
        <MeasureLetter key={`measure-right-1-${i}`} {...props} />
      ))}

      {/* Measure letters - left column 2 */}
      {measureLettersLeft2.map((props, i) => (
        <MeasureLetter key={`measure-left-2-${i}`} {...props} />
      ))}

      {/* Measure letters - right column 2 */}
      {measureLettersRight2.map((props, i) => (
        <MeasureLetter key={`measure-right-2-${i}`} {...props} />
      ))}

      {/* Glyphs - set 1 */}
      {glyphsSet1.map((props, i) => (
        <Glyph key={`glyph-1-${i}`} {...props} />
      ))}

      {/* Glyphs - set 2 */}
      {glyphsSet2.map((props, i) => (
        <Glyph key={`glyph-2-${i}`} {...props} />
      ))}
    </InlineSVG>
  );
}
