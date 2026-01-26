import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react';
import type {
  FontMetricsState,
  FontMetricsAction,
} from './FontMetricsContext.types';
import { initialFontMetricsState } from './FontMetricsContext.types';
import {
  fontMetricsReducer,
  prepareFontMetricsState,
} from './fontMetricsReducer';
import { getItem, removeLocalStorage } from '@/utils/localStorage';
import { parseFontFile } from '@/utils/fontParser';
import cormorantData from '@assets/fonts/CormorantGaramondRegular.woff2?url';

/**
 * Font metrics context value
 */
type FontMetricsContextValue = {
  state: FontMetricsState;
  dispatch: React.Dispatch<FontMetricsAction>;
  resetFont: () => void;
  setSelectedMetric: (metricId: string | null) => void;
  updateLineHeight: (lineHeight: number) => void;
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
 * Automatically loads default font (Cormorant Garamond) on mount if no saved state exists.
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

      // If saved state exists but lacks fontFile, clear localStorage
      if (saved && !saved.fontFile) {
        removeLocalStorage('fontMetrics');
        return initial;
      }

      return saved ? { ...saved, fontFile: null } : initial;
    }
  );

  const setSelectedMetric = (metricId: string | null) => {
    dispatch({ type: 'SET_SELECTED_METRIC', payload: metricId });
  };

  // const updateLineHeightMultiplier = (lineHeight: number) => {
  //   dispatch({ type: 'UPDATE_LINE_HEIGHT_MULTIPLIER', payload: lineHeight });
  // }

  const updateLineHeight = (lineHeight: number) => {
    dispatch({ type: 'UPDATE_LINE_HEIGHT', payload: lineHeight });
  };

  const resetFont = () => {
    dispatch({ type: 'RESET_FONT' });
    removeLocalStorage('fontMetrics');
  };

  // Load default font when component mounts or when font is cleared
  useEffect(() => {
    const loadDefaultFont = async () => {

      if (!state.fontFamily && !state.isLoading) {
        try {
          dispatch({ type: 'FONT_UPLOAD_START' });

          const response = await fetch(cormorantData);

          const blob = await response.blob();

          const file = new File([blob], 'CormorantGaramond.woff2', {
            type: 'font/woff2',
          });

          const metrics = await parseFontFile(file);

          const fontUrl = URL.createObjectURL(blob);

          const fontFaceId = 'Cormorant Garamond';
          const fontFace = new FontFace(fontFaceId, `url(${fontUrl})`, {
            style: 'normal',
            weight: '400',
          });

          await fontFace.load();

          document.fonts.add(fontFace);

          const fontMetricsState = prepareFontMetricsState(
            file,
            metrics,
            fontFaceId
          );

          dispatch({ type: 'FONT_UPLOAD_SUCCESS', payload: fontMetricsState });

          URL.revokeObjectURL(fontUrl);
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : 'Failed to load default font';
          dispatch({ type: 'FONT_UPLOAD_ERROR', payload: errorMessage });
        }
      }
    };

    loadDefaultFont();
  }, [state.fontFamily]); // Run when fontFamily or isLoading changes

  return (
    <FontMetricsContext.Provider
      value={{
        state,
        dispatch,
        resetFont,
        setSelectedMetric,
        updateLineHeight,
      }}
    >
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
