interface AreaRectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  isSelected: boolean
}

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
