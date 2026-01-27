import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MetricsVisualizerSVG } from './MetricsVisualizerSVG';
import { FontMetricsProvider } from '../../context';

// Mock child components
vi.mock('./MetricLine', () => ({
  MetricLine: ({ color, label }: { color: string; label?: string }) => (
    <line data-testid={`metric-line-${label}`} stroke={color} />
  ),
}));

vi.mock('./MeasureLine', () => ({
  MeasureLine: ({
    isSelected,
    color,
  }: {
    isSelected: boolean;
    color: string;
  }) => (
    <line
      data-testid="measure-line"
      data-selected={isSelected}
      stroke={color}
    />
  ),
}));

vi.mock('./MetricToggleButton', () => ({
  MetricToggleButton: ({
    metricId,
    isSelected,
    onSelect,
  }: {
    metricId: string;
    isSelected: boolean;
    onSelect: (_id: string) => void;
  }) => (
    <circle
      data-testid={`toggle-button-${metricId}`}
      data-selected={isSelected}
      onClick={() => onSelect(metricId)}
    />
  ),
}));

vi.mock('./AreaRectangle', () => ({
  AreaRectangle: ({
    isSelected,
    color,
  }: {
    isSelected: boolean;
    color: string;
  }) => (
    <rect data-testid="area-rectangle" data-selected={isSelected} fill={color} />
  ),
}));

vi.mock('./VisualizerDefs', () => ({
  VisualizerDefs: () => <defs data-testid="visualizer-defs" />,
}));

// Create a mutable variable to control useMediaQuery return value
let mockIsTabletUp = true;

// Mock useMediaQuery hook
vi.mock('@/hooks', () => ({
  useMediaQuery: vi.fn(() => mockIsTabletUp),
}));

describe('MetricsVisualizerSVG', () => {
  const mockViewBox = {
    minY: -500,
    width: 2000,
    height: 1500,
  };

  const mockLines = {
    lineBoxTop: { x1: 0, x2: 2000, y: -400 },
    ascender: { x1: 0, x2: 2000, y: -300 },
    emBoxTop: { x1: 0, x2: 2000, y: -200 },
    capHeight: { x1: 0, x2: 2000, y: -150 },
    xHeight: { x1: 0, x2: 2000, y: -100 },
    baseline: { x1: 0, x2: 2000, y: 0 },
    emBoxBottom: { x1: 0, x2: 2000, y: 200 },
    descender: { x1: 0, x2: 2000, y: 300 },
    lineBoxBottom: { x1: 0, x2: 2000, y: 400 },
  };

  const mockMeasureLines = {
    lineBox: { x: 100, y1: -400, y2: 400 },
    emBox: { x: 200, y1: -200, y2: 200 },
    capHeight: { x: 300, y1: -150, y2: 0 },
    xHeight: { x: 400, y1: -100, y2: 0 },
    ascender: { x: 500, y1: -300, y2: -200 },
    descender: { x: 600, y1: 200, y2: 300 },
    topTrim: { x: 700, y1: -400, y2: -200, isTransparent: true },
    bottomTrim: { x: 800, y1: 200, y2: 400, isTransparent: true },
    lsbAdjust: { x: 900, y1: -200, y2: 200, noMarkers: true },
    rsbAdjust: { x: 1000, y1: -200, y2: 200, noMarkers: true },
  };

  const mockRectangles = {
    lineBox: { x: 0, y: -400, width: 2000, height: 800 },
    ascender: { x: 0, y: -300, width: 2000, height: 100 },
    emBox: { x: 0, y: -200, width: 2000, height: 400 },
    capHeight: { x: 0, y: -150, width: 2000, height: 150 },
    xHeight: { x: 0, y: -100, width: 2000, height: 100 },
    descender: { x: 0, y: 200, width: 2000, height: 100 },
    topTrim: { x: 0, y: -400, width: 2000, height: 200 },
    bottomTrim: { x: 0, y: 200, width: 2000, height: 200 },
    lsbAdjust: { x: 0, y: -200, width: 100, height: 400 },
    rsbAdjust: { x: 1900, y: -200, width: 100, height: 400 },
  };

  const defaultProps = {
    viewBox: mockViewBox,
    lines: mockLines,
    measureLines: mockMeasureLines,
    rectangles: mockRectangles,
    vizText: 'Ag',
    fontFamily: 'Inter',
    unitsPerEm: 1000,
    unitsPerRem: 16,
    kerning: true,
    lineHeight: 1.5,
  };

  const renderWithProvider = (props = {}) => {
    return render(
      <FontMetricsProvider>
        <MetricsVisualizerSVG {...defaultProps} {...props} />
      </FontMetricsProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockIsTabletUp = true; // Reset to default
  });

  describe('rendering', () => {
    it('should render SVG element', () => {
      renderWithProvider();

      const svg = screen.getByRole('group');
      expect(svg).toBeInTheDocument();
    });

    it('should set correct viewBox', () => {
      renderWithProvider();

      const svg = screen.getByRole('group');
      expect(svg).toHaveAttribute(
        'viewBox',
        `0 ${mockViewBox.minY} ${mockViewBox.width} ${mockViewBox.height}`
      );
    });

    it('should render title and description for accessibility', () => {
      renderWithProvider();

      expect(screen.getByText('Font Metrics Diagram')).toBeInTheDocument();
      expect(
        screen.getByText(/Visual representation of font metrics/i)
      ).toBeInTheDocument();
    });

    it('should have proper aria-label', () => {
      renderWithProvider();

      const svg = screen.getByRole('group');
      expect(svg).toHaveAttribute(
        'aria-label',
        'Font metrics visualization showing Ag with line-height 1.50'
      );
    });
  });

  describe('text rendering', () => {
    it('should render visualization text', () => {
      renderWithProvider();

      expect(screen.getByText('Ag')).toBeInTheDocument();
    });

    it('should apply correct font family', () => {
      renderWithProvider();

      const text = screen.getByText('Ag');
      expect(text).toHaveAttribute('font-family', 'Inter');
    });

    it('should apply correct font size', () => {
      renderWithProvider();

      const text = screen.getByText('Ag');
      expect(text).toHaveAttribute('font-size', '1000');
    });

    it('should center text horizontally', () => {
      renderWithProvider();

      const text = screen.getByText('Ag');
      expect(text).toHaveAttribute('text-anchor', 'middle');
      expect(text).toHaveAttribute('x', '1000'); // viewBox.width / 2
    });

    it('should apply kerning by default', () => {
      renderWithProvider();

      const text = screen.getByText('Ag');
      expect(text).toHaveStyle({ fontFeatureSettings: 'normal' });
    });

    it('should disable kerning when kerning prop is false', () => {
      renderWithProvider({ kerning: false });

      const text = screen.getByText('Ag');
      expect(text).toHaveStyle({ fontFeatureSettings: '"kern" 0' });
    });

    it('should update text when vizText changes', () => {
      const { rerender } = renderWithProvider({ vizText: 'Abc' });

      expect(screen.getByText('Abc')).toBeInTheDocument();

      rerender(
        <FontMetricsProvider>
          <MetricsVisualizerSVG {...defaultProps} vizText="Xyz" />
        </FontMetricsProvider>
      );

      expect(screen.getByText('Xyz')).toBeInTheDocument();
      expect(screen.queryByText('Abc')).not.toBeInTheDocument();
    });
  });

  describe('child components rendering', () => {
    it('should render VisualizerDefs', () => {
      renderWithProvider();

      expect(screen.getByTestId('visualizer-defs')).toBeInTheDocument();
    });

    it('should render area rectangles', () => {
      renderWithProvider();

      const rectangles = screen.getAllByTestId('area-rectangle');
      expect(rectangles).toHaveLength(10);
    });

    it('should render measure lines', () => {
      renderWithProvider();

      const measureLines = screen.getAllByTestId('measure-line');
      expect(measureLines).toHaveLength(10);
    });
  });

  describe('toggle buttons on tablet and up', () => {
    it('should render toggle buttons on tablet and up', () => {
      mockIsTabletUp = true;
      renderWithProvider();

      expect(screen.getByTestId('toggle-button-lineBox')).toBeInTheDocument();
      expect(screen.getByTestId('toggle-button-emBox')).toBeInTheDocument();
      expect(screen.getByTestId('toggle-button-capHeight')).toBeInTheDocument();
    });

    it('should render toggle button for each measure line', () => {
      mockIsTabletUp = true;
      renderWithProvider();

      const toggleButtons = screen.getAllByTestId(/toggle-button-/);
      expect(toggleButtons).toHaveLength(10);
    });

    it('should handle toggle button click', async () => {
      mockIsTabletUp = true;
      const user = userEvent.setup();
      renderWithProvider();

      const emBoxButton = screen.getByTestId('toggle-button-emBox');
      await user.click(emBoxButton);

      expect(emBoxButton).toHaveAttribute('data-selected', 'true');
    });
  });

  describe('toggle buttons on mobile', () => {
    it('should not render toggle buttons on mobile', () => {
      mockIsTabletUp = false;
      renderWithProvider();

      expect(
        screen.queryByTestId('toggle-button-lineBox')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('toggle-button-emBox')
      ).not.toBeInTheDocument();
    });
  });
});
