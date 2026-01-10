import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useFontMetrics } from '../../context';
import styles from './MetricsOutput.module.scss';
import classNames from 'clsx';
import Prism from 'prismjs';

// Import languages
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';

// Import plugins
import 'prismjs/plugins/line-numbers/prism-line-numbers';
// import 'prismjs/plugins/toolbar/prism-toolbar';
// import 'prismjs/plugins/show-language/prism-show-language';
// import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/match-braces/prism-match-braces';

// Import styles
// import 'prismjs/themes/prism-okaidia.css';
import 'prism-theme-night-owl/build/style.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/toolbar/prism-toolbar.css';

interface MetricsOutputProps {
  lang: string;
}

export interface MetricsOutputRef {
  getContent: () => string;
}

export const MetricsOutput = forwardRef<MetricsOutputRef, MetricsOutputProps>(
  ({ lang }, ref) => {
    const codeRef = useRef<HTMLElement>(null);
    const { state } = useFontMetrics();

  const slug = state.fontSlug || '';
  const isVF = ['vf', 'variable'].some((word) =>
    state.fontFamily?.toLowerCase().includes(word)
  );
  const family = isVF
    ? state.fontFamily
        ?.toLowerCase()
        .replace(/[-._]?(vf|variable)$/i, '')
        .trim() || ''
    : state.fontFamily || '';
  const isItalic = state.subFamily?.toLowerCase().match(/italic|oblique/)
    ? '-italic'
    : null;
  const weightName =
    state.subFamily
      ?.toLowerCase()
      .replace(/italic|oblique/g, '')
      .trim()
      .replace(/\s+/g, '-') || 'regular';
  const fontFamily = `"${family}", "${family} VF"${state.category ? `, ${state.category}` : ''}`;
  const style = isItalic ? 'italic' : 'normal';

  const outputs = {
    css: `:root {
  /* Font identification */
  --family-${slug}: ${fontFamily};
