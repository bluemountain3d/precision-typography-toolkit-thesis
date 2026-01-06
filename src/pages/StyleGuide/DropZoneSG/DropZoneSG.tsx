import { DropZone } from '@/components/forms/DropZone';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/typography/Heading';
import {
  useFontMetrics,
  prepareFontMetricsState,
} from '@/pages/tools/PrecisionTypographyToolkit/context';
import { parseFontFile } from '@/utils';

export const DropZoneSG = () => {
  const { state, dispatch } = useFontMetrics();

  /**
   * Handle font file selection
   */
  const handleFileSelect = async (file: File) => {
    dispatch({ type: 'FONT_UPLOAD_START' });

    try {
      const metrics = await parseFontFile(file);
      
      // Generate unique font-family ID for CSS
      const loadedFontFamily = `uploaded-font-${Date.now()}`;
      
      const fontMetricsState = prepareFontMetricsState(file, metrics, loadedFontFamily);
      dispatch({ type: 'FONT_UPLOAD_SUCCESS', payload: fontMetricsState });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to parse font file';
      dispatch({ type: 'FONT_UPLOAD_ERROR', payload: errorMessage });
    }
  };

  return (
    <Container variant="boxed">
      <Heading level={2} size="heading-2" marginBottom="2xl">
        DropZone:
      </Heading>
      <DropZone
        inputId="font-drop"
        onFileSelect={handleFileSelect}
        isProcessing={state.isLoading}
      />
    </Container>
  );
};
