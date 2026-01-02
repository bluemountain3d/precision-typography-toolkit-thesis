/**
 * Props for the ThumbSlider component
 */
export interface ThumbSliderProps {
  /**
   * Unique identifier for the input element
   * Used for label association and testing
   */
  inputId: string;

  min: number;
  max: number;
  step: number;
  value: number;

  /**
   * Callback function invoked when slider value changes
   * @param value - The new slider value
   */
  onChange: (value: number) => void;

  label?: string;
  labelWidth?: number;
  disabled?: boolean;
}
