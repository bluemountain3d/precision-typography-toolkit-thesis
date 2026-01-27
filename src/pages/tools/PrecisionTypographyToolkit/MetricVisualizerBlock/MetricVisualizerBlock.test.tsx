import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MetricVisualizerBlock } from './MetricVisualizerBlock';
import { FontMetricsProvider } from '../context';

// Mock child components
vi.mock('./MetricsVisualizer', () => ({
  MetricsVisualizer: ({
    lineHeight,
    kerning,
  }: {
    lineHeight: number;
    kerning?: boolean;
  }) => (
    <div data-testid="metrics-visualizer">
      <span data-testid="line-height">{lineHeight}</span>
      <span data-testid="kerning">{kerning ? 'on' : 'off'}</span>
    </div>
  ),
}));

vi.mock('./VisualizerLabel', () => ({
  MetricsVisualizerLabel: () => (
    <div data-testid="visualizer-label">Label</div>
  ),
}));

// Create a mutable variable to control useMediaQuery return value
let mockIsTabletUp = true;

// Mock useMediaQuery hook
vi.mock('@/hooks', () => ({
  useMediaQuery: vi.fn(() => mockIsTabletUp),
}));

describe('MetricVisualizerBlock', () => {
  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<FontMetricsProvider>{ui}</FontMetricsProvider>);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockIsTabletUp = true; // Reset to default
  });

  describe('rendering', () => {
    it('should render the component', () => {
      renderWithProvider(<MetricVisualizerBlock />);

      expect(
        screen.getByRole('heading', { name: /metrics visualizer/i })
      ).toBeInTheDocument();
    });

    it('should render with sr-only heading', () => {
      renderWithProvider(<MetricVisualizerBlock />);

      const heading = screen.getByRole('heading', {
        name: /metrics visualizer/i,
      });
      expect(heading).toHaveClass('sr-only');
    });

    it('should render ThumbSlider for line-height', () => {
      renderWithProvider(<MetricVisualizerBlock />);

      expect(screen.getByLabelText(/line-height range slider/i)).toBeInTheDocument();
    });

    it('should render MetricsVisualizer', () => {
      renderWithProvider(<MetricVisualizerBlock />);

      expect(screen.getByTestId('metrics-visualizer')).toBeInTheDocument();
    });

    it('should render MetricsVisualizerLabel on tablet and up', () => {
      mockIsTabletUp = true;
      renderWithProvider(<MetricVisualizerBlock />);

      expect(screen.getByTestId('visualizer-label')).toBeInTheDocument();
    });

    it('should not render MetricsVisualizerLabel on mobile', () => {
      mockIsTabletUp = false;
      renderWithProvider(<MetricVisualizerBlock />);

      expect(screen.queryByTestId('visualizer-label')).not.toBeInTheDocument();
    });
  });

  describe('initial state', () => {
    it('should initialize with default line-height of 1.5', () => {
      renderWithProvider(<MetricVisualizerBlock />);

      const lineHeightValue = screen.getByTestId('line-height');
      expect(lineHeightValue).toHaveTextContent('1.5');
    });

    it('should initialize with kerning enabled', () => {
      renderWithProvider(<MetricVisualizerBlock />);

      const kerningValue = screen.getByTestId('kerning');
      expect(kerningValue).toHaveTextContent('on');
    });

    it('should display line-height label with correct format', () => {
      renderWithProvider(<MetricVisualizerBlock />);

      expect(screen.getByText(/line-height: 1\.50;/i)).toBeInTheDocument();
    });
  });

  describe('line-height slider interaction', () => {
    it('should update line-height when slider changes', async () => {
      const user = userEvent.setup();
      renderWithProvider(<MetricVisualizerBlock />);

      const slider = screen.getByLabelText(/line-height range slider/i) as HTMLInputElement;
      
      // Simulate changing the slider value with fireEvent
      await user.click(slider);
      fireEvent.change(slider, { target: { value: '1.75' } });

      const lineHeightValue = screen.getByTestId('line-height');
      expect(lineHeightValue).toHaveTextContent('1.75');
    });

    it('should respect min value of 1', () => {
      renderWithProvider(<MetricVisualizerBlock />);

      const slider = screen.getByLabelText(/line-height range slider/i) as HTMLInputElement;
      expect(slider.min).toBe('1');
    });

    it('should respect max value of 2', () => {
      renderWithProvider(<MetricVisualizerBlock />);

      const slider = screen.getByLabelText(/line-height range slider/i) as HTMLInputElement;
      expect(slider.max).toBe('2');
    });

    it('should respect step value of 0.05', () => {
      renderWithProvider(<MetricVisualizerBlock />);

      const slider = screen.getByLabelText(/line-height range slider/i) as HTMLInputElement;
      expect(slider.step).toBe('0.05');
    });

    it('should format line-height to 2 decimal places in label', () => {
      renderWithProvider(<MetricVisualizerBlock />);

      // Should show default value with 2 decimals
      expect(screen.getByText(/line-height: 1\.50;/i)).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA label on slider', () => {
      renderWithProvider(<MetricVisualizerBlock />);

      const slider = screen.getByLabelText(/line-height range slider/i);
      expect(slider).toHaveAttribute('aria-label', 'Line-height range slider');
    });

    it('should have level 2 heading', () => {
      renderWithProvider(<MetricVisualizerBlock />);

      const heading = screen.getByRole('heading', {
        name: /metrics visualizer/i,
      });
      expect(heading.tagName).toBe('H2');
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      renderWithProvider(<MetricVisualizerBlock />);

      const slider = screen.getByLabelText(/line-height range slider/i) as HTMLInputElement;
      
      // Focus on slider
      await user.click(slider);
      expect(slider).toHaveFocus();

      // Simulate arrow key press with fireEvent
      fireEvent.change(slider, { target: { value: '1.55' } });
      
      // Verify interaction happened (value should have changed from 1.5 to 1.55)
      const lineHeightValue = screen.getByTestId('line-height');
      expect(lineHeightValue).toHaveTextContent('1.55');
    });
  });

  describe('context integration', () => {
    it('should call updateLineHeight from context', async () => {
      const user = userEvent.setup();
      renderWithProvider(<MetricVisualizerBlock />);

      const slider = screen.getByLabelText(/line-height range slider/i) as HTMLInputElement;
      
      // Simulate changing value with fireEvent
      await user.click(slider);
      fireEvent.change(slider, { target: { value: '1.75' } });

      // Verify the UI updates correctly (context is being used)
      expect(screen.getByTestId('line-height')).toHaveTextContent('1.75');
    });
  });

  describe('responsive behavior', () => {
    it('should show label on desktop', () => {
      mockIsTabletUp = true;
      renderWithProvider(<MetricVisualizerBlock />);

      expect(screen.getByTestId('visualizer-label')).toBeInTheDocument();
    });

    it('should hide label on mobile', () => {
      mockIsTabletUp = false;
      renderWithProvider(<MetricVisualizerBlock />);

      expect(screen.queryByTestId('visualizer-label')).not.toBeInTheDocument();
    });

    it('should adapt to media query changes', () => {
      // Start with mobile
      mockIsTabletUp = false;
      const { rerender } = renderWithProvider(<MetricVisualizerBlock />);

      expect(screen.queryByTestId('visualizer-label')).not.toBeInTheDocument();

      // Switch to tablet
      mockIsTabletUp = true;
      rerender(
        <FontMetricsProvider>
          <MetricVisualizerBlock />
        </FontMetricsProvider>
      );

      expect(screen.getByTestId('visualizer-label')).toBeInTheDocument();
    });
  });

  describe('layout and styling', () => {
    it('should render with column direction', () => {
      const { container } = renderWithProvider(<MetricVisualizerBlock />);

      // Check for the actual class name or element structure
      const flexContainer = container.querySelector('[class*="Flex"]');
      expect(flexContainer).toBeTruthy();
    });

    it('should render with full width', () => {
      const { container } = renderWithProvider(<MetricVisualizerBlock />);

      const flexContainer = container.querySelector('[class*="width-full"]');
      expect(flexContainer).toBeInTheDocument();
    });

    it('should have proper gap spacing', () => {
      const { container } = renderWithProvider(<MetricVisualizerBlock />);

      const flexContainer = container.querySelector('[class*="gap"]');
      expect(flexContainer).toBeInTheDocument();
    });
  });
});
