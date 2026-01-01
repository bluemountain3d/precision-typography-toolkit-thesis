import styles from './Image.module.scss';
import classNames from 'clsx';
import type { ImageProps } from './Image.types';
import { forwardRef, useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import {
  formatAspectRatio,
  formatFocusPoint,
  getAspectRatioForBreakpoint,
} from './Image.utils';
import { BrokenImageIcon } from './BrokenImageIcon';

/**
 * Modern, responsive image component with progressive loading and format optimization.
 *
 * Features:
 * - Responsive aspect ratios per breakpoint (mobile/tablet/desktop)
 * - Progressive blur-up loading with base64 placeholders
 * - Modern format support (AVIF/WebP) with automatic fallbacks
 * - Lazy loading with eager option for above-the-fold images
 * - Focus point control for precise object positioning
 * - Automatic fallback chain: src → fallbackSrc → error placeholder
 * - Decorative image support for accessibility
 *
 * @example
 * // Basic usage
 * <Img
 *   src="/images/hero.jpg"
 *   alt="Hero image"
 * />
 *
 * @example
 * // Fixed aspect ratio with blur placeholder
 * import blurPlaceholders from '@/data/blur-placeholders.json';
 *
 * <Img
 *   src="/images/hero.jpg"
 *   alt="Hero"
 *   aspectRatio="16/9"
 *   blurDataURL={blurPlaceholders['hero.jpg']}
 * />
 *
 * @example
 * // Responsive aspect ratios
 * <Img
 *   src="/images/product.jpg"
 *   alt="Product"
 *   aspectRatio={{
 *     mobile: '1/1',    // Square on mobile
 *     tablet: '3/2',    // Landscape on tablet
 *     desktop: '16/9'   // Wide on desktop
 *   }}
 * />
 *
 * @example
 * // Custom aspect ratio formats
 * <Img
 *   aspectRatio={[21, 9]}  // Tuple format
 * />
 *
 * <Img
 *   aspectRatio={1.777}    // Decimal format
 * />
 *
 * @example
 * // Modern formats with picture element
 * <Img
 *   src="/images/hero.jpg"
 *   alt="Hero"
 *   sources={{
 *     avif: '/images/hero.avif',
 *     webp: '/images/hero.webp'
 *   }}
 * />
 *
 * @example
 * // Modern formats with responsive srcSet
 * <Img
 *   src="/images/hero.jpg"
 *   alt="Hero"
 *   sources={{
 *     avif: {
 *       srcSet: '/images/hero-320.avif 320w, /images/hero-640.avif 640w',
 *       sizes: '(max-width: 768px) 100vw, 50vw'
 *     },
 *     webp: {
 *       srcSet: '/images/hero-320.webp 320w, /images/hero-640.webp 640w',
 *       sizes: '(max-width: 768px) 100vw, 50vw'
 *     }
 *   }}
 * />
 *
 * @example
 * // Focus point for object positioning
 * <Img
 *   src="/images/portrait.jpg"
 *   alt="Portrait"
 *   objectFit="cover"
 *   focusPoint={[30, 20]}  // Focus on face at 30% from left, 20% from top
 * />
 *
 * @example
 * // Eager loading for above-the-fold hero images
 * <Img
 *   src="/images/hero.jpg"
 *   alt="Hero"
 *   loading="eager"
 *   fetchPriority="high"
 * />
 *
 * @example
 * // Decorative image (no alt text needed)
 * <Img
 *   src="/images/decorative-pattern.jpg"
 *   decorative
 * />
 *
 * @example
 * // Custom fallback and error handling
 * <Img
 *   src="/images/user-avatar.jpg"
 *   alt="User avatar"
 *   fallbackSrc="/images/default-avatar.jpg"
 *   onError={(e) => console.error('Image failed to load', e)}
 * />
 *
 * @example
 * // Wrapper styling for interactive effects
 * <Img
 *   src="/images/gallery.jpg"
 *   alt="Gallery image"
 *   wrapperClassName="gallery-item"
 *   wrapperStyle={{ cursor: 'zoom-in' }}
 *   className="gallery-image"
 * />
 *
 * @example
 * // Responsive images with srcSet
 * <Img
 *   src="/images/hero-1024.jpg"
 *   srcSet="/images/hero-320.jpg 320w, /images/hero-640.jpg 640w, /images/hero-1024.jpg 1024w"
 *   sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
 *   alt="Hero"
 * />
 *
 * @example
 * // Complete example with all features
 * import blurPlaceholders from '@/data/blur-placeholders.json';
 *
 * <Img
 *   src="/images/hero.jpg"
 *   srcSet="/images/hero-320.jpg 320w, /images/hero-640.jpg 640w"
 *   sizes="(max-width: 768px) 100vw, 50vw"
 *   sources={{
 *     avif: '/images/hero.avif',
 *     webp: '/images/hero.webp'
 *   }}
 *   alt="Beautiful landscape"
 *   aspectRatio={{
 *     mobile: '3/2',
 *     tablet: '16/9',
 *     desktop: '21/9'
 *   }}
 *   objectFit="cover"
 *   focusPoint={[50, 40]}
 *   blurDataURL={blurPlaceholders['hero.jpg']}
 *   loading="lazy"
 *   decoding="async"
 *   fallbackSrc="/images/hero-fallback.jpg"
 *   wrapperClassName="hero-wrapper"
 *   className="hero-image"
 * />
 */
export const Img = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      srcSet,
      sizes,
      sources,
      objectFit = 'cover',
      focusPoint,
      aspectRatio,
      loading = 'lazy',
      decoding = 'async',
      fetchPriority = 'auto',
      blurDataURL,
      fallbackSrc = '/images/image-placeholder.webp',
      onError,
      decorative = false,
      className,
      style,
      wrapperClassName,
      wrapperStyle,
      ...props // Rest props (t.ex. onMouseEnter, id, data-attributes)
    },
    ref
  ) => {
    // State management
    const [isLoaded, setIsLoaded] = useState(loading === 'eager');
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);

    /**
     * Update state if the src prop changes externally
     * (e.g., in a carousel, slider, or dynamic image switcher)
     *
     * Always reset loading state when src changes to ensure proper
     * blur-up transitions, even for eager-loaded images. If the image
     * is cached, onLoad will fire almost immediately anyway.
     */
    useEffect(() => {
      // Only update if src actually changed (prevents unnecessary re-renders)
      if (src !== currentSrc) {
        setCurrentSrc(src);
        setHasError(false);
        setIsLoaded(false); // Always reset, even for eager images
      }
    }, [src, currentSrc]);

    // Media queries for responsive aspect ratio
    const isMobile = useMediaQuery(queries.isUpToTablet);
    const isDesktop = useMediaQuery(queries.isLaptopAndUp);

    // Determine current aspect ratio based on breakpoint
    const currentAspectRatio = getAspectRatioForBreakpoint(
      aspectRatio,
      isMobile,
      isDesktop
    );

    // Format values for CSS
    const aspectRatioValue = formatAspectRatio(currentAspectRatio);
    // const objectPositionValue = formatFocusPoint(focusPoint); // TODO: Use if needed

    // Event handlers
    const handleLoad = () => {
      setIsLoaded(true);
    };

    const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
      // Try fallback first, then show error state
      if (currentSrc === src && fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setHasError(false);
      } else {
        setHasError(true);
      }

      // Call user's onError if provided
      onError?.(event);
    };

    // Show blur placeholder?
    const showBlur = blurDataURL && !isLoaded && !hasError;

    // Build CSS custom properties for wrapper
    const wrapperCustomProperties = {
      '--aspect-ratio': aspectRatioValue,
      ...(focusPoint && { '--focus-point': formatFocusPoint(focusPoint) }),
      ...wrapperStyle, // User's wrapper styles override
    } as React.CSSProperties;

    // Image element
    const imgElement = (
      <img
        ref={ref}
        src={currentSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={decorative ? '' : alt}
        aria-hidden={decorative ? 'true' : undefined}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onLoad={handleLoad}
        onError={handleError}
        className={classNames(
          styles.image,
          objectFit && styles[`image--${objectFit}`],
          !isLoaded && styles['image--loading'],
          isLoaded && styles['image--loaded'],
          className
        )}
        style={style}
        {...props} // Spread rest props
      />
    );

    return (
      <div
        className={classNames(styles.wrapper, wrapperClassName)}
        style={wrapperCustomProperties}
      >
        {/* Blur placeholder */}
        {showBlur && (
          <img
            src={blurDataURL}
            alt=""
            aria-hidden="true"
            className={classNames(
              styles['blur-placeholder'],
              isLoaded && styles['blur-placeholder--hidden']
            )}
          />
        )}

        {/* Main image */}
        {!hasError && (
          <>
            {sources ? (
              <picture>
                {/* AVIF source */}
                {sources.avif && (
                  <source
                    type="image/avif"
                    srcSet={
                      typeof sources.avif === 'string'
                        ? sources.avif
                        : sources.avif.srcSet
                    }
                    sizes={
                      typeof sources.avif === 'object'
                        ? sources.avif.sizes
                        : sizes
                    }
                  />
                )}
                {/* WebP source */}
                {sources.webp && (
                  <source
                    type="image/webp"
                    srcSet={
                      typeof sources.webp === 'string'
                        ? sources.webp
                        : sources.webp.srcSet
                    }
                    sizes={
                      typeof sources.webp === 'object'
                        ? sources.webp.sizes
                        : sizes
                    }
                  />
                )}

                {/* Fallback img */}
                {imgElement}
              </picture>
            ) : (
              { imgElement }
            )}
          </>
        )}

        {/* Error placeholder */}
        {hasError && (
          <div className={classNames(styles.placeholder)}>
            <BrokenImageIcon />
          </div>
        )}
      </div>
    );
  }
);

Img.displayName = 'Img';
