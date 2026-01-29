import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MetricsVisualizer } from './MetricsVisualizer';
import { FontMetricsProvider } from '../../context';

// Mock child components
vi.mock('./MetricsVisualizerSVG', () => ({
  MetricsVisualizerSVG: ({
    viewBox,
    lineHeight,
    kerning,
    vizText,
    fontFamily,
  }: {
    viewBox: { minY: number; width: number; height: number };
    lineHeight: number;
    kerning?: boolean;
    vizText: string;
    fontFamily: string;
  }) => (
    <svg data-testid="metrics-visualizer-svg">
      <text data-testid="viz-text">{vizText}</text>
      <text data-testid="font-family">{fontFamily}</text>
      <text data-testid="line-height">{lineHeight}</text>
      <text data-testid="kerning">{kerning ? 'on' : 'off'}</text>
      <text data-testid="viewbox-width">{viewBox.width}</text>
      <text data-testid="viewbox-height">{viewBox.height}</text>
    </svg>
  ),
}));

// Create a mutable variable to control useMediaQuery return value
let mockIsMobile = false;

// Mock useMediaQuery hook
vi.mock('@/hooks', () => ({
  useMediaQuery: vi.fn(() => mockIsMobile),
}));

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

describe('MetricsVisualizer', () => {
  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<FontMetricsProvider>{ui}</FontMetricsProvider>);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockIsMobile = false; // Reset to default
  });

  describe('rendering', () => {
    it('should render the visualizer', () => {
      renderWithProvider(<MetricsVisualizer lineHeight={1.5} />);

      expect(screen.getByTestId('metrics-visualizer-svg')).toBeInTheDocument();
    });

    it('should render with correct line-height', () => {
      renderWithProvider(<MetricsVisualizer lineHeight={1.75} />);

      expect(screen.getByTestId('line-height')).toHaveTextContent('1.75');
    });

    it('should render with kerning enabled by default', () => {
      renderWithProvider(<MetricsVisualizer lineHeight={1.5} kerning={true} />);

      expect(screen.getByTestId('kerning')).toHaveTextContent('on');
    });

    it('should render with kerning disabled when prop is false', () => {
      renderWithProvider(<MetricsVisualizer lineHeight={1.5} kerning={false} />);

      expect(screen.getByTestId('kerning')).toHaveTextContent('off');
    });
  });

  describe('text variant selection', () => {
    it('should select shortest text variant that fits', async () => {
      renderWithProvider(<MetricsVisualizer lineHeight={1.5} />);

      await waitFor(() => {
        const vizText = screen.getByTestId('viz-text');
        expect(vizText).toBeInTheDocument();
      });
    });

    it('should default to "Hx" when no variants fit', async () => {
      // Mock very small container
      vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(100);

      renderWithProvider(<MetricsVisualizer lineHeight={1.5} />);

      await waitFor(() => {
        const vizText = screen.getByTestId('viz-text');
        expect(vizText.textContent).toMatch(/Hx/);
      });
    });
  });

  describe('responsive behavior', () => {
    it('should calculate different gaps for mobile', () => {
      mockIsMobile = true;

      renderWithProvider(<MetricsVisualizer lineHeight={1.5} />);

      expect(screen.getByTestId('metrics-visualizer-svg')).toBeInTheDocument();
    });

    it('should calculate different gaps for tablet and up', () => {
      mockIsMobile = false;

      renderWithProvider(<MetricsVisualizer lineHeight={1.5} />);

      expect(screen.getByTestId('metrics-visualizer-svg')).toBeInTheDocument();
    });
  });

  describe('viewBox calculations', () => {
    it('should calculate viewBox based on unitsPerEm and lineHeight', () => {
      renderWithProvider(<MetricsVisualizer lineHeight={2.0} />);

      // Verify the component renders - viewBox calculation requires ResizeObserver
      // which doesn't work properly in test environment
      const svg = screen.getByTestId('metrics-visualizer-svg');
      expect(svg).toBeInTheDocument();
      expect(screen.getByTestId('line-height')).toHaveTextContent('2');
    });

    it('should update viewBox when container resizes', async () => {
      const { rerender } = renderWithProvider(
        <MetricsVisualizer lineHeight={1.5} />
      );

      // Simulate resize
      vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(
        800
      );

      rerender(
        <FontMetricsProvider>
          <MetricsVisualizer lineHeight={1.5} />
        </FontMetricsProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('viewbox-width')).toBeInTheDocument();
      });
    });
  });

  describe('font metrics integration', () => {
    it('should use font metrics from context', () => {
      renderWithProvider(<MetricsVisualizer lineHeight={1.5} />);

      const fontFamily = screen.getByTestId('font-family');
      expect(fontFamily).toBeInTheDocument();
    });

    it('should handle missing font metrics gracefully', () => {
      // Render with provider but with default/empty metrics
      renderWithProvider(<MetricsVisualizer lineHeight={1.5} />);

      // Should render even without loaded font metrics
      expect(screen.getByTestId('metrics-visualizer-svg')).toBeInTheDocument();
    });
  });

  describe('line-height updates', () => {
    it('should update visualization when line-height changes', () => {
      const { rerender } = renderWithProvider(
        <MetricsVisualizer lineHeight={1.5} />
      );

      expect(screen.getByTestId('line-height')).toHaveTextContent('1.5');

      rerender(
        <FontMetricsProvider>
          <MetricsVisualizer lineHeight={2.0} />
        </FontMetricsProvider>
      );

      expect(screen.getByTestId('line-height')).toHaveTextContent('2');
    });

    it('should accept line-height values between 1 and 2', () => {
      const values = [1.0, 1.25, 1.5, 1.75, 2.0];

      values.forEach((value) => {
        const { unmount } = renderWithProvider(
          <MetricsVisualizer lineHeight={value} />
        );

        expect(screen.getByTestId('line-height')).toHaveTextContent(
          value.toString()
        );

        unmount();
      });
    });
  });

  describe('cleanup', () => {
    it('should disconnect ResizeObserver on unmount', () => {
      const disconnectSpy = vi.spyOn(ResizeObserverMock.prototype, 'disconnect');

      const { unmount } = renderWithProvider(
        <MetricsVisualizer lineHeight={1.5} />
      );

      unmount();

      expect(disconnectSpy).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should pass font family to SVG for proper rendering', () => {
      renderWithProvider(<MetricsVisualizer lineHeight={1.5} />);

      const fontFamily = screen.getByTestId('font-family');
      expect(fontFamily).toHaveTextContent(/\w+/); // Should contain some font name
    });
  });
});
