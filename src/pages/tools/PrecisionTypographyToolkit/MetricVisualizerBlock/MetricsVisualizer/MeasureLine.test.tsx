import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MeasureLine } from './MeasureLine';

describe('MeasureLine', () => {
  const defaultProps = {
    x: 100,
    y1: -750,
    y2: 0,
    isSelected: false,
    color: 'var(--color-tertiary)',
    colorSelected: 'var(--color-primary)',
  };

  describe('rendering', () => {
    it('should render a line element', () => {
      const { container } = render(
        <svg>
          <MeasureLine {...defaultProps} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toBeInTheDocument();
    });

    it('should render vertical line at correct X position', () => {
      const { container } = render(
        <svg>
          <MeasureLine {...defaultProps} x={200} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('x1', '200');
      expect(line).toHaveAttribute('x2', '200');
    });

    it('should span from y1 to y2', () => {
      const { container } = render(
        <svg>
          <MeasureLine {...defaultProps} y1={-800} y2={-100} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('y1', '-800');
      expect(line).toHaveAttribute('y2', '-100');
    });
  });

  describe('selection state', () => {
    it('should use default color when not selected', () => {
      const { container } = render(
        <svg>
          <MeasureLine {...defaultProps} isSelected={false} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('stroke', 'var(--color-tertiary)');
    });

    it('should use selected color when selected', () => {
      const { container } = render(
        <svg>
          <MeasureLine {...defaultProps} isSelected={true} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('stroke', 'var(--color-primary)');
    });

    it('should use default arrow markers when not selected', () => {
      const { container } = render(
        <svg>
          <MeasureLine {...defaultProps} isSelected={false} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('marker-start', 'url(#arrow-start)');
      expect(line).toHaveAttribute('marker-end', 'url(#arrow-end)');
    });

    it('should use selected arrow markers when selected', () => {
      const { container } = render(
        <svg>
          <MeasureLine {...defaultProps} isSelected={true} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('marker-start', 'url(#arrow-start--selected)');
      expect(line).toHaveAttribute('marker-end', 'url(#arrow-end--selected)');
    });
  });

  describe('marker visibility', () => {
    it('should show markers by default', () => {
      const { container } = render(
        <svg>
          <MeasureLine {...defaultProps} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line?.getAttribute('marker-start')).not.toBe('none');
      expect(line?.getAttribute('marker-end')).not.toBe('none');
    });

    it('should hide markers when noMarkers is true', () => {
      const { container } = render(
        <svg>
          <MeasureLine {...defaultProps} noMarkers={true} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('marker-start', 'none');
      expect(line).toHaveAttribute('marker-end', 'none');
    });
  });

  describe('transparency', () => {
    it('should be visible by default', () => {
      const { container } = render(
        <svg>
          <MeasureLine {...defaultProps} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line?.getAttribute('stroke')).not.toBe('transparent');
    });

    it('should be transparent when isTransparent is true', () => {
      const { container } = render(
        <svg>
          <MeasureLine {...defaultProps} isTransparent={true} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('stroke', 'transparent');
    });

    it('should be transparent regardless of selection when isTransparent is true', () => {
      const { container } = render(
        <svg>
          <MeasureLine
            {...defaultProps}
            isTransparent={true}
            isSelected={true}
          />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('stroke', 'transparent');
    });
  });

  describe('styling', () => {
    it('should have 1px stroke width', () => {
      const { container } = render(
        <svg>
          <MeasureLine {...defaultProps} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('stroke-width', '1');
    });

    it('should use non-scaling-stroke vector effect', () => {
      const { container } = render(
        <svg>
          <MeasureLine {...defaultProps} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('vector-effect', 'non-scaling-stroke');
    });
  });

  describe('different measurements', () => {
    const measurements = [
      { name: 'capHeight', y1: -700, y2: 0 },
      { name: 'xHeight', y1: -500, y2: 0 },
      { name: 'ascender', y1: -750, y2: 0 },
      { name: 'descender', y1: 0, y2: 250 },
      { name: 'lineBox', y1: -900, y2: 300 },
    ];

    measurements.forEach(({ name, y1, y2 }) => {
      it(`should render correctly for ${name} measurement`, () => {
        const { container } = render(
          <svg>
            <MeasureLine {...defaultProps} y1={y1} y2={y2} />
          </svg>
        );

        const line = container.querySelector('line');
        expect(line).toHaveAttribute('y1', y1.toString());
        expect(line).toHaveAttribute('y2', y2.toString());
      });
    });
  });

  describe('edge cases', () => {
    it('should handle negative coordinates', () => {
      const { container } = render(
        <svg>
          <MeasureLine {...defaultProps} x={-50} y1={-1000} y2={-100} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('x1', '-50');
      expect(line).toHaveAttribute('y1', '-1000');
    });

    it('should handle zero-length line', () => {
      const { container } = render(
        <svg>
          <MeasureLine {...defaultProps} y1={0} y2={0} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('y1', '0');
      expect(line).toHaveAttribute('y2', '0');
    });

    it('should handle inverted direction (y2 > y1)', () => {
      const { container } = render(
        <svg>
          <MeasureLine {...defaultProps} y1={100} y2={-100} />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('y1', '100');
      expect(line).toHaveAttribute('y2', '-100');
    });
  });

  describe('combined states', () => {
    it('should handle selected + transparent', () => {
      const { container } = render(
        <svg>
          <MeasureLine
            {...defaultProps}
            isSelected={true}
            isTransparent={true}
          />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('stroke', 'transparent');
      expect(line).toHaveAttribute('marker-start', 'url(#arrow-start--selected)');
    });

    it('should handle selected + noMarkers', () => {
      const { container } = render(
        <svg>
          <MeasureLine
            {...defaultProps}
            isSelected={true}
            noMarkers={true}
          />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('stroke', 'var(--color-primary)');
      expect(line).toHaveAttribute('marker-start', 'none');
      expect(line).toHaveAttribute('marker-end', 'none');
    });

    it('should handle transparent + noMarkers', () => {
      const { container } = render(
        <svg>
          <MeasureLine
            {...defaultProps}
            isTransparent={true}
            noMarkers={true}
          />
        </svg>
      );

      const line = container.querySelector('line');
      expect(line).toHaveAttribute('stroke', 'transparent');
      expect(line).toHaveAttribute('marker-start', 'none');
      expect(line).toHaveAttribute('marker-end', 'none');
    });
  });
});
