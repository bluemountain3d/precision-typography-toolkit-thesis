interface MetricToggleButtonProps {
  x: number;
  y: number;
  isSelected: boolean;
  metricId: string;
  hitBoxSize: number;
  outerRadius: number;
  outerRadiusSelected: number;
  innerRadius: number;
  innerRadiusSelected: number;
  onSelect: (metricId: string) => void;
}

export const MetricToggleButton = ({
  x,
  y,
  isSelected,
  metricId,
  hitBoxSize,
  outerRadius,
  outerRadiusSelected,
  innerRadius,
  innerRadiusSelected,
  onSelect,
}: MetricToggleButtonProps) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle
      r={isSelected ? outerRadiusSelected : outerRadius}
      fill="url(#circle-border)"
    />
    <circle
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
      x={-(hitBoxSize / 2)}
      y={-(hitBoxSize / 2)}
      width={hitBoxSize}
      height={hitBoxSize}
      fill="transparent"
      style={{ cursor: 'pointer' }}
      onClick={() => onSelect(isSelected ? '' : metricId)}
    />
  </g>
);
