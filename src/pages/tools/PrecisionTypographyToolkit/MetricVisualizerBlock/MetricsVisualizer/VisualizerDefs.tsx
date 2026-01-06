/**
 * Props for VisualizerDefs component
 */
interface VisualizerDefsProps {
  /** Arrow marker width in SVG units */
  arrowWidth: number;
  /** Arrow marker height in SVG units */
  arrowHeight: number;
  /** Reference point for arrow positioning (center point) */
  refPoint: number;
  /** Default color for measure line arrows (CSS variable or color) */
  measureColor: string;
  /** Selected state color for measure line arrows (CSS variable or color) */
  selectedMeasureColor: string;
  /** Units per rem for dynamic sizing of filters (blur, shadows) */
  unitsPerRem: number;
}

/**
 * VisualizerDefs - SVG definitions for gradients, filters, and markers
 *
 * Centralizes all reusable SVG definitions used in the metrics visualizer:
 *
 * **Gradients:**
 * - `#circle-border` - Default toggle button border (subtle 45° gradient)
 * - `#circle-border-active` - Active toggle button border (bright gradient)
 * - `#circle-fill` - Toggle button inner fill (depth gradient)
 *
 * **Filters:**
 * - `#glow-effect` - Drop shadow glow for selected toggle buttons
 * - `#inner-shadow` - Inner shadow for toggle button depth effect
 *
 * **Markers:**
 * - `#arrow-start` / `#arrow-end` - Default state arrows for measure lines
 * - `#arrow-start--selected` / `#arrow-end--selected` - Selected state arrows
 *
 * All filters use dynamic sizing based on `unitsPerRem` to scale proportionally
 * with the visualizer regardless of zoom level.
 *
 * @example
 * ```tsx
 * <svg>
 *   <VisualizerDefs
 *     arrowWidth={25}
 *     arrowHeight={50}
 *     refPoint={25}
 *     measureColor="var(--color-tertiary)"
 *     selectedMeasureColor="var(--color-primary-border-hover)"
 *     unitsPerRem={1000}
 *   />
 *   {/* SVG content references these defs by ID *\/}
 * </svg>
 * ```
 */
export const VisualizerDefs = ({
  arrowWidth,
  arrowHeight,
  refPoint,
  measureColor,
  selectedMeasureColor,
  unitsPerRem,
}: VisualizerDefsProps) => {
  // Dynamic filter sizing based on rem units for proportional scaling
  const glowBlur = 0.5 * unitsPerRem; // 0.5rem blur
  const shadowBlur = 0.125 * unitsPerRem; // 0.125rem blur
  const shadowOffset = 0.0625 * unitsPerRem; // 0.0625rem offset

  return (
    <defs>
      {/* Outer circle gradient (border) - 45° to bottom right */}
      <linearGradient id="circle-border" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="55%" stopColor="var(--color-tertiary)" />
        <stop offset="90%" stopColor="var(--color-tertiary)" />
      </linearGradient>

      {/* Active state border gradient */}
      <linearGradient
        id="circle-border-active"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="10%" stopColor="var(--color-primary-border-bright)" />
        <stop offset="45%" stopColor="var(--color-primary-border-hover)" />
      </linearGradient>

      {/* Inner circle gradient (fill) - 45° to bottom right */}
      <linearGradient id="circle-fill" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-primary-surface)" />
        <stop offset="100%" stopColor="var(--color-primary-surface-dark)" />
      </linearGradient>

      {/* Glow effect filter for selected toggle buttons */}
      <filter id="glow-effect" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation={glowBlur}
          floodColor="var(--color-primary-border-hover)"
          floodOpacity="0.8"
        />
      </filter>

      {/* Inner shadow filter for toggle button depth */}
      <filter id="inner-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation={shadowBlur}
          result="blur"
        />
        <feOffset in="blur" dx="0" dy={shadowOffset} result="offsetBlur" />
        <feFlood floodColor="#000000" floodOpacity="0.5" result="color" />
        <feComposite
          in="color"
          in2="offsetBlur"
          operator="in"
          result="shadow"
        />
        <feComposite
          in="shadow"
          in2="SourceGraphic"
          operator="in"
          result="innerShadow"
        />
        <feComposite in="SourceGraphic" in2="innerShadow" operator="over" />
      </filter>

      {/* Arrow marker for measure line start (top) - default state */}
      <marker
        id="arrow-start"
        markerWidth={arrowWidth}
        markerHeight={arrowHeight}
        refX={refPoint}
        refY={refPoint}
        orient="auto-start-reverse"
        markerUnits="userSpaceOnUse"
      >
        <path
          d={`M 0 0 L ${arrowWidth} ${refPoint} L 0 ${arrowHeight} z`}
          fill={measureColor}
        />
      </marker>

      {/* Arrow marker for measure line end (bottom) - default state */}
      <marker
        id="arrow-end"
        markerWidth={arrowWidth}
        markerHeight={arrowHeight}
        refX={refPoint}
        refY={refPoint}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path
          d={`M 0 0 L ${arrowWidth} ${refPoint} L 0 ${arrowHeight} z`}
          fill={measureColor}
        />
      </marker>

      {/* Arrow marker for measure line start (top) - selected state */}
      <marker
        id="arrow-start--selected"
        markerWidth={arrowWidth}
        markerHeight={arrowHeight}
        refX={refPoint}
        refY={refPoint}
        orient="auto-start-reverse"
        markerUnits="userSpaceOnUse"
      >
        <path
          d={`M 0 0 L ${arrowWidth} ${refPoint} L 0 ${arrowHeight} z`}
          fill={selectedMeasureColor}
        />
      </marker>

      {/* Arrow marker for measure line end (bottom) - selected state */}
      <marker
        id="arrow-end--selected"
        markerWidth={arrowWidth}
        markerHeight={arrowHeight}
        refX={refPoint}
        refY={refPoint}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path
          d={`M 0 0 L ${arrowWidth} ${refPoint} L 0 ${arrowHeight} z`}
          fill={selectedMeasureColor}
        />
      </marker>
    </defs>
  );
};
