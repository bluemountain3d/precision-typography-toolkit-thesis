/**
 * Development logging utility
 * 
 * Only logs to console in development mode (import.meta.env.DEV)
 * In production builds, these calls become no-ops and get tree-shaken away.
 * 
 * @example
 * ```typescript
 * import { print } from '@/utils/dev';
 * 
 * print('Font loaded:', fontName);
 * print.warn('Large file size:', fileSize);
 * print.error('Parse failed:', error);
 * print.group('Font Metrics');
 * print('Ascender:', ascender);
 * print('Descender:', descender);
 * print.groupEnd();
 * ```
 */

const isDev = import.meta.env.DEV;

/**
 * Log to console (only in development)
 */
export const print = (...args: unknown[]): void => {
  if (isDev) {
    console.log(...args);
  }
};

/**
 * Log warning to console (only in development)
 */
print.warn = (...args: unknown[]): void => {
  if (isDev) {
    console.warn(...args);
  }
};

/**
 * Log error to console (only in development)
 */
print.error = (...args: unknown[]): void => {
  if (isDev) {
    console.error(...args);
  }
};

/**
 * Log info to console (only in development)
 */
print.info = (...args: unknown[]): void => {
  if (isDev) {
    console.info(...args);
  }
};

/**
 * Start a collapsible group (only in development)
 */
print.group = (label?: string): void => {
  if (isDev) {
    console.group(label);
  }
};

/**
 * Start a collapsed group (only in development)
 */
print.groupCollapsed = (label?: string): void => {
  if (isDev) {
    console.groupCollapsed(label);
  }
};

/**
 * End current group (only in development)
 */
print.groupEnd = (): void => {
  if (isDev) {
    console.groupEnd();
  }
};

/**
 * Log table to console (only in development)
 */
print.table = (data: unknown): void => {
  if (isDev) {
    console.table(data);
  }
};

/**
 * Clear console (only in development)
 */
print.clear = (): void => {
  if (isDev) {
    console.clear();
  }
};
