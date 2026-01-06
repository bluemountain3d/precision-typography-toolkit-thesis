interface VisualizerDefsProps {
  arrowWidth: number;
  arrowHeight: number;
  refPoint: number;
  measureColor: string;
  selectedMeasureColor: string;
  unitsPerRem: number;
}

export const VisualizerDefs = ({
  arrowWidth,
  arrowHeight,
  refPoint,
  measureColor,
  selectedMeasureColor,
  unitsPerRem,
}: VisualizerDefsProps) => {
  const glowBlur = 0.5 * unitsPerRem; // 0.5rem blur
  const shadowBlur = 0.125 * unitsPerRem; // 0.125rem blur
  const shadowOffset = 0.0625 * unitsPerRem; // 0.0625rem offset

  return (
    <defs>
      {/* Outer circle gradient (border) - 45° to bottom left */}
      <linearGradient id="circle-border" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="55%" stop-color="var(--color-tertiary)" />
        <stop offset="90%" stop-color="var(--color-tertiary)" />
      </linearGradient>

      <linearGradient
        id="circle-border-active"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="10%" stop-color="var(--color-primary-border-bright)" />
        <stop offset="45%" stop-color="var(--color-primary-border-hover)" />
      </linearGradient>

      {/* Inner circle gradient (fill) - 45° to bottom left */}
      <linearGradient id="circle-fill" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--color-primary-surface)" />
        <stop offset="100%" stop-color="var(--color-primary-surface-dark)" />
      </linearGradient>

      {/* Drop shadow for active border */}
      <filter id="glow-effect" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation={glowBlur}
          flood-color="var(--color-primary-border-hover)"
          flood-opacity="0.8"
        />
      </filter>

      {/* Inner shadow for fill */}
      <filter id="inner-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation={shadowBlur}
          result="blur"
        />
        <feOffset in="blur" dx="0" dy={shadowOffset} result="offsetBlur" />
        <feFlood flood-color="#000000" flood-opacity="0.5" result="color" />
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
