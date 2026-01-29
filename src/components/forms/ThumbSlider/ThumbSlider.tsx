import styles from './ThumbSlider.module.scss';
import classNames from 'clsx';
import type { ThumbSliderProps } from './ThumbSlider.types';
import type React from 'react';

/**
 * ThumbSlider - Custom range slider with progress fill visualization
 *
 * A fully accessible range input component with custom styling including:
 * - Progress fill track (shows filled/unfilled portions)
 * - Gradient-styled thumb with hover effects
 * - Cross-browser support (Webkit & Firefox)
 * - Keyboard navigation support
 * - Disabled state styling
 *
 * @example
 * ```tsx
 * const [lineHeight, setLineHeight] = useState(1.5);
 *
 * <ThumbSlider
 *   inputId="line-height-control"
 *   min={1}
 *   max={2}
 *   step={0.05}
 *   value={lineHeight}
 *   onChange={setLineHeight}
 *   label={`line-height: ${lineHeight.toFixed(2)};`}
 * />
 * ```
 */
export const ThumbSlider = ({
  inputId,
  min,
  max,
  step,
  value,
  onChange,
  label,
  ariaLabel,
  labelWidth,
  disabled,
}: ThumbSliderProps) => {
  /**
   * Handles slider value changes
   * - Calculates progress percentage for visual fill
   * - Updates CSS custom property for progress track
   * - Calls parent onChange callback with new value
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber;
    const percentage = Math.min(
      Math.max(Math.round(((newValue - min) / (max - min)) * 100), 0),
      100
    );

    // Update CSS custom property for progress fill visualization
    e.target.style.setProperty('--_progress', `${percentage}%`);

    // Propagate value change to parent component
    onChange(newValue);
  };

  return (
    <div className={classNames(styles['thumb-slider'])}>
      {/* Optional label for slider context */}
      {label && (
        <label htmlFor={inputId} style={{ minWidth: `${labelWidth}ch` }}>
          {label}
        </label>
      )}

      <input
        type="range"
        id={inputId}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-valuetext={`${value.toFixed(2)}`}
        style={
          {
            // Initial progress percentage for CSS linear gradient
            '--_progress': `${Math.round(((value - min) / (max - min)) * 100)}%`,
          } as React.CSSProperties
        }
      />
    </div>
  );
};
