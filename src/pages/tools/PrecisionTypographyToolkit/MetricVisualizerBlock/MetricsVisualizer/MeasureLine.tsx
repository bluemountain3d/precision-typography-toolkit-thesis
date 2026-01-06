interface MeasureLineProps {
  x: number;
  y1: number;
  y2: number;
  isSelected: boolean;
  color: string;
  colorSelected: string;
}

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
