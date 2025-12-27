import classNames from 'clsx';
import styles from './Container.module.scss';
import type { ContainerProps } from './Container.types';

/**
 * Container component for consistent page layout and content width constraints.
 * Provides responsive max-width variants and optional height control.
 *
 * @example
 * // Standard boxed container
 * <Container variant="boxed">
 *   <h1>Page Title</h1>
 *   <p>Content...</p>
 * </Container>
 *
 * @example
 * // Narrow container for focused content
 * <Container variant="narrow" marginTop="xl">
 *   <article>Long-form content</article>
 * </Container>
 *
 * @example
 * // Full-width container with fixed height
 * <Container variant="full" height={ContainerHeight.Viewport} noGap>
 *   <Hero />
 * </Container>
 */
export const Container = ({
  children,
  variant = 'boxed',
  noGap = false,
  marginTop,
  marginBottom,
  height,
  className,
}: ContainerProps) => {
  return (
    <div
      className={classNames(
        styles.container,
        styles[`container-${variant}`],
        noGap && styles['no-gap'],
        marginTop && `mt-${marginTop}`,
        marginBottom && `mb-${marginBottom}`,
        height && styles[`container-${height}`],
        className
      )}
    >
      {children}
    </div>
  );
};
