import styles from './Toggle.module.scss';
import classNames from 'clsx';
import type { ToggleProps } from './Toggle.types';

/**
 * Toggle switch component for binary on/off states.
 * Features smooth slide animation, keyboard navigation support, and accessible focus indicators.
 *
 * Accessibility features:
 * - Semantic checkbox input with sr-only class
 * - Keyboard navigable with Tab key
 * - Focus-visible indicators (outline + glow)
 * - Proper label association via htmlFor
 * - Shows "On/Off" text for visual clarity
 *
 * @example
 * // Basic controlled toggle
 * const [enabled, setEnabled] = useState(false);
 * <Toggle
 *   toggleId="feature-toggle"
 *   checked={enabled}
 *   onChange={setEnabled}
 * />
 *
 * @example
 * // Toggle with label and custom size
 * <Toggle
 *   toggleId="dark-mode"
 *   checked={isDarkMode}
 *   onChange={setIsDarkMode}
 *   label="Dark Mode"
 *   size="lg"
 * />
 *
 * @example
 * // Disabled toggle
 * <Toggle
 *   toggleId="locked-setting"
 *   checked={true}
 *   onChange={() => {}}
 *   disabled
 *   label="Admin Only"
 * />
 */
export const Toggle = ({
  toggleId,
  checked,
  onChange,
  disabled,
  label,
  size = 'base',
}: ToggleProps) => {
  return (
    <label
      htmlFor={toggleId}
      className={classNames(styles.toggle, styles[`toggle--${size}`])}
    >
      <input
        type="checkbox"
        id={toggleId}
        onChange={(e) => onChange(e.target.checked)}
        checked={checked}
        disabled={disabled}
        className="sr-only"
      />
      <span
        className={classNames(
          styles.toggle__switch,
          checked && styles['toggle__switch--checked'],
          !checked && styles['toggle__switch--unchecked']
        )}
      >
        <span
          className={classNames(styles['toggle__switch-text'], `text-${size}`)}
        >
          {checked ? 'On' : 'Off'}
        </span>
      </span>
      <span className={classNames(styles['toggle__bg-text'])}>On</span>
      <span className={classNames(styles['toggle__bg-text'])}>Off</span>
      {label && <span className={styles.toggle__label}>{label}</span>}
    </label>
  );
};
