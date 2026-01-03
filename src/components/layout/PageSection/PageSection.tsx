import styles from './PageSection.module.scss';
import classNames from 'clsx';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

/**
 * Props for the PageSection component
 * @template T - The element type to render (defaults to 'section')
 */
type PageSectionProps<T extends ElementType> = {
  /**
   * The HTML element to render
   * @default 'section'
   */
  as?: T;
  /**
   * Content to render inside the section
   */
  children?: ReactNode;
  /**
   * Vertical padding size using a fluid spacing scale.
   * Note: Padding stacks when sections are adjacent (e.g., 'large' + 'large' ≈ 128-160px gap).
   * - `none`: 0 padding
   * - `small`: 20-25px (var(--space-md))
   * - `medium`: 32-40px (var(--space-xl))
   * - `large`: 64-80px (var(--space-3xl))
   * - `huge`: 96-120px (var(--space-5xl))
   * @default 'medium'
   */
  padding?: 'none' | 'small' | 'medium' | 'large' | 'huge';
  /**
   * Background color variant (optional)
   * - `primary-dark`: Dark primary color
   * - `primary`: Primary color
   * - `secondary`: Secondary color
   * - `tertiary`: Tertiary color
   *
   * If not provided, inherits background from parent/body
   */
  background?: 'primary-dark' | 'primary' | 'secondary' | 'tertiary';
  /**
   * Makes the section fill the viewport height minus header
   * Sets `min-height: calc(100dvh - var(--header-height, 0px))`
   * and converts display to flex column for proper content distribution.
   * Useful for hero sections or full-page layouts.
   * @default false
   */
  fullHeight?: boolean;
  /**
   * Centers content both vertically and horizontally within the section.
   * Requires `fullHeight` to be true for vertical centering to work.
   * Uses flexbox justify-content and align-content.
   * @default false
   */
  centerContent?: boolean;
} & ComponentPropsWithoutRef<T>;

/**
 * A polymorphic section component for page layout with configurable padding and background.
 *
 * @component
 * @template T - The element type to render (defaults to 'section')
 *
 * @example
 * // Basic usage with default section element
 * <PageSection>
 *   <h2>Section Title</h2>
 *   <p>Section content</p>
 * </PageSection>
 *
 * @example
 * // With custom padding and background
 * <PageSection padding="large" background="primary">
 *   <h2>Hero Section</h2>
 * </PageSection>
 *
 * @example
 * // Full-height hero section with centered content
 * <PageSection fullHeight centerContent background="primary-dark">
 *   <h1>Welcome to Our Site</h1>
 *   <p>Centered vertically and horizontally</p>
 * </PageSection>
 *
 * @example
 * // Render as article with no background
 * <PageSection as="article" padding="small">
 *   <h2>Article Content</h2>
 * </PageSection>
 *
 * @example
 * // With accessibility attributes
 * <PageSection
 *   id="features"
 *   aria-labelledby="features-heading"
 *   background="secondary"
 * >
 *   <h2 id="features-heading">Features</h2>
 * </PageSection>
 *
 * @example
 * // Full-height section without centering (content at top)
 * <PageSection fullHeight padding="large">
 *   <h2>This stays at the top</h2>
 *   <p>But section fills viewport height</p>
 * </PageSection>
 *
 * @example
 * // Polymorphic usage as main element
 * <PageSection as="main" padding="none" role="main">
 *   <Container>
 *     <h1>Main Content</h1>
 *   </Container>
 * </PageSection>
 */
export const PageSection = <T extends ElementType = 'section'>({
  children,
  as,
  padding = 'medium',
  background,
  fullHeight,
  centerContent,
  className,
  id,
  'aria-labelledby': ariaLabelledby,
  role,
  ...rest
}: PageSectionProps<T>) => {
  const Component = as || 'section';

  const sectionProps = {
    id,
    role,
    'aria-labelledby': ariaLabelledby,
    className: classNames(
      styles.section,
      fullHeight && styles['section--full-height'],
      centerContent && styles['section--center-content'],
      styles[`section--padding-${padding}`],
      background && styles[`section--background-${background}`],
      className
    ),
    ...rest,
  };

  return <Component {...sectionProps}>{children}</Component>;
};
