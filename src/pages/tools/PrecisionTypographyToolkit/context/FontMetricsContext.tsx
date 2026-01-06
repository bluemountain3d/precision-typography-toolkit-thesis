import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type {
  FontMetricsState,
  FontMetricsAction,
} from './FontMetricsContext.types';
import { initialFontMetricsState } from './FontMetricsContext.types';
import { fontMetricsReducer, prepareFontMetricsState } from './fontMetricsReducer';
import { getItem, removeLocalStorage } from '@/utils/localStorage';
import { parseFontFile } from '@/utils/fontParser';

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
      
      // Om saved state finns men saknar fontFile, rensa localStorage
      if (saved && !saved.fontFile) {
        removeLocalStorage('fontMetrics');
        return initial;
      }
      
      return saved ? { ...saved, fontFile: null } : initial;
    }
  );

  // Ladda default font när komponenten mountar om ingen font finns
  useEffect(() => {
    const loadDefaultFont = async () => {
      if (!state.fontFamily && !state.isLoading) {
        try {
          dispatch({ type: 'FONT_UPLOAD_START' });

          // Hämta Cormorant Garamond från public/fonts
          const fontUrl = '/fonts/CormorantGaramond-Variable-VariableFont_wght-300-700-Italic_subset-balanced-web.woff2';
          const response = await fetch(fontUrl);
          const blob = await response.blob();
          const file = new File([blob], 'CormorantGaramond-VF.woff2', {
            type: 'font/woff2',
          });

          // Parse font metrics
          const metrics = await parseFontFile(file);

          // Ladda fonten (använd CSS font-family namnet)
          const fontFaceId = 'Cormorant Garamond';
          const fontFace = new FontFace(fontFaceId, `url(${fontUrl})`);
          await fontFace.load();
          document.fonts.add(fontFace);

          const fontMetricsState = prepareFontMetricsState(
            file,
            metrics,
            fontFaceId
          );
          dispatch({ type: 'FONT_UPLOAD_SUCCESS', payload: fontMetricsState });
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
  }, []); // Kör bara en gång vid mount

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
