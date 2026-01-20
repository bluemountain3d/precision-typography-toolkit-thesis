interface MeasureLineProps {
  line:
    | 'divider'
    | 'hook'
    | 'measure-2-left'
    | 'measure-em'
    | 'measure-right'
    | 'measure-tall-left'
    | 'measure-tall-right';
  x: number;
  y: number;
}

const linePaths: Record<MeasureLineProps['line'], string> = {
  divider: 'M200 0.5H0',
  hook: 'M100 0.5H0',
  'measure-2-left': 'M200.5 0.5H0.5V4500.5H200.5',
  'measure-em': 'M0 0.5H200V1000.5H0',
  'measure-right': 'M0 0.5H200V3622.5H0',
  'measure-tall-left': 'M200.5 0.5H0.5V7500.5H200.5',
  'measure-tall-right': 'M0 0.5H200V6622.5H0',
};

export function MeasureLine({ line, x, y }: MeasureLineProps) {
  return (
    <g className="measure-line" transform={`translate(${x}, ${y})`}>
      <path d={linePaths[line]} />
    </g>
  );
}
