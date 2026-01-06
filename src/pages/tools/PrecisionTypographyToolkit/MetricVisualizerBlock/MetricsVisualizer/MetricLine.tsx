interface MetricLineProps {
  x1: number;
  x2: number;
  y: number;
  color: string;
}

export const MetricLine = ({
  x1 = 0,
  x2 = 0,
  y = 0,
  color,
}: MetricLineProps) => (
  <line
    id={`id`}
    x1={x1}
    x2={x2}
    y1={y}
    y2={y}
    stroke={color}
    strokeWidth="1"
    vectorEffect="non-scaling-stroke"
  />
);
