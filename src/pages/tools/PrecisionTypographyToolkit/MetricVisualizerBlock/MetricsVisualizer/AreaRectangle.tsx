/**
 * Props for AreaRectangle component
 */
interface AreaRectangleProps {
  /** X coordinate in SVG units */
  x: number;
  /** Y coordinate in SVG units */
  y: number;
  /** Rectangle width in SVG units */
  width: number;
  /** Rectangle height in SVG units */
  height: number;
  /** Fill color (CSS variable or color value) */
  color: string;
  /** Whether this rectangle's metric is currently selected */
  isSelected: boolean;
}

/**
 * AreaRectangle - SVG rectangle overlay for highlighting metric areas
 *
 * Renders a semi-transparent rectangle that highlights a specific metric area
 * when selected. Used to visually indicate which font metric is active.
 *
 * @example
 * ```tsx
 * <AreaRectangle
 *   x={0}
 *   y={-750}
 *   width={1000}
 *   height={750}
 *   color="var(--color-tertiary)"
 *   isSelected={selectedMetric === 'capHeight'}
 * />
 * ```
 */
export const AreaRectangle = ({
  x,
  y,
  width,
  height,
  color,
  isSelected,
}: AreaRectangleProps) => (
  <rect
    x={x}
    y={y}
    width={width}
    height={height}
    fill={isSelected ? color : 'none'}
    opacity="0.85"
  />
);
