/**
 * @fileoverview Metrics Output - Syntax-highlighted code display for font metrics
 *
 * This component renders font metrics in three different code formats (CSS, SCSS, JSON)
 * with syntax highlighting via Prism.js. It uses forwardRef to expose a method for
 * retrieving the current code content for clipboard operations.
 *
 * Features:
 * - Dynamic code generation from font metrics context
 * - Syntax highlighting with Night Owl theme
 * - Rainbow brace colorization for better readability
 * - Line numbers for reference
 * - Intelligent font name processing (removes VF/Variable suffixes)
 * - Support for italic/oblique variants and weight names
 * - Exposes getContent() method via ref for parent access
 *
 * @module MetricsOutput
 * @see {@link ExportMetricsBlock} for parent container implementation
 * @see {@link useFontMetrics} for font data source
 */

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useFontMetrics } from '../../context';
import styles from './MetricsOutput.module.scss';
import classNames from 'clsx';
import Prism from 'prismjs';
import { applyRainbowBraces } from '@/utils/prism';

// Import Prism styles (must be in component for proper loading)
import 'prism-theme-night-owl/build/style.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/toolbar/prism-toolbar.css';

/**
 * Props for the MetricsOutput component
 *
 * @interface MetricsOutputProps
 * @property {string} lang - The output language format ('css', 'scss', or 'json')
 */
interface MetricsOutputProps {
  lang: string;
}

/**
 * Ref interface exposing methods to parent components
 *
 * @interface MetricsOutputRef
 * @property {() => string} getContent - Returns the current formatted code as a string
 */
export interface MetricsOutputRef {
  getContent: () => string;
}

/**
 * Metrics Output Component
 *
 * Displays font metrics in a syntax-highlighted code block. Supports three output
 * formats (CSS Variables, SCSS Map, JSON Object) and applies Prism.js highlighting
 * with rainbow braces for enhanced readability.
 *
 * @component
 * @example
 * ```tsx
 * const outputRef = useRef<MetricsOutputRef>(null);
 *
 * // Get content via ref
 * const content = outputRef.current?.getContent();
 *
 * <MetricsOutput ref={outputRef} lang="css" />
 * ```
 *
 * Output Formats:
 *
 * **CSS Variables**
 * - Custom properties prefixed with font slug
 * - Organized in logical groups (identification, raw metrics, normalized metrics, trim)
 * - Includes inline comments for clarity
 *
 * **SCSS Map**
 * - Nested map structure for programmatic access
 * - Font family as top-level key
 * - Grouped metrics for mixins/functions
 *
 * **JSON Object**
 * - Standard JSON format for API/data exchange
 * - Hierarchical structure with clear namespacing
 * - Easy to parse and integrate
 *
 * @param {MetricsOutputProps} props - Component props
 * @param {React.Ref<MetricsOutputRef>} ref - Forwarded ref for parent access
 * @returns {JSX.Element} Syntax-highlighted code block
 */
export const MetricsOutput = forwardRef<MetricsOutputRef, MetricsOutputProps>(
  ({ lang }, ref) => {
    /**
     * Reference to the <code> element for Prism highlighting
     */
    const codeRef = useRef<HTMLElement>(null);

    /**
     * Font metrics context containing all measurement data
     */
    const { state } = useFontMetrics();

    /**
     * Font slug for CSS variable naming (e.g., 'inter-vf')
     */
    const slug = state.fontSlug || '';

    /**
     * Checks if font is a variable font (contains 'vf' or 'variable' in name)
     */
    const isVF = ['vf', 'variable'].some((word) =>
      state.fontFamily?.toLowerCase().includes(word)
    );

    /**
     * Clean font family name with VF/Variable suffix removed if applicable
     * @example
     * "Inter VF" → "inter"
     * "Roboto Variable" → "roboto"
     * "Helvetica" → "helvetica"
     */
    const family = isVF
      ? state.fontFamily
          ?.toLowerCase()
          .replace(/[-._]?(vf|variable)$/i, '')
          .trim() || ''
      : state.fontFamily || '';

    /**
     * Italic/oblique suffix for variable naming
     * @example "-italic" or null
     */
    // const isItalic = state.subFamily?.toLowerCase().match(/italic|oblique/)
    //   ? '-italic'
    //   : null;

    /**
     * Weight name derived from subfamily (e.g., 'bold', 'light', 'semi-bold')
     * Removes italic/oblique designations and normalizes spacing
     * @example
     * "Bold Italic" → "bold"
     * "Semi Bold" → "semi-bold"
     * "Regular" → "regular"
     */
    // const weightName =
    //   state.subFamily
    //     ?.toLowerCase()
    //     .replace(/italic|oblique/g, '')
    //     .trim()
    //     .replace(/\s+/g, '-') || 'regular';

    /**
     * Complete font-family declaration with fallbacks
     * Includes both standard and VF variants plus generic category
     * @example
     * "Inter", "Inter VF", sans-serif
     */
    const fontFamily = `"${family}", "${family} VF"${state.category ? `, ${state.category}` : ''}`;

    /**
     * Formatted code outputs for each supported language
     *
     * Each format includes:
     * - Font identification (family string with fallbacks)
     * - Raw metrics (unitsPerEm, capHeight, trim values)
     * - Normalized metrics (em-based ratios for use in CSS)
     * - Trim adjustments (vertical and horizontal corrections)
     */
    const outputs = {
      css: `:root {
  /* Font identification */
  --family--${slug}: ${fontFamily};
  
  /* Base raw metrics (for reference/calculations) */
  --metric-units-per-em--${slug}: ${state.unitsPerEm};
  --metric-cap-height--${slug}: ${state.capHeight};
  --metric-trim-top--${slug}: ${state.topTrimRaw};
  --metric-trim-bottom--${slug}: ${state.bottomTrimRaw};
  
  /* Normalized ratio metrics (em units) */
  --avg-char-width--${slug}: ${state.avgCharWidthRatio}em;
  --cap-height--${slug}: ${state.capHeightRatio}em;
  --x-height--${slug}: ${state.xHeightRatio}em;
  --ascender--${slug}: ${state.hheaAscenderRatio}em;
  --descender--${slug}: ${Math.abs(state.hheaDescenderRatio || 0)}em;
  
  /* Text-box-trim ratios (vertical trim) */
  --top-trim--${slug}: calc(-${state.topTrimRawRatio}em - ((1lh - 1em) * 0.5));
  --bottom-trim--${slug}: calc(-${state.bottomTrimRawRatio}em - ((1lh - 1em) * 0.5));
  
  /* Side bearing adjustments (horizontal trim) */
  --lsb-adjust--${slug}: -${state.lsbAdjustRatio}em;
  --rsb-adjust--${slug}: -${state.rsbAdjustRatio}em;
}`,
      scss: `$font-metrics: (
  "${family}": (
    // Font identification 
    "family": '${fontFamily}',

    // Raw metrics
    "metric-units-per-em": ${state.unitsPerEm},
    "metric-cap-height": ${state.capHeight},
    "metric-trim-top": ${state.topTrimRaw},
    "metric-trim-bottom": ${state.bottomTrimRaw},
    
    // Normalized metrics
    "cap-height": ${state.capHeightRatio},
    "x-height": ${state.xHeightRatio},
    "ascender": ${state.hheaAscenderRatio},
    "descender": ${Math.abs(state.hheaDescenderRatio || 0)},

    // Vertical trim
    "top-trim": ${state.topTrimRawRatio},
    "bottom-trim": ${state.bottomTrimRawRatio},

    // Horizontal adjust
    "lsb-adjust": -${state.lsbAdjustRatio},
    "rsb-adjust": -${state.rsbAdjustRatio},
  ),
);`,
      json: `{
  "font-metrics": {
    "${family}": {
      "identification": {
        "family": "${fontFamily.replace(/"/g, '\\"')}"
      },
      "raw-metrics": {
        "units-per-em": ${state.unitsPerEm},
        "metric-cap-height": ${state.capHeight},
        "metric-trim-top": ${state.topTrimRaw},
        "metric-trim-bottom": ${state.bottomTrimRaw}
      },
      "normalized-metrics": {
        "cap-height": ${state.capHeightRatio},
        "x-height": ${state.xHeightRatio},
        "ascender": ${state.hheaAscenderRatio},
        "descender": ${Math.abs(state.hheaDescenderRatio || 0)}
      },
      "trim-adjustments": {
        "top-trim": ${state.topTrimRawRatio},
        "bottom-trim": ${state.bottomTrimRawRatio},
        "lsb-adjust": -${state.lsbAdjustRatio},
        "rsb-adjust": -${state.rsbAdjustRatio}
      }
    }
  }
}`,
    };

    /**
     * Exposes getContent method to parent component via ref
     *
     * Allows parent (ExportMetricsBlock) to retrieve the current formatted code
     * for clipboard operations without prop drilling or complex state management.
     *
     * @example
     * ```tsx
     * // Parent component
     * const content = outputRef.current?.getContent();
     * await navigator.clipboard.writeText(content);
     * ```
     */
    useImperativeHandle(ref, () => ({
      getContent: () => outputs[lang as keyof typeof outputs],
    }));

    /**
     * Re-applies Prism syntax highlighting when language or content changes
     *
     * Runs after every render when lang or outputs change. This ensures:
     * 1. Proper syntax highlighting for the selected language
     * 2. Rainbow brace colorization is applied
     * 3. Theme and line numbers are correctly rendered
     *
     * Dependencies:
     * - lang: Triggers re-highlight when format changes
     * - outputs: Triggers re-highlight when metrics update
     */
    useEffect(() => {
      if (codeRef.current) {
        Prism.highlightElement(codeRef.current);
        applyRainbowBraces(codeRef.current);
      }
    }, [lang, outputs]);

    return (
      <div className={classNames(styles['metrics-output'])}>
        <h3 className="sr-only">
          {lang === 'css'
            ? 'CSS Variables'
            : lang === 'scss'
              ? 'SCSS Map'
              : 'JSON Object'}
        </h3>
        <pre
          id="metrics-output-panel"
          role="tabpanel"
          aria-labelledby={`tab-${lang}`}
          className="line-numbers"
        >
          <code ref={codeRef} className={`language-${lang}`}>
            {outputs[lang as keyof typeof outputs]}
          </code>
        </pre>
      </div>
    );
  }
);

/**
 * Display name for React DevTools and debugging
 * Required when using forwardRef to maintain component name visibility
 */
MetricsOutput.displayName = 'MetricsOutput';
