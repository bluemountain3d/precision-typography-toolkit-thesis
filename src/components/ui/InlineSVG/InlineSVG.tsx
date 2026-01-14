import styles from './InlineSVG.module.scss';
import classNames from 'clsx';
import { useId } from 'react';
import type React from 'react';

/**
 * Props for the InlineSVG component
 */
interface InlineSVGProps {
  /** SVG elements (paths, circles, etc.) */
  children: React.ReactNode;
  /** The SVG viewBox attribute (e.g., "0 0 100 100") */
  viewBox: string;
  /** Accessible title for the SVG (required even if decorative) */
  title: string;
  /** Optional longer description for screen readers */
  description?: string;
  /** Default fill color for SVG elements */
  fill?: string;
  /** Additional CSS classes for the wrapper */
  className?: string;
  /** If true, SVG scales to fill its container */
  fitToContainer?: boolean;
  /** If true, SVG is hidden from assistive technologies */
  isDecorative?: boolean;
  /** Controls how SVG scales within viewBox */
  preserveAspectRatio?: string;
}

/**
 * A wrapper component for inline SVG elements that provides consistent sizing,
 * accessibility features, and layout control.
 *
 * @component
 * @example
 * // Basic usage with accessibility
 * <InlineSVG
 *   viewBox="0 0 100 100"
 *   title="Logo"
 *   description="Company logo with blue circle"
 * >
 *   <circle cx="50" cy="50" r="40" fill="blue" />
 * </InlineSVG>
 *
 * @example
 * // Decorative SVG (hidden from screen readers)
 * <InlineSVG
 *   viewBox="0 0 200 200"
 *   title="Decorative pattern"
 *   isDecorative
 * >
 *   <path d="M10 10 L90 90" />
 * </InlineSVG>
 *
 * @example
 * // SVG that fills its container
 * <div style={{ width: '300px', height: '200px' }}>
 *   <InlineSVG
 *     viewBox="0 0 800 600"
 *     title="Chart visualization"
 *     fitToContainer
 *   >
 *   </InlineSVG>
 * </div>
 */
export const InlineSVG = ({
  children,
  viewBox,
  title,
  description,
  fill = 'none',
  className,
  fitToContainer = false,
  isDecorative = false,
  preserveAspectRatio,
}: InlineSVGProps) => {
  const titleId = useId();
  const descId = useId();

  return (
    <div
      className={classNames(
        styles['svg-wrapper'],
        fitToContainer && styles['svg-wrapper--fit'],
        className
      )}
    >
      <svg
        viewBox={viewBox}
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio={preserveAspectRatio ?? 'xMidYMid meet'}
        role={isDecorative ? 'presentation' : 'img'}
        aria-hidden={isDecorative ? 'true' : undefined}
        focusable="false"
        {...(!isDecorative && {
          'aria-labelledby': description ? `${titleId} ${descId}` : titleId,
        })}
        className={styles['svg-wrapper__element']}
      >
        {!isDecorative && <title id={titleId}>{title}</title>}
        {!isDecorative && description && <desc id={descId}>{description}</desc>}
        {children}
      </svg>
    </div>
  );
};
