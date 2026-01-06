/**
 * Props for MeasureLine component
 */
interface MeasureLineProps {
  /** X coordinate in SVG units (vertical line) */
  x: number;
  /** Start Y coordinate in SVG units */
  y1: number;
  /** End Y coordinate in SVG units */
  y2: number;
  /** Whether this measure line's metric is currently selected */
  isSelected: boolean;
  /** Default stroke color (CSS variable or color value) */
  color: string;
  /** Selected state stroke color (CSS variable or color value) */
  colorSelected: string;
}

/**
 * MeasureLine - Vertical line with arrow markers for measuring font metrics
 *
 * Renders a vertical line with arrow markers at both ends to indicate
 * the measurement span of a font metric. Changes color and uses different
 * arrow markers when selected.
 *
 * Arrow markers are defined in VisualizerDefs component and referenced by ID:
 * - `#arrow-start` / `#arrow-start--selected` for top arrow
 * - `#arrow-end` / `#arrow-end--selected` for bottom arrow
 *
 * @example
 * ```tsx
 * <MeasureLine
 *   x={100}
 *   y1={-750}
 *   y2={0}
 *   isSelected={selectedMetric === 'capHeight'}
 *   color="var(--color-tertiary)"
 *   colorSelected="var(--color-primary-border-hover)"
 * />
 * ```
 */
export const MeasureLine = ({
  x,
  y1,
  y2,
  isSelected,
  color,
  colorSelected,
}: MeasureLineProps) => (
  <line
    x1={x}
    x2={x}
    y1={y1}
    y2={y2}
    stroke={isSelected ? colorSelected : color}
    strokeWidth="1"
    markerStart={
      isSelected ? 'url(#arrow-start--selected)' : 'url(#arrow-start)'
    }
    markerEnd={isSelected ? 'url(#arrow-end--selected)' : 'url(#arrow-end)'}
    vectorEffect="non-scaling-stroke"
  />
);
