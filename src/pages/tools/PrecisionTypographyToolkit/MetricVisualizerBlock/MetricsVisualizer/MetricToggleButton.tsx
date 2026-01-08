import styles from './MetricToggleButton.module.scss';

/**
 * Props for MetricToggleButton component
 */
interface MetricToggleButtonProps {
  /** X coordinate for button center in SVG units */
  x: number;
  /** Y coordinate for button center in SVG units */
  y: number;
  /** Whether this metric is currently selected */
  isSelected: boolean;
  /** Unique identifier for the metric (e.g. 'capHeight', 'xHeight') */
  metricId: string;
  /** Size of the clickable hit box area in SVG units */
  hitBoxSize: number;
  /** The border radius size of the clickable hit box area in SVG units */
  hitBoxRadius: number;
  /** Outer circle radius in default state (SVG units) */
  outerRadius: number;
  /** Outer circle radius in selected state (SVG units) */
  outerRadiusSelected: number;
  /** Inner circle radius in default state (SVG units) */
  innerRadius: number;
  /** Inner circle radius in selected state (SVG units) */
  innerRadiusSelected: number;
  /** Callback fired when button is clicked, receives metricId or empty string to deselect */
  onSelect: (metricId: string) => void;
}

/**
 * MetricToggleButton - Interactive button for selecting font metrics
 *
 * Renders a circular button with gradient fills and glow effects that toggles
 * metric selection. The button consists of:
 * - Outer border circle (changes on selection)
 * - Active state circle with glow filter (visible when selected)
 * - Inner fill circle with shadow effect
 * - Transparent hit box for larger click target
 *
 * Gradients and filters are defined in VisualizerDefs:
 * - `#circle-border` - Default border gradient
 * - `#circle-border-active` - Selected border gradient with glow
 * - `#circle-fill` - Inner circle gradient
 * - `#glow-effect` - SVG filter for selection glow
 * - `#inner-shadow` - SVG filter for depth effect
 *
 * @example
 * ```tsx
 * <MetricToggleButton
 *   x={100}
 *   y={-375}
 *   isSelected={selectedMetric === 'capHeight'}
 *   metricId="capHeight"
 *   hitBoxSize={44}
 *   outerRadius={12}
 *   outerRadiusSelected={14}
 *   innerRadius={10}
 *   innerRadiusSelected={12}
 *   onSelect={(id) => setSelectedMetric(id)}
 * />
 * ```
 */
export const MetricToggleButton = ({
  x,
  y,
  isSelected,
  metricId,
  hitBoxSize,
  hitBoxRadius,
  outerRadius,
  outerRadiusSelected,
  innerRadius,
  innerRadiusSelected,
  onSelect,
}: MetricToggleButtonProps) => (
  <g
    className={styles['metric-toggle-group']}
    transform={`translate(${x}, ${y})`}
  >
    <circle
      r={isSelected ? outerRadiusSelected : outerRadius}
      fill="url(#circle-border)"
    />
    <circle
      className={styles['hover-glow-circle']}
      r={isSelected ? outerRadiusSelected : outerRadius}
      fill="url(#circle-border-active)"
      opacity={isSelected ? 1 : 0}
      filter={isSelected ? 'url(#glow-effect)' : undefined}
    />
    <circle
      r={isSelected ? innerRadiusSelected : innerRadius}
      fill="url(#circle-fill)"
      filter="url(#inner-shadow)"
    />
    <rect
      className={styles['hit-area']}
      x={-(hitBoxSize / 2)}
      y={-(hitBoxSize / 2)}
      width={hitBoxSize}
      height={hitBoxSize}
      rx={hitBoxRadius}
      fill="transparent"
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Toggle ${metricId}`}
      onClick={() => onSelect(isSelected ? '' : metricId)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(isSelected ? '' : metricId);
        }
      }}
    />
  </g>
);
