import { Button } from '@/components/forms/Button';
import { DropZone } from '@/components/forms/DropZone';
import { Flex } from '@/components/layout/Flex';
import { parseFontFile } from '@/utils';
import { useFontMetrics, prepareFontMetricsState } from '../../context';

export const FontUpload = () => {
  const { state, dispatch } = useFontMetrics();

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
    <Flex direction="column" alignItems="center" gap="xl">
      <DropZone
        inputId="font-loader"
        onFileSelect={handleFileSelect}
        isProcessing={state.isLoading}
      />
      <Button variant="primary" href="learn/font-metrics-article">
        Learn about font metrics
      </Button>
    </Flex>
  );
};
