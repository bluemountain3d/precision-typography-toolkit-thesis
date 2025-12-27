import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type {
  FontMetricsState,
  FontMetricsAction,
} from './FontMetricsContext.types';
import { initialFontMetricsState } from './FontMetricsContext.types';
import { fontMetricsReducer } from './fontMetricsReducer';
import { getItem } from '@/utils/localStorage';

/**
 * Font metrics context value
 */
type FontMetricsContextValue = {
  state: FontMetricsState;
  dispatch: React.Dispatch<FontMetricsAction>;
};

/**
 * Font metrics context
 */
const FontMetricsContext = createContext<FontMetricsContextValue | undefined>(
  undefined
);

/**
 * Font metrics provider props
 */
type FontMetricsProviderProps = {
  children: ReactNode;
};

/**
 * Font metrics provider
 *
 * Provides font metrics state and dispatch to child components.
 * Manages font upload, parsing, normalization, and error handling.
 *
 * @example
 * ```tsx
 * <FontMetricsProvider>
 *   <FontUploader />
 *   <MetricsDisplay />
 * </FontMetricsProvider>
 * ```
 */
export const FontMetricsProvider = ({ children }: FontMetricsProviderProps) => {
  const [state, dispatch] = useReducer(
    fontMetricsReducer,
    initialFontMetricsState,
    (initial) => {
      const saved = getItem('fontMetrics');
      return saved ? { ...saved, fontFile: null } : initial;
    }
  );

  return (
    <FontMetricsContext.Provider value={{ state, dispatch }}>
      {children}
    </FontMetricsContext.Provider>
  );
};

/**
 * Hook to access font metrics context
 *
 * @throws {Error} If used outside FontMetricsProvider
 *
 * @example
 * ```tsx
 * const { state, dispatch } = useFontMetrics();
 * ```
 */
export const useFontMetrics = () => {
  const context = useContext(FontMetricsContext);

  if (context === undefined) {
    throw new Error('useFontMetrics must be used within FontMetricsProvider');
  }

  return context;
};
