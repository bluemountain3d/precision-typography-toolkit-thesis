/**
 * Props for MetricLine component
 */
interface MetricLineProps {
  /** Start X coordinate in SVG units */
  x1: number;
  /** End X coordinate in SVG units */
  x2: number;
  /** Y coordinate in SVG units (horizontal line) */
  y: number;
  /** Stroke color (CSS variable or color value) */
  color: string;
}

/**
 * MetricLine - Horizontal line representing a font metric
 *
 * Renders a horizontal line at a specific Y position to indicate font metrics
 * like baseline, cap-height, x-height, ascender, descender, etc.
 *
 * Uses `vectorEffect="non-scaling-stroke"` to maintain consistent 1px stroke
 * width regardless of SVG scaling.
 *
 * @example
 * ```tsx
 * <MetricLine
 *   x1={0}
 *   x2={1000}
 *   y={700}
 *   color="var(--color-tertiary)"
 * />
 * ```
 */
export const MetricLine = ({
  x1 = 0,
  x2 = 0,
  y = 0,
  color,
}: MetricLineProps) => (
  <line
    x1={x1}
    x2={x2}
    y1={y}
    y2={y}
    stroke={color}
    strokeWidth="1"
    vectorEffect="non-scaling-stroke"
  />
);
