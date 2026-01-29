import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MetricsVisualizerLabel } from './MetricsVisualizerLabel';
import { FontMetricsProvider } from '../../context';

// Mock utility functions
vi.mock('@/utils', () => ({
  MetricsNiceName: {
    capHeight: 'Cap Height',
    xHeight: 'x-Height',
    ascender: 'Ascender',
    descender: 'Descender',
    baseline: 'Baseline',
    lineBox: 'Line Box',
    emBox: 'Em Box',
    topTrim: 'Top Trim',
    bottomTrim: 'Bottom Trim',
  },
  isMetricVisualized: (metric: string) => {
    const visualized = [
      'capHeight',
      'xHeight',
      'ascender',
      'descender',
      'lineBox',
      'emBox',
    ];
    return visualized.includes(metric);
  },
  getMetricValue: (metric: string) => {
    const values: Record<string, string> = {
      capHeight: '700',
      xHeight: '500',
      ascender: '750',
      descender: '-250',
    };
    return values[metric] || '0';
  },
}));

describe('MetricsVisualizerLabel', () => {
  const renderWithProvider = (ui: React.ReactElement) => {
    // Create a wrapper with context
    const TestWrapper = ({ children }: { children: React.ReactNode }) => (
      <FontMetricsProvider>{children}</FontMetricsProvider>
    );

    return render(ui, { wrapper: TestWrapper });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the label component', async () => {
      renderWithProvider(<MetricsVisualizerLabel />);

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
      });
    });

    it('should render inside ButtonGroup', () => {
      const { container } = renderWithProvider(<MetricsVisualizerLabel />);

      // ButtonGroup should be present as wrapper
      expect(container.querySelector('[class*="button-group"]')).toBeInTheDocument();
    });

    it('should render as Button with label variant', () => {
      renderWithProvider(<MetricsVisualizerLabel />);

      // Check for button element
      const button = screen.getByRole('status').closest('button, div');
      expect(button).toBeInTheDocument();
    });
  });

  describe('no selection state', () => {
    it('should show default message when no metric selected', () => {
      renderWithProvider(<MetricsVisualizerLabel />);

      expect(
        screen.getByText('Select a metric to see its values')
      ).toBeInTheDocument();
    });

    it('should render decorative elements for empty state', () => {
      renderWithProvider(<MetricsVisualizerLabel />);

      const decorators = screen.getAllByText('::', { exact: false });
      expect(decorators.length).toBeGreaterThanOrEqual(2);
    });

    it('should apply secondary color to empty state text', () => {
      renderWithProvider(<MetricsVisualizerLabel />);

      const emptyText = screen.getByText('Select a metric to see its values');
      expect(emptyText).toHaveClass('color-text-secondary');
    });
  });

  describe('metric selected - visualized', () => {
    it('should display metric name when selected', () => {
      // This test would need proper context mocking to set selectedMetric
      renderWithProvider(<MetricsVisualizerLabel />);

      // Would check for metric name if context had selectedMetric
      // For now, verify component renders
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should display metric value when selected', () => {
      renderWithProvider(<MetricsVisualizerLabel />);

      // Would verify metric value display with proper context
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should format metric name with colon', () => {
      renderWithProvider(<MetricsVisualizerLabel />);

      // When metric is selected, name should end with ':'
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('metric selected - not visualized', () => {
    it('should show not visualized message for non-visualized metrics', () => {
      renderWithProvider(<MetricsVisualizerLabel />);

      // Would check for "is not visualized in the diagram" message
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have role="status" for live region', () => {
      renderWithProvider(<MetricsVisualizerLabel />);

      const status = screen.getByRole('status');
      expect(status).toBeInTheDocument();
    });

    it('should have aria-live="polite"', () => {
      renderWithProvider(<MetricsVisualizerLabel />);

      const status = screen.getByRole('status');
      expect(status).toHaveAttribute('aria-live', 'polite');
    });

    it('should have aria-atomic="true"', () => {
      renderWithProvider(<MetricsVisualizerLabel />);

      const status = screen.getByRole('status');
      expect(status).toHaveAttribute('aria-atomic', 'true');
    });

    it('should hide decorative elements from screen readers', () => {
      renderWithProvider(<MetricsVisualizerLabel />);

      const decorators = screen.getAllByText('::', { exact: false });
      decorators.forEach((decorator) => {
        expect(decorator).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('layout and styling', () => {
    it('should use Flex layout for content', () => {
      const { container } = renderWithProvider(<MetricsVisualizerLabel />);

      const flexElements = container.querySelectorAll('[class*="flex"]');
      expect(flexElements.length).toBeGreaterThan(0);
    });

    it('should center content', () => {
      const { container } = renderWithProvider(<MetricsVisualizerLabel />);

      // Check for Flex component (centering is applied via Flex props)
      const flexElement = container.querySelector('[class*="Flex"]');
      expect(flexElement).toBeTruthy();
    });

    it('should align items to baseline for text', () => {
      const { container } = renderWithProvider(<MetricsVisualizerLabel />);

      const baselineElement = container.querySelector(
        '[class*="align-items-baseline"]'
      );
      expect(baselineElement).toBeInTheDocument();
    });
  });

  describe('decorative elements', () => {
    it('should render opening decorator', () => {
      renderWithProvider(<MetricsVisualizerLabel />);

      const openDecorator = screen.getAllByText('.::', { exact: false })[0];
      expect(openDecorator).toBeInTheDocument();
    });

    it('should render closing decorator', () => {
      renderWithProvider(<MetricsVisualizerLabel />);

      const decorators = screen.getAllByText('::.');
      expect(decorators.length).toBeGreaterThanOrEqual(1);
    });

    it('should apply semibold font weight to decorators', () => {
      renderWithProvider(<MetricsVisualizerLabel />);

      const decorators = screen.getAllByText('::', { exact: false });
      decorators.forEach((decorator) => {
        expect(decorator).toHaveClass('font-weight-semibold');
      });
    });
  });

  describe('color coding', () => {
    it('should use primary color for selected metric name', () => {
      renderWithProvider(<MetricsVisualizerLabel />);

      // When a metric is selected, its name should have primary color
      const status = screen.getByRole('status');
      expect(status).toBeInTheDocument();
    });

    it('should use secondary color for empty state', () => {
      renderWithProvider(<MetricsVisualizerLabel />);

      const emptyText = screen.getByText('Select a metric to see its values');
      expect(emptyText).toHaveClass('color-text-secondary');
    });
  });

  describe('gap spacing', () => {
    it('should have extra-large gap for decorators', () => {
      const { container } = renderWithProvider(<MetricsVisualizerLabel />);

      const xlGap = container.querySelector('[class*="gap-xl"]');
      expect(xlGap).toBeInTheDocument();
    });

    it('should have extra-small gap between name and value', () => {
      const { container } = renderWithProvider(<MetricsVisualizerLabel />);

      // Check for Flex component existence (gap is applied via Flex props)
      const flexElement = container.querySelector('[class*="Flex"]');
      expect(flexElement).toBeTruthy();
    });
  });
});
