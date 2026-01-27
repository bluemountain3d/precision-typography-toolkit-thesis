import Prism from 'prismjs';
/* eslint-disable @typescript-eslint/no-explicit-any */

// Import languages
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';

// Import plugins
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/match-braces/prism-match-braces';

// Import styles
import 'prism-theme-night-owl/build/style.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/toolbar/prism-toolbar.css';

/**
 * Simple brace matching for rainbow coloring
 * Applied via post-processing in the component
 */
const simpleBraces = {
  brace: /[(){}[\]]/,
};

/**
 * String patterns with apostrophe highlighting
 */
const stringPatterns = [
  // Double quotes
  {
    pattern: /"(?:\\.|[^\\"])*"/,
    greedy: true,
    inside: {
      apostrophe: /^"|"$|(?<=\s)"|"(?=\s)/,
    },
  },
  // Single quotes
  {
    pattern: /'(?:\\.|[^\\'])*'/,
    greedy: true,
    inside: {
      apostrophe: /^'|'$|(?<=\s)'|'(?=\s)/,
    },
  },
];

/**
 * Extend CSS language with custom tokens
 */
const extendCSS = () => {
  if (!Prism.languages.css) return;

  (Prism.languages.css as any).punctuation = /[;:,]/;

  Prism.languages.insertBefore('css', 'property', {
    'keyword-value': /(?<=:\s*)(?!['"])[a-z][a-z-]*(?=\s*;)/i,
  });

  (Prism.languages.css as any).number = /-?\b\d+(?:[.,]\d+)?|(?<=[.,])\d+\b/;
  (Prism.languages.css as any).unit = /(?<=\d)[a-z]+/i;

  // Add braces for rainbow coloring
  Object.assign(Prism.languages.css, simpleBraces);

  (Prism.languages.css as any).string = stringPatterns;
};

/**
 * Extend SCSS language with custom tokens
 */
const extendSCSS = () => {
  if (!Prism.languages.scss) return;

  Object.assign(Prism.languages.scss, {
    punctuation: /[;:,]/,
    number: /-?\b\d+(?:[.,]\d+)?|(?<=[.,])\d+\b/,
    unit: {
      pattern: /(?<=\d)[a-z]+/i,
      alias: 'keyword',
    },
    'keyword-value': {
      pattern: /(?<=:\s*)\b(?:italic|oblique|normal)\b/i,
      lookbehind: true,
    },
  });

  // Add braces for rainbow coloring
  Object.assign(Prism.languages.scss, simpleBraces);

  (Prism.languages.scss as any).string = stringPatterns;
};

/**
 * Extend JSON language with custom tokens
 */
const extendJSON = () => {
  if (!Prism.languages.json) return;

  (Prism.languages.json as any).punctuation = /[,:]/;

  // Add braces for rainbow coloring
  Object.assign(Prism.languages.json, simpleBraces);

  (Prism.languages.json as any).string = stringPatterns;
};

/**
 * Apply rainbow brace coloring based on nesting level
 * @param codeElement - The <code> element containing highlighted code
 */
export const applyRainbowBraces = (codeElement: HTMLElement) => {
  const braceTokens = codeElement.querySelectorAll('.token.brace');
  const stack: number[] = [];
  const colors = ['brace-level-1', 'brace-level-2', 'brace-level-3'];

  braceTokens.forEach((token) => {
    const char = token.textContent || '';

    if (/[({[]/.test(char)) {
      // Opening brace - use modulo to cycle through colors
      const level = stack.length % colors.length;
      token.classList.add(colors[level]);
      stack.push(level);
    } else if (/[)\]}]/.test(char)) {
      // Closing brace
      const level = stack.length > 0 ? stack.length - 1 : 0;
      token.classList.add(colors[level % colors.length]);
      stack.pop();
    }
  });
};

/**
 * Initialize all Prism language extensions
 * Call this once when the module is loaded
 */
export const initializePrismExtensions = () => {
  extendCSS();
  extendSCSS();
  extendJSON();
};

// Auto-initialize when module is imported
initializePrismExtensions();
