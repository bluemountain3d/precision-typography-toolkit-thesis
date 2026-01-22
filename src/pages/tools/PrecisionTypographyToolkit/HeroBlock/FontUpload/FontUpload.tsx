// import { Button } from '@/components/forms/Button';
import { DropZone } from '@/components/forms/DropZone';
import { Flex } from '@/components/layout/Flex';
import { useFontMetrics, prepareFontMetricsState } from '../../context';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { parseFontFile } from '@/utils';

export const FontUpload = () => {
  const { state, dispatch } = useFontMetrics();
  const isTablet = useMediaQuery(queries.isTabletOnly);

  /**
   * Handle font file selection
   */
  const handleFileSelect = async (file: File) => {
    dispatch({ type: 'FONT_UPLOAD_START' });

    try {
      const metrics = await parseFontFile(file);

      // Load font into DOM
      const fontUrl = URL.createObjectURL(file);
      const fontFaceId = `uploaded-font-${Date.now()}`;

      const fontFace = new FontFace(fontFaceId, `url(${fontUrl})`);
      await fontFace.load();
      document.fonts.add(fontFace);

      const fontMetricsState = prepareFontMetricsState(
        file,
        metrics,
        fontFaceId
      );
      dispatch({ type: 'FONT_UPLOAD_SUCCESS', payload: fontMetricsState });

      setTimeout(() => {
        const element = document.getElementById('metrics-visualizer');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to parse font file';
      dispatch({ type: 'FONT_UPLOAD_ERROR', payload: errorMessage });
    }
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      gap="xl"
      marginTop={isTablet ? '3xl' : 'sm'}
    >
      <DropZone
        inputId="font-loader"
        onFileSelect={handleFileSelect}
        isProcessing={state.isLoading}
      />
      {/* <Button variant="primary" href="learn/font-metrics-article">
        Learn about font metrics
      </Button> */}
    </Flex>
  );
};
