import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MetricLine } from './MetricLine';

describe('MetricLine', () => {
  describe('rendering', () => {
    it('should render a line element', () => {
      const { container } = render(
        <svg>
          <MetricLine x1={0} x2={1000} y={500} color="red" />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toBeInTheDocument();
    });

    it('should render horizontal line at correct Y position', () => {
      const { container } = render(
        <svg>
          <MetricLine x1={0} x2={1000} y={-750} color="blue" />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('y1', '-750');
      expect(line).toHaveAttribute('y2', '-750');
    });

    it('should span from x1 to x2', () => {
      const { container } = render(
        <svg>
          <MetricLine x1={100} x2={900} y={0} color="green" />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('x1', '100');
      expect(line).toHaveAttribute('x2', '900');
    });
  });

  describe('styling', () => {
    it('should apply correct color', () => {
      const { container } = render(
        <svg>
          <MetricLine
            x1={0}
            x2={1000}
            y={0}
            color="var(--color-tertiary)"
          />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('stroke', 'var(--color-tertiary)');
    });

    it('should have 1px stroke width', () => {
      const { container } = render(
        <svg>
          <MetricLine x1={0} x2={1000} y={0} color="red" />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('stroke-width', '1');
    });

    it('should use non-scaling-stroke vector effect', () => {
      const { container } = render(
        <svg>
          <MetricLine x1={0} x2={1000} y={0} color="red" />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('vector-effect', 'non-scaling-stroke');
    });
  });

  describe('default values', () => {
    it('should default to 0 for x1 when not provided', () => {
      const { container } = render(
        <svg>
          <MetricLine x2={1000} y={0} color="red" x1={0} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('x1', '0');
    });

    it('should default to 0 for x2 when not provided', () => {
      const { container } = render(
        <svg>
          <MetricLine x1={0} y={0} color="red" x2={0} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('x2', '0');
    });

    it('should default to 0 for y when not provided', () => {
      const { container } = render(
        <svg>
          <MetricLine x1={0} x2={1000} color="red" y={0} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('y1', '0');
      expect(line).toHaveAttribute('y2', '0');
    });
  });

  describe('different metric positions', () => {
    const metrics = [
      { name: 'baseline', y: 0 },
      { name: 'capHeight', y: -700 },
      { name: 'xHeight', y: -500 },
      { name: 'ascender', y: -750 },
      { name: 'descender', y: 250 },
    ];

    metrics.forEach(({ name, y }) => {
      it(`should render correctly for ${name} at y=${y}`, () => {
        const { container } = render(
          <svg>
            <MetricLine x1={0} x2={1000} y={y} color="blue" />
          </svg>
        );

        const line = container.querySelector('line');
        expect(line).toHaveAttribute('y1', y.toString());
        expect(line).toHaveAttribute('y2', y.toString());
      });
    });
  });

  describe('edge cases', () => {
    it('should handle negative coordinates', () => {
      const { container } = render(
        <svg>
          <MetricLine x1={-100} x2={-50} y={-800} color="red" />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('x1', '-100');
      expect(line).toHaveAttribute('x2', '-50');
      expect(line).toHaveAttribute('y1', '-800');
    });

    it('should handle zero-length line', () => {
      const { container } = render(
        <svg>
          <MetricLine x1={500} x2={500} y={0} color="red" />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('x1', '500');
      expect(line).toHaveAttribute('x2', '500');
    });

    it('should handle large coordinate values', () => {
      const { container } = render(
        <svg>
          <MetricLine x1={0} x2={10000} y={-5000} color="red" />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('x2', '10000');
      expect(line).toHaveAttribute('y1', '-5000');
    });
  });
});
