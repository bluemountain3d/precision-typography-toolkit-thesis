import classNames from 'clsx';
import styles from './Container.module.scss';
import type { ContainerProps } from './Container.types';

/**
 * Container component for consistent page layout and content width constraints.
 * Provides responsive max-width variants, optional height control, and flow spacing.
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
 * // Prose container for optimal reading width (70ch)
 * <Container variant="boxed">
 *   <Container variant="prose" flow="em">
 *     <Text>Paragraph with optimal line length...</Text>
 *     <Text>Another paragraph with flow spacing...</Text>
 *   </Container>
 * </Container>
 *
 * @example
 * // Full-width container with fixed height
 * <Container variant="full" height={ContainerHeight.Viewport} noGap>
 *   <Hero />
 * </Container>
 *
 * @example
 * // Container with flow spacing between children
 * <Container variant="boxed" flow="space">
 *   <Heading level={1} size="heading-1">Title</Heading>
 *   <Text>Spaced content using --flow-space</Text>
 *   <Text>More spaced content</Text>
 * </Container>
 */
export const Container = ({
  children,
  variant = 'boxed',
  flow,
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
        flow && `flow-${flow}`,
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
