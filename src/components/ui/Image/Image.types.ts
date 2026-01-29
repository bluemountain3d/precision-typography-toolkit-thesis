/**
 * Modern image format sources with optional responsive configurations
 */
export interface ImageProps {
  // Core properties
  /** Image source URL */
  src: string;
  /** Alternative text for accessibility (optional for decorative images) */
  alt: string;

  // Responsive images
  /** Source set for responsive images: "image-320w.jpg 320w, image-640w.jpg 640w" */
  srcSet?: string;
  /** Sizes attribute for responsive images: "(max-width: 600px) 100vw, 50vw" */
  sizes?: string;

  // Modern format support with picture element
  /** Modern image formats with fallbacks (avif, webp) */
  sources?: ImageSources;

  // Object positioning and fit
  /** How the image should fit its container */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  /** Focus point for object-position as percentage [x%, y%] */
  focusPoint?: [number, number];

  // Aspect ratio (responsive or fixed)
  /** Aspect ratio - can be responsive object or single value */
  aspectRatio?: ResponsiveAspectRatio;

  // Loading behavior
  /** Loading strategy (default: 'lazy') */
  loading?: 'lazy' | 'eager';
  /** Image decoding hint (default: 'async') */
  decoding?: 'async' | 'sync' | 'auto';
  /** Fetch priority hint (default: 'auto') */
  fetchPriority?: 'high' | 'low' | 'auto';

  // Placeholder and blur-up
  /** Base64 encoded blur placeholder data URL */
  blurDataURL?: string;

  // Fallback handling
  /** Fallback image source if main image fails to load */
  fallbackSrc?: string;
  /** Error handler callback */
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;

  // Styling
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Additional CSS class names for the wrapper element */
  wrapperClassName?: string;
  /** Inline styles for the wrapper element */
  wrapperStyle?: React.CSSProperties;

  // Accessibility
  /** Role attribute for semantic meaning */
  role?: 'img' | 'presentation';
  /** Whether image is decorative (sets aria-hidden and empty alt) */
  decorative?: boolean;
}

/**
 * Predefined aspect ratios for common image proportions
 */
export type AspectRatio =
  | '1/1'
  | '2/1'
  | '1/2'
  | '3/1'
  | '1/3'
  | '4/1'
  | '1/4'
  | '3/2'
  | '2/3'
  | '4/3'
  | '3/4'
  | '5/4'
  | '4/5'
  | '7/5'
  | '5/7'
  | '16/9'
  | '9/16';

/**
 * Breakpoint names for responsive configurations
 */
export type AspectRatioBreakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * Aspect ratio configuration - supports fixed values or responsive breakpoints
 *
 * @example
 * // Fixed ratio
 * aspectRatio: '16/9'
 *
 * @example
 * // Custom tuple
 * aspectRatio: [21, 9]
 *
 * @example
 * // Decimal value
 * aspectRatio: 2.35
 *
 * @example
 * // Responsive breakpoints
 * aspectRatio: {
 *   mobile: '1/1',
 *   tablet: '3/2',
 *   desktop: '16/9'
 * }
 */
export type ResponsiveAspectRatio =
  | AspectRatio
  | [number, number]
  | number
  | Partial<
      Record<AspectRatioBreakpoint, AspectRatio | [number, number] | number>
    >;

/**
 * Modern image format sources with optional responsive configurations
 */
export interface ImageSources {
  /** AVIF format source (best compression, modern browsers) */
  avif?: string | { srcSet: string; sizes?: string };
  /** WebP format source (good compression, wide support) */
  webp?: string | { srcSet: string; sizes?: string };
}
