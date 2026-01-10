import { useEffect, useRef, useState } from 'react';
import { useFontMetrics } from '../../context';
import styles from './MetricsVisualizer.module.scss';
import classNames from 'clsx';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { MetricsVisualizerSVG } from './MetricsVisualizerSVG';
import { print } from '@/utils/dev';

/**
 * Custom hook for deep comparison of objects to prevent unnecessary re-renders
 *
 * Uses JSON stringification to compare object contents rather than reference equality.
 * This is particularly useful for objects coming from context that may have the same
 * values but different references across renders.
 *
 * @template T - Type of value to compare
 * @param value - Value to memoize with deep comparison
 * @returns Memoized value that only updates when content actually changes
 *
 * @example
 * ```tsx
 * const textWidths = useDeepCompareMemo(state.textVariantWidths || {});
 * // Only triggers re-render if object contents change, not reference
 * ```
 */
function useDeepCompareMemo<T>(value: T): T {
  const ref = useRef<T>(value);
  const stringifiedValue = JSON.stringify(value);
  const stringifiedRef = useRef<string>(stringifiedValue);

  if (stringifiedRef.current !== stringifiedValue) {
    ref.current = value;
    stringifiedRef.current = stringifiedValue;
  }

  return ref.current;
}

/**
 * Props for MetricsVisualizer component
 */
interface MetricsVisualizerProps {
  /**
   * Line height multiplier for the visualization
   * @default 1.5
   */
  lineHeight: number;

  /**
   * Whether to enable kerning in the displayed text
   * @default undefined
   */
  kerning?: boolean;
}

/**
 * Interactive font metrics visualization component
 *
 * Displays a comprehensive visualization of font metrics including:
 * - Line box, em box, and content boxes
 * - Ascender, descender, cap height, and x-height lines
 * - Vertical measurements with annotation lines
 * - Leading trim visualization
 * - Responsive text selection based on available space
 *
 * The component automatically selects appropriate text samples based on viewport
 * width and screen size breakpoints, ensuring optimal visual clarity across devices.
 *
 * ## Features
 * - **Responsive text selection**: Chooses longest text variant that fits with adequate spacing
 * - **Performance optimized**: Separates text selection (expensive) from dimension updates (cheap)
 * - **Breakpoint aware**: Different text variants for mobile, tablet, and desktop
 * - **Real-time updates**: Responds to line height changes, font changes, and window resize
 *
 * ## Text Selection Algorithm
 * The component uses precomputed text variant widths to select the longest text that fits:
 * - Mobile (up to tablet): Min 1rem gap between measure lines
 * - Tablet and up: Min 2.75rem gap between measure lines
 * - Variants: 'Hxdg0', 'Hxdg', 'Hxlj', 'Hxd', 'Hxl', 'Hx' (longest to shortest)
 *
 * @param props - Component props
 * @returns Interactive metrics visualization SVG
 *
 * @example
 * ```tsx
 * <MetricsVisualizer
 *   lineHeight={1.5}
 *   kerning={true}
 * />
 * ```
 */

export const MetricsVisualizer = ({
  lineHeight = 1.5,
  kerning,
}: MetricsVisualizerProps) => {
  /** Reference to container element for dimension measurements */
  const elemRef = useRef<HTMLDivElement>(null);

  /** Current bounding box of rendered text (used for measure line positioning) */
  const [textBBox, setTextBBox] = useState<DOMRect | null>(null);

  /** Internal loading state - true until first valid calculation completes */
  const [isInitialized, setIsInitialized] = useState(false);

  /** Cached visualizer dimensions and selected text */
  const [visualizerData, setVisualizerData] = useState({
    /** Current computed font size (e.g., "16px") */
    fontSize: '',
    /** Font units per 1rem in root font size */
    unitsPerRem: 0,
    /** Container width in pixels */
    width: 0,
    /** ViewBox width in font units */
    viewBoxWidth: 0,
    /** Currently selected text variant for display */
    vizText: '',
    /** Width of selected text (currently unused) */
    vizTextWidth: 0,
  });

  const { state } = useFontMetrics();

  /**
   * Precomputed text variant widths from font parsing
   * Uses deep comparison to prevent unnecessary re-renders
   */
  const textVariantWidths = useDeepCompareMemo(state.textVariantWidths || {});

  const isMobile = useMediaQuery(queries.isUpToTablet);
  const isDesktop = useMediaQuery(queries.isLaptopAndUp);

  /** Font's units per em (typically 1000 or 2048) */
  const unitsPerEm = state.unitsPerEm || 1000;

  /** Half leading in font units (space added above and below em box) */
  const halfLeading = state.halfLeading || 0;

  /** Top trim value in font units (for leading-trim calculations) */
  const topTrim = state.topTrim || 0;

  /** Bottom trim value in font units (for leading-trim calculations) */
  const bottomTrim = state.bottomTrim || 0;

  /**
   * Check if component has valid data to render
   */
  const hasValidData =
    state.loadedFontFamily &&
    Object.keys(textVariantWidths).length > 0 &&
    unitsPerEm > 0;

  /**
   * Effect 1: Responsive text selection based on available space
   *
   * Runs when:
   * - Font changes (new textVariantWidths)
   * - Breakpoint changes (mobile/desktop)
   * - Window resizes
   *
   * Selects the longest text variant that fits within the container
   * while maintaining minimum gap requirements between measure lines.
   *
   * Performance: Expensive (text selection algorithm), runs infrequently
   */
  useEffect(() => {
    if (!elemRef.current || !hasValidData) {
      print.warn('MetricsVisualizer: Waiting for valid data...', {
        hasElemRef: !!elemRef.current,
        hasFont: !!state.loadedFontFamily,
        hasWidths: Object.keys(textVariantWidths).length,
        hasUnitsPerEm: unitsPerEm > 0,
      });
      return;
    }

    // Wait for CSS to compute (especially clamp() font-size)
    const calculate = () => {
      if (!elemRef.current) return;

      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      const computedStyle = getComputedStyle(elemRef.current);
      const fontSizeInPx = parseFloat(computedStyle.fontSize);
      
      print('=== Font Size Check ===');
      print('Computed fontSize:', fontSizeInPx);
      print('unitsPerEm:', unitsPerEm);
      print('Difference:', Math.abs(fontSizeInPx - unitsPerEm));
      
      // Safety check: if fontSize looks wrong (equals unitsPerEm), retry
      if (Math.abs(fontSizeInPx - unitsPerEm) < 10) {
        print.warn('⚠️ Font size not computed yet, retrying...');
        requestAnimationFrame(calculate);
        return;
      }

      print('✓ Font size OK, continuing...');
      
      const containerWidthPx = elemRef.current.offsetWidth;

      print('Font size in px:', fontSizeInPx);
      print('Container width px:', containerWidthPx);

      const unitsPerRem = (unitsPerEm / fontSizeInPx) * rootFontSize;
      const viewBoxWidth = (containerWidthPx / fontSizeInPx) * unitsPerEm;

      // Gap requirements:
      // We divide total gap into 8 steps: totalGap / 8
      // We want 4 steps on each side of the text
      // Each step should be >= baseGapInRem
      // Mobile: Each step >= 1rem
      // Tablet+: Each step >= 2.75rem
      const baseGapInRem = isMobile ? 1 : 2.75;
      const minGapStepUnits = baseGapInRem * unitsPerRem;

      print.group('Text Selection Debug');
      print('Container width (px):', containerWidthPx);
      print('ViewBox width (units):', viewBoxWidth);
      print('Base gap per step (rem):', baseGapInRem);
      print('Min gap step (units):', minGapStepUnits);
      print('Available text variants:', textVariantWidths);

      // Välj textvarianter baserat på skärmstorlek
      const TEXT_VARIANTS = isDesktop
        ? ['Hxdg0', 'Hxdg', 'Hxlj', 'Hxd', 'Hxl', 'Hx']
        : isMobile
          ? ['Hxlj', 'Hxl', 'Hx']
          : ['Hxdg', 'Hxlj', 'Hxd', 'Hxl', 'Hx'];

      print('Testing variants:', TEXT_VARIANTS);

    // Hitta längsta texten som får plats
    let selectedText = TEXT_VARIANTS[TEXT_VARIANTS.length - 1];

    for (const str of TEXT_VARIANTS) {
      const textWidthUnits = textVariantWidths[str];
      if (!textWidthUnits) {
        print.warn(`Missing width for "${str}"`);
        continue;
      }

      // Totalt tillgängligt gap
      const totalGap = viewBoxWidth - textWidthUnits;
      
      // Ett gap-steg = totalGap / 8
      const gapStep = totalGap / 8;
      
      // Vi vill att varje gap-steg ska vara >= minGapStepUnits
      const fits = gapStep >= minGapStepUnits;

      print(`"${str}": width=${textWidthUnits}, gapStep=${gapStep.toFixed(2)}, minStep=${minGapStepUnits.toFixed(2)}, fits=${fits}`);

      if (fits) {
        selectedText = str;
        print(`✓ Selected: "${selectedText}"`);
        break;
      }
    }

    print.groupEnd();

      // Update state and mark as initialized IN SAME UPDATE
      setVisualizerData((prev) => {
        if (prev.vizText === selectedText && isInitialized) {
          return prev; // Skip update if same text and already initialized
        }
        return {
          fontSize: computedStyle.fontSize,
          unitsPerRem,
          width: containerWidthPx,
          viewBoxWidth,
          vizText: selectedText,
          vizTextWidth: 0,
        };
      });

      // Mark as initialized AFTER state is set
      if (!isInitialized) {
        print('MetricsVisualizer: Initialization complete');
        // Use setTimeout to ensure state update happens first
        setTimeout(() => setIsInitialized(true), 0);
      }
    };

    // Start calculation (with retry if font-size not ready)
    calculate();

    const handleResize = () => {
      if (!elemRef.current) return;

      const newComputedStyle = getComputedStyle(elemRef.current);
      const newFontSizeInPx = parseFloat(newComputedStyle.fontSize);
      const newContainerWidthPx = elemRef.current.offsetWidth;
      const newUnitsPerRem = (unitsPerEm / newFontSizeInPx) * rootFontSize;
      const newViewBoxWidth = (newContainerWidthPx / newFontSizeInPx) * unitsPerEm;

      // Kör text-selection igen med samma logik
      const newGapStep = (newViewBoxWidth - 0) / 8; // Temp, recalc per variant
      let newSelectedText = TEXT_VARIANTS[TEXT_VARIANTS.length - 1];

      for (const str of TEXT_VARIANTS) {
        const textWidthUnits = textVariantWidths[str];
        if (!textWidthUnits) continue;

        const totalGap = newViewBoxWidth - textWidthUnits;
        const gapStep = totalGap / 8;

        if (gapStep >= minGapStepUnits) {
          newSelectedText = str;
          break;
        }
      }

      setVisualizerData({
        fontSize: newComputedStyle.fontSize,
        unitsPerRem: newUnitsPerRem,
        width: newContainerWidthPx,
        viewBoxWidth: newViewBoxWidth,
        vizText: newSelectedText,
        vizTextWidth: 0,
      });
    };

    // Start calculation (with retry if font-size not ready)
    calculate();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [unitsPerEm, isMobile, isDesktop, textVariantWidths, hasValidData]);

  /**
   * Effect 2: Update viewBox dimensions on line height changes
   *
   * Runs when:
   * - Line height slider changes
   * - Font changes (unitsPerEm)
   *
   * Updates only the dimension-related properties without running
   * the expensive text selection algorithm.
   *
   * Performance: Fast (simple calculations), runs frequently
   */
  useEffect(() => {
    if (!elemRef.current) return;

    const computedStyle = getComputedStyle(elemRef.current);
    const fontSizeInPx = parseFloat(computedStyle.fontSize);
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );

    setVisualizerData((prev) => ({
      ...prev,
      fontSize: computedStyle.fontSize,
      unitsPerRem: (unitsPerEm / fontSizeInPx) * rootFontSize,
    }));
  }, [lineHeight, unitsPerEm]);



  /**
   * Calculate gap offset for measure lines
   *
   * Distributes the available horizontal space (viewBox width minus text width)
   * across 8 positions for positioning vertical measure lines at different offsets.
   *
   * Uses textBBox if available (accurate DOM measurement), otherwise falls back
   * to precomputed width from textVariantWidths.
   *
   * @param num - Multiplier for gap offset (1-4 typically)
   * @returns Gap offset in font units
   */
  const measureLineGap = (num: number) => {
    // Use DOM-measured width if available, otherwise use precomputed width
    const textWidth = textBBox 
      ? textBBox.width 
      : textVariantWidths[visualizerData.vizText] || 0;
    
    return textWidth > 0
      ? ((visualizerData.viewBoxWidth - textWidth) / 8) * num
      : 0;
  };

  /**
   * SVG viewBox configuration
   * Defines the coordinate system for the visualization
   */
  const viewBox = {
    /** Top Y coordinate (includes half leading above ascender) */
    minY: -(state.upmAscender || 0) - halfLeading,
    /** Total width in font units */
    width: visualizerData.viewBoxWidth,
    /** Total height in font units (unitsPerEm * lineHeight) */
    height: unitsPerEm * lineHeight,
  };

  /**
   * Y-coordinates for all horizontal metric lines
   * All values are in font units, with baseline at y=0
   */
  const yPositions = {
    /** Top edge of line box (includes half leading) */
    lineBoxTop: -(state.upmAscender || 0) - halfLeading,
    /** hhea ascender line (tallest glyph reaches) */
    ascender: -(state.hheaAscender || 0),
    /** Top edge of em box (UPM ascender) */
    emBoxTop: -(state.upmAscender || 0),
    /** Capital letter height line */
    capHeight: -(state.capHeight || 0),
    /** Lowercase letter height line */
    xHeight: -(state.xHeight || 0),
    /** Baseline (y=0 reference) */
    baseline: 0,
    /** Bottom edge of em box (UPM descender, negative) */
    emBoxBottom: -(state.upmDescender || 0),
    /** hhea descender line (deepest glyph reaches, negative) */
    descender: -(state.hheaDescender || 0),
    /** Bottom edge of line box (includes half leading below) */
    lineBoxBottom: -(state.upmDescender || 0) + halfLeading,
  };

  /**
   * Calculate line configuration with x-positions
   *
   * @param y - Y coordinate for the line
   * @param x1 - Start x-coordinate (or 0 if no text bbox)
   * @param x2 - End x-coordinate (or full width if no text bbox)
   * @returns Line configuration object
   */
  const getLineConfig = (
    y: number,
    x1: number,
    x2: number
  ): { x1: number; x2: number; y: number } => {
    if (!textBBox) {
      // Full width when text bbox not yet measured
      return {
        x1: 0,
        x2: viewBox.width,
        y,
      };
    }

    return {
      x1,
      x2,
      y,
    };
  };

  /**
   * Horizontal line configurations
   * Each line has varying x-positions to create visual depth/layering
   */

  const lines = {
    lineBoxTop: getLineConfig(yPositions.lineBoxTop, 0, viewBox.width),
    emBoxTop: getLineConfig(
      yPositions.emBoxTop,
      measureLineGap(1),
      viewBox.width - measureLineGap(3)
    ),
    ascender: getLineConfig(
      yPositions.ascender,
      measureLineGap(4),
      viewBox.width - measureLineGap(2)
    ),
    capHeight: getLineConfig(
      yPositions.capHeight,
      measureLineGap(2),
      viewBox.width
    ),
    xHeight: getLineConfig(
      yPositions.xHeight,
      measureLineGap(3),
      viewBox.width - measureLineGap(3.5)
    ),
    baseline: getLineConfig(
      yPositions.baseline,
      measureLineGap(2),
      viewBox.width
    ),
    emBoxBottom: getLineConfig(
      yPositions.emBoxBottom,
      measureLineGap(1),
      viewBox.width - measureLineGap(3)
    ),
    descender: getLineConfig(
      yPositions.descender,
      measureLineGap(4),
      viewBox.width - measureLineGap(2)
    ),
    lineBoxBottom: getLineConfig(yPositions.lineBoxBottom, 0, viewBox.width),
  };

  /**
   * Vertical measurement line configurations
   * Shows dimensions between metric lines with annotated measurements
   */
  const measureLines = {
    /** Line box total height measurement */
    lineBox: {
      x: 0,
      y1: yPositions.lineBoxTop + 25,
      y2: yPositions.lineBoxBottom - 25,
    },
    /** Em box height measurement */
    emBox: {
      x: measureLineGap(1),
      y1: yPositions.emBoxTop + 25,
      y2: yPositions.emBoxBottom - 25,
    },
    /** Cap height measurement (baseline to cap height) */
    capHeight: {
      x: measureLineGap(2),
      y1: yPositions.capHeight + 25,
      y2: yPositions.baseline - 25,
    },
    /** X-height measurement (baseline to x-height) */
    xHeight: {
      x: measureLineGap(3),
      y1: yPositions.xHeight + 25,
      y2: yPositions.baseline - 25,
    },
    /** Ascender measurement (baseline to ascender) */
    ascender: {
      x: viewBox.width - measureLineGap(2),
      y1: yPositions.ascender + 25,
      y2: yPositions.baseline - 25,
    },
    /** Descender measurement (baseline to descender) */
    descender: {
      x: viewBox.width - measureLineGap(2),
      y1: yPositions.baseline + 25,
      y2: yPositions.descender - 25,
    },
    /** Top trim measurement (line box top to cap height) */
    topTrim: {
      x: viewBox.width,
      y1: yPositions.lineBoxTop + 25,
      y2: yPositions.capHeight - 25,
    },
    /** Bottom trim measurement (baseline to line box bottom) */
    bottomTrim: {
      x: viewBox.width,
      y1: yPositions.baseline + 25,
      y2: yPositions.lineBoxBottom - 25,
    },
  };

  /**
   * Background rectangle configurations
   * Visual boxes highlighting different metric regions
   */
  const rectangles = {
    /** Full line box (includes leading) */
    lineBox: {
      x: 0,
      y: yPositions.lineBoxTop,
      width: viewBox.width,
      height: viewBox.height,
    },
    /** Em box (excludes leading) */
    emBox: {
      x: measureLineGap(1),
      y: yPositions.emBoxTop,
      width: viewBox.width - measureLineGap(4),
      height: viewBox.height - halfLeading * 2,
    },
    /** Cap height box */
    capHeight: {
      x: measureLineGap(2),
      y: yPositions.capHeight,
      width: viewBox.width - measureLineGap(5),
      height: -yPositions.capHeight,
    },
    /** X-height box */
    xHeight: {
      x: measureLineGap(3),
      y: yPositions.xHeight,
      width: viewBox.width - measureLineGap(6),
      height: -yPositions.xHeight,
    },
    /** Ascender box */
    ascender: {
      x: measureLineGap(4),
      y: yPositions.ascender,
      width: viewBox.width - measureLineGap(6),
      height: -yPositions.ascender,
    },
    /** Descender box (below baseline) */
    descender: {
      x: measureLineGap(4),
      y: yPositions.baseline,
      width: viewBox.width - measureLineGap(6),
      height: yPositions.descender,
    },
    /** Top trim box (line box top to cap height) */
    topTrim: {
      x: measureLineGap(2),
      y: yPositions.lineBoxTop,
      width: viewBox.width - measureLineGap(2),
      height: topTrim,
    },
    /** Bottom trim box (baseline to line box bottom) */
    bottomTrim: {
      x: measureLineGap(2),
      y: yPositions.baseline,
      width: viewBox.width - measureLineGap(2),
      height: bottomTrim,
    },
  };

  return (
    <div ref={elemRef} className={classNames(styles['metrics-visualizer'])}>
      {!hasValidData || !isInitialized ? (
        <div className={classNames(styles['metrics-visualizer__loading'])}>
          <p>Loading font metrics...</p>
        </div>
      ) : (
        <MetricsVisualizerSVG
          viewBox={viewBox}
          lines={lines}
          measureLines={measureLines}
          rectangles={rectangles}
          unitsPerEm={state.unitsPerEm || 0}
          unitsPerRem={visualizerData.unitsPerRem || 0}
          fontFamily={state.loadedFontFamily || 'sans-serif'}
          vizText={visualizerData.vizText}
          kerning={kerning}
          onTextBBoxUpdate={setTextBBox}
        />
      )}
    </div>
  );
};
