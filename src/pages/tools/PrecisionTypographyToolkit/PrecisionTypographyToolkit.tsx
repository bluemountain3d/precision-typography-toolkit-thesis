import { DropZone } from '@/components/forms/DropZone';
import { Container } from '@components/layout/Container';
import {
  FontMetricsProvider,
  useFontMetrics,
  prepareFontMetricsState,
} from './context';
import { parseFontFile } from '@/utils/fontParser';
import { MetricTable } from './MetricTable';
import { useMediaQuery } from '@/hooks';

/**
 * Inner component that uses the FontMetrics context
 */
const PrecisionTypographyToolkitContent = () => {
  const { state, dispatch } = useFontMetrics();

  const isUnderBreakpoint = useMediaQuery('max-width: 63.00rem');

  /**
   * Handle font file selection
   */
  const handleFileSelect = async (file: File) => {
    dispatch({ type: 'FONT_UPLOAD_START' });

    try {
      const metrics = await parseFontFile(file);
      const fontMetricsState = prepareFontMetricsState(file, metrics);
      dispatch({ type: 'FONT_UPLOAD_SUCCESS', payload: fontMetricsState });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to parse font file';
      dispatch({ type: 'FONT_UPLOAD_ERROR', payload: errorMessage });
    }
  };

  return (
    <>
      <Container variant="boxed">
        <h1>Precision Typography Toolkit</h1>

        <DropZone
          inputId="font-loader"
          onFileSelect={handleFileSelect}
          isProcessing={state.isLoading}
        />

        {/* {state.isLoading && <p>Loading font...</p>} */}

        {/* {state.error && (
        <div style={{ color: 'red' }}>
          <p>Error: {state.error}</p>
        </div>
      )} */}
      </Container>

      <Container variant={isUnderBreakpoint ? 'boxed' : 'narrow'}>
        <MetricTable />
      </Container>
    </>
  );
};

/**
 * Precision Typography Toolkit
 *
 * Main page component wrapped with FontMetricsProvider.
 * Handles font upload, metrics extraction, and visualization.
 */
export const PrecisionTypographyToolkit = () => {
  return (
    <FontMetricsProvider>
      <PrecisionTypographyToolkitContent />
    </FontMetricsProvider>
  );
};
