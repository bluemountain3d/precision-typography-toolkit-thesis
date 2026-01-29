/**
 * @fileoverview Export Metrics Block - Code export interface for font metrics
 *
 * This component provides a tabbed interface for viewing and copying font metrics
 * in different formats (CSS, SCSS, JSON). It manages language selection, clipboard
 * operations, and responsive layout adjustments.
 *
 * Features:
 * - Three export formats: CSS Variables, SCSS Map, and JSON Object
 * - Copy to clipboard functionality with visual feedback
 * - Responsive button layout (icon-only on mobile, full labels on desktop)
 * - Integration with syntax-highlighted code viewer
 * - Collapsible container for better space management
 *
 * @module ExportMetricsBlock
 * @see {@link MetricsOutput} for the code rendering implementation
 */

import styles from './ExportMetricsBlock.module.scss';
import classNames from 'clsx';

import { CopyIcon, CssIcon, JsonIcon, SassIcon } from '@/assets/icons';
import { Button } from '@/components/forms/Button';
import { ButtonGroup } from '@/components/layout/ButtonGroup';
import { Flex } from '@/components/layout/Flex';
import { Collapsible } from '@/components/ui/Collapsible';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { useRef, useState } from 'react';
import { MetricsOutput, type MetricsOutputRef } from './MetricsOutput';

/**
 * Export Metrics Block Component
 *
 * A collapsible section that allows users to view and export font metrics in
 * multiple code formats. Provides tabbed navigation between CSS, SCSS, and JSON
 * outputs with integrated copy-to-clipboard functionality.
 *
 * @component
 * @example
 * ```tsx
 * <ExportMetricsBlock />
 * ```
 *
 * Component Structure:
 * ```
 * Collapsible
 * └── Flex (Navigation)
 *     ├── ButtonGroup (Language Tabs)
 *     │   ├── CSS Variables Button
 *     │   ├── SCSS Map Button
 *     │   └── JSON Object Button
 *     └── Copy Button
 * └── MetricsOutput (Code Display)
 * ```
 *
 * @returns {JSX.Element} The export metrics block interface
 */
export const ExportMetricsBlock = () => {
  /**
   * Currently selected export language/format
   * @default 'css'
   */
  const [activeLang, setActiveLang] = useState('css');

  /**
   * Set a11y announce message
   */
  const [announceMessage, setAnnounceMessage] = useState('');

  /**
   * Clipboard copy success state for user feedback
   * @default false
   */
  const [isCopied, setIsCopied] = useState(false);
  const [copyAnnouncement, setCopyAnnouncement] = useState('');

  /**
   * Reference to MetricsOutput component for accessing code content
   */
  const outputRef = useRef<MetricsOutputRef>(null);

  /**
   * Media query: Mobile/tablet view (up to tablet breakpoint)
   * Used to show icon-only buttons on smaller screens
   */
  const isMobile = useMediaQuery(queries.isUpToTablet);

  /**
   * Media query: Desktop view (tablet-large and up)
   * Used to show full button labels with icons
   */
  const isDesktop = useMediaQuery(queries.isTabletLargeAndUp);

  /**
   * Handles language tab selection
   *
   * Updates the active language and resets the copy feedback state to ensure
   * the "Copied!" message doesn't persist when switching between formats.
   *
   * @param {string} lang - The selected language ('css', 'scss', or 'json')
   */
  const handleLanguageSelect = (lang: string) => {
    setActiveLang(lang);
    setIsCopied(false);

    // Announce language change
    const langName =
      lang === 'css'
        ? 'CSS Variables'
        : lang === 'scss'
          ? 'SCSS Map'
          : 'JSON Object';
    setAnnounceMessage(`Now displaying ${langName}`);
    setTimeout(() => setAnnounceMessage(''), 1000);
  };

  /**
   * Copies the current code output to clipboard
   *
   * Retrieves the formatted code from the MetricsOutput component via ref and
   * copies it to the system clipboard. Shows success feedback for 1.5 seconds.
   *
   * @async
   * @throws {Error} Logs to console if clipboard API fails
   *
   * @example
   * // User clicks "Copy to clipboard" button
   * // → Copies CSS/SCSS/JSON code
   * // → Shows "Copied!" for 1500ms
   * // → Reverts to "Copy to clipboard"
   */
  const handleCopyToClipboard = async () => {
    try {
      const content = outputRef.current?.getContent();
      if (content) {
        await navigator.clipboard.writeText(content);
        setIsCopied(true);

        // Copied announcement
        const langName = activeLang.toUpperCase();
        setCopyAnnouncement(`${langName} snippet copied to clipboard`);

        setTimeout(() => {
          setIsCopied(false);
          setCopyAnnouncement('');
        }, 1500);
      }
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      setCopyAnnouncement('Failed to copy to clipboard');
      setTimeout(() => setCopyAnnouncement(''), 2000);
    }
  };

  return (
    <>
      <Collapsible
        headingLevel={2}
        headingSize="heading-3"
        title="Export Metrics"
        className={classNames(styles['export-metrics'])}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          marginBottom="xs"
          style={{ flexShrink: 0 }}
          className={classNames(styles['export-metrics__navigation'])}
        >
          <ButtonGroup
            align="left"
            gap={isMobile ? 'xs' : '3xs'}
            role="tablist"
            aria-label="Export format selector"
          >
            <Button
              variant={activeLang === 'css' ? 'primary' : 'ghost'}
              icon={CssIcon}
              iconOnly={isMobile}
              narrow
              onClick={() => handleLanguageSelect('css')}
              role="tab"
              aria-selected={activeLang === 'css'}
              aria-controls="metrics-output-panel"
              id="tab-css"
              aria-label="Display CSS variables"
            >
              CSS Variables
            </Button>
            <Button
              variant={activeLang === 'scss' ? 'primary' : 'ghost'}
              icon={SassIcon}
              iconOnly={isMobile}
              narrow
              onClick={() => handleLanguageSelect('scss')}
              role="tab"
              aria-selected={activeLang === 'scss'}
              aria-controls="metrics-output-panel"
              id="tab-scss"
              aria-label="Display SCSS map"
            >
              SCSS Map
            </Button>
            <Button
              variant={activeLang === 'json' ? 'primary' : 'ghost'}
              icon={JsonIcon}
              iconOnly={isMobile}
              narrow
              onClick={() => handleLanguageSelect('json')}
              role="tab"
              aria-selected={activeLang === 'json'}
              aria-controls="metrics-output-panel"
              id="tab-json"
              aria-label="Display JSON object"
            >
              JSON Object
            </Button>
          </ButtonGroup>
          <Button
            variant="ghost"
            size="sm"
            icon={!isDesktop ? CopyIcon : undefined}
            iconOnly={!isDesktop}
            onClick={handleCopyToClipboard}
            aria-label={
              isCopied
                ? 'Snippet copied'
                : `Copy ${activeLang} snippet to clipboard`
            }
          >
            {isCopied ? 'Copied!' : 'Copy to clipboard'}
          </Button>
        </Flex>
        <div role="status" aria-live="polite" className="sr-only">
          {announceMessage}
        </div>
        <div role="status" aria-live="polite" className="sr-only">
          {copyAnnouncement}
        </div>
        <MetricsOutput ref={outputRef} lang={activeLang} />
      </Collapsible>
    </>
  );
};
