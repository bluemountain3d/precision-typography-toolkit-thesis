import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MetricToggleButton } from './MetricToggleButton';

// Mock MetricsNiceName utility
vi.mock('@/utils', () => ({
  MetricsNiceName: {
    capHeight: 'Cap Height',
    xHeight: 'x-Height',
    ascender: 'Ascender',
    descender: 'Descender',
    baseline: 'Baseline',
    lineBox: 'Line Box',
    emBox: 'Em Box',
  },
}));

describe('MetricToggleButton', () => {
  const defaultProps = {
    x: 100,
    y: -375,
    isSelected: false,
    metricId: 'capHeight',
    hitBoxSize: 44,
    hitBoxRadius: 8,
    outerRadius: 12,
    outerRadiusSelected: 14,
    innerRadius: 10,
    innerRadiusSelected: 12,
    onSelect: vi.fn(),
  };

  describe('rendering', () => {
    it('should render the button', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} />
        </svg>
      );

      const button = container.querySelector('[role="button"]');
      expect(button).toBeInTheDocument();
    });

    it('should render at correct position', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} x={200} y={-500} />
        </svg>
      );

      const button = container.querySelector('[role="button"]');
      expect(button).toHaveAttribute('transform', 'translate(200, -500)');
    });

    it('should have correct title from metricId', () => {
      render(
        <svg>
          <MetricToggleButton {...defaultProps} metricId="xHeight" />
        </svg>
      );

      expect(screen.getByText('Toggle x-Height')).toBeInTheDocument();
    });
  });

  describe('selection state', () => {
    it('should render as not selected by default', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} isSelected={false} />
        </svg>
      );

      const button = container.querySelector('[role="button"]');
      expect(button).toHaveAttribute('aria-pressed', 'false');
    });

    it('should render as selected when isSelected is true', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} isSelected={true} />
        </svg>
      );

      const button = container.querySelector('[role="button"]');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('should use selected radius when selected', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton
            {...defaultProps}
            isSelected={true}
            outerRadiusSelected={20}
          />
        </svg>
      );

      const circles = container.querySelectorAll('circle');
      // First circle should use selected radius
      expect(circles[0]).toHaveAttribute('r', '20');
    });

    it('should use default radius when not selected', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton
            {...defaultProps}
            isSelected={false}
            outerRadius={15}
          />
        </svg>
      );

      const circles = container.querySelectorAll('circle');
      expect(circles[0]).toHaveAttribute('r', '15');
    });
  });

  describe('interaction', () => {
    it('should call onSelect with metricId when clicked', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      const { container } = render(
        <svg>
          <MetricToggleButton
            {...defaultProps}
            onSelect={onSelect}
            metricId="capHeight"
          />
        </svg>
      );

      const button = container.querySelector('[role="button"]');
      await user.click(button!);

      expect(onSelect).toHaveBeenCalledWith('capHeight');
    });

    it('should call onSelect with empty string when clicked while selected', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      const { container } = render(
        <svg>
          <MetricToggleButton
            {...defaultProps}
            isSelected={true}
            onSelect={onSelect}
          />
        </svg>
      );

      const button = container.querySelector('[role="button"]');
      await user.click(button!);

      expect(onSelect).toHaveBeenCalledWith('');
    });

    it('should toggle on Enter key', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} onSelect={onSelect} />
        </svg>
      );

      const button = container.querySelector('[role="button"]');
      button?.focus();
      await user.keyboard('{Enter}');

      expect(onSelect).toHaveBeenCalledWith('capHeight');
    });

    it('should toggle on Space key', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} onSelect={onSelect} />
        </svg>
      );

      const button = container.querySelector('[role="button"]');
      button?.focus();
      await user.keyboard(' ');

      expect(onSelect).toHaveBeenCalledWith('capHeight');
    });
  });

  describe('accessibility', () => {
    it('should have role="button"', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} />
        </svg>
      );

      const button = container.querySelector('[role="button"]');
      expect(button).toBeInTheDocument();
    });

    it('should have tabIndex={0} for keyboard navigation', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} />
        </svg>
      );

      const button = container.querySelector('[role="button"]');
      expect(button).toHaveAttribute('tabindex', '0');
    });

    it('should have unique title id', () => {
      render(
        <svg>
          <MetricToggleButton {...defaultProps} metricId="capHeight" />
        </svg>
      );

      const title = document.getElementById('metric-toggle-capHeight');
      expect(title).toBeInTheDocument();
    });

    it('should reference title with aria-labelledby', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} metricId="xHeight" />
        </svg>
      );

      const button = container.querySelector('[role="button"]');
      expect(button).toHaveAttribute('aria-labelledby', 'metric-toggle-xHeight');
    });

    it('should communicate selection state with aria-pressed', () => {
      const { container, rerender } = render(
        <svg>
          <MetricToggleButton {...defaultProps} isSelected={false} />
        </svg>
      );

      const button = container.querySelector('[role="button"]');
      expect(button).toHaveAttribute('aria-pressed', 'false');

      rerender(
        <svg>
          <MetricToggleButton {...defaultProps} isSelected={true} />
        </svg>
      );

      expect(button).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('visual elements', () => {
    it('should render outer border circle', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} />
        </svg>
      );

      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThanOrEqual(3);
    });

    it('should render inner fill circle', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} />
        </svg>
      );

      const circles = container.querySelectorAll('circle');
      // Check that inner circle has shadow filter
      const innerCircle = Array.from(circles).find((c) =>
        c.getAttribute('filter')?.includes('inner-shadow')
      );
      expect(innerCircle).toBeInTheDocument();
    });

    it('should render hover glow circle', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} />
        </svg>
      );

      const circles = container.querySelectorAll('circle');
      // Hover glow circle should be present
      expect(circles.length).toBeGreaterThanOrEqual(3);
    });

    it('should render transparent hit area', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} hitBoxSize={50} />
        </svg>
      );

      const hitArea = container.querySelector('rect');
      expect(hitArea).toHaveAttribute('fill', 'transparent');
      expect(hitArea).toHaveAttribute('width', '50');
      expect(hitArea).toHaveAttribute('height', '50');
    });

    it('should apply border radius to hit box', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} hitBoxRadius={10} />
        </svg>
      );

      const hitArea = container.querySelector('rect');
      expect(hitArea).toHaveAttribute('rx', '10');
    });

    it('should center hit box on button position', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} hitBoxSize={44} />
        </svg>
      );

      const hitArea = container.querySelector('rect');
      // Should be offset by half the size (-22)
      expect(hitArea).toHaveAttribute('x', '-22');
      expect(hitArea).toHaveAttribute('y', '-22');
    });
  });

  describe('gradient and filter references', () => {
    it('should reference circle-border gradient', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} />
        </svg>
      );

      const circles = container.querySelectorAll('circle');
      const borderCircle = circles[0];
      expect(borderCircle).toHaveAttribute('fill', 'url(#circle-border)');
    });

    it('should reference circle-border-active for hover', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} />
        </svg>
      );

      const circles = container.querySelectorAll('circle');
      const hoverCircle = circles[1];
      expect(hoverCircle).toHaveAttribute('fill', 'url(#circle-border-active)');
    });

    it('should apply glow filter when selected', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} isSelected={true} />
        </svg>
      );

      const circles = container.querySelectorAll('circle');
      const hoverCircle = circles[1];
      expect(hoverCircle).toHaveAttribute('filter', 'url(#glow-effect)');
    });

    it('should not apply glow filter when not selected', () => {
      const { container } = render(
        <svg>
          <MetricToggleButton {...defaultProps} isSelected={false} />
        </svg>
      );

      const circles = container.querySelectorAll('circle');
      const hoverCircle = circles[1];
      expect(hoverCircle).not.toHaveAttribute('filter');
    });
  });

  describe('different metrics', () => {
    const metrics = [
      'capHeight',
      'xHeight',
      'ascender',
      'descender',
      'baseline',
      'lineBox',
      'emBox',
    ];

    metrics.forEach((metricId) => {
      it(`should render correctly for ${metricId}`, () => {
        const { container } = render(
          <svg>
            <MetricToggleButton {...defaultProps} metricId={metricId} />
          </svg>
        );

        const button = container.querySelector('[role="button"]');
        expect(button).toBeInTheDocument();
      });
    });
  });
});
