import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AreaRectangle } from './AreaRectangle';

describe('AreaRectangle', () => {
  const defaultProps = {
    x: 0,
    y: -750,
    width: 1000,
    height: 750,
    color: 'var(--color-tertiary)',
    isSelected: false,
  };

  describe('rendering', () => {
    it('should render a rect element', () => {
      const { container } = render(
        <svg>
          <AreaRectangle {...defaultProps} />
        </svg>
      );

      const rect = container.querySelector('rect');
      expect(rect).toBeInTheDocument();
    });

    it('should render at correct position', () => {
      const { container } = render(
        <svg>
          <AreaRectangle {...defaultProps} x={100} y={-500} />
        </svg>
      );

      const rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('x', '100');
      expect(rect).toHaveAttribute('y', '-500');
    });

    it('should have correct dimensions', () => {
      const { container } = render(
        <svg>
          <AreaRectangle {...defaultProps} width={800} height={600} />
        </svg>
      );

      const rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('width', '800');
      expect(rect).toHaveAttribute('height', '600');
    });
  });

  describe('selection state', () => {
    it('should be invisible when not selected', () => {
      const { container } = render(
        <svg>
          <AreaRectangle {...defaultProps} isSelected={false} />
        </svg>
      );

      const rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('fill', 'none');
    });

    it('should show color when selected', () => {
      const { container } = render(
        <svg>
          <AreaRectangle {...defaultProps} isSelected={true} />
        </svg>
      );

      const rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('fill', 'var(--color-tertiary)');
    });

    it('should maintain opacity when selected', () => {
      const { container } = render(
        <svg>
          <AreaRectangle {...defaultProps} isSelected={true} />
        </svg>
      );

      const rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('opacity', '0.85');
    });

    it('should maintain opacity when not selected', () => {
      const { container } = render(
        <svg>
          <AreaRectangle {...defaultProps} isSelected={false} />
        </svg>
      );

      const rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('opacity', '0.85');
    });
  });

  describe('color variations', () => {
    it('should apply custom color when selected', () => {
      const { container } = render(
        <svg>
          <AreaRectangle
            {...defaultProps}
            color="red"
            isSelected={true}
          />
        </svg>
      );

      const rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('fill', 'red');
    });

    it('should apply CSS variable color when selected', () => {
      const { container } = render(
        <svg>
          <AreaRectangle
            {...defaultProps}
            color="var(--custom-color)"
            isSelected={true}
          />
        </svg>
      );

      const rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('fill', 'var(--custom-color)');
    });
  });

  describe('dimension validation', () => {
    it('should handle zero width', () => {
      const { container } = render(
        <svg>
          <AreaRectangle {...defaultProps} width={0} />
        </svg>
      );

      const rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('width', '0');
    });

    it('should handle zero height', () => {
      const { container } = render(
        <svg>
          <AreaRectangle {...defaultProps} height={0} />
        </svg>
      );

      const rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('height', '0');
    });

    it('should convert negative width to 0', () => {
      const { container } = render(
        <svg>
          <AreaRectangle {...defaultProps} width={-100} />
        </svg>
      );

      const rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('width', '0');
    });

    it('should convert negative height to 0', () => {
      const { container } = render(
        <svg>
          <AreaRectangle {...defaultProps} height={-200} />
        </svg>
      );

      const rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('height', '0');
    });
  });

  describe('different metric areas', () => {
    const metrics = [
      { name: 'capHeight', x: 0, y: -700, width: 1000, height: 700 },
      { name: 'xHeight', x: 0, y: -500, width: 1000, height: 500 },
      { name: 'ascender', x: 0, y: -750, width: 1000, height: 750 },
      { name: 'descender', x: 0, y: 0, width: 1000, height: 250 },
      { name: 'emBox', x: 0, y: -800, width: 1000, height: 1000 },
    ];

    metrics.forEach(({ name, x, y, width, height }) => {
      it(`should render correctly for ${name} area`, () => {
        const { container } = render(
          <svg>
            <AreaRectangle
              {...defaultProps}
              x={x}
              y={y}
              width={width}
              height={height}
              isSelected={true}
            />
          </svg>
        );

        const rect = container.querySelector('rect');
        expect(rect).toHaveAttribute('x', x.toString());
        expect(rect).toHaveAttribute('y', y.toString());
        expect(rect).toHaveAttribute('width', width.toString());
        expect(rect).toHaveAttribute('height', height.toString());
      });
    });
  });

  describe('edge cases', () => {
    it('should handle negative coordinates', () => {
      const { container } = render(
        <svg>
          <AreaRectangle {...defaultProps} x={-100} y={-1000} />
        </svg>
      );

      const rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('x', '-100');
      expect(rect).toHaveAttribute('y', '-1000');
    });

    it('should handle very large dimensions', () => {
      const { container } = render(
        <svg>
          <AreaRectangle {...defaultProps} width={10000} height={10000} />
        </svg>
      );

      const rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('width', '10000');
      expect(rect).toHaveAttribute('height', '10000');
    });

    it('should handle fractional dimensions', () => {
      const { container } = render(
        <svg>
          <AreaRectangle {...defaultProps} width={100.5} height={200.75} />
        </svg>
      );

      const rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('width', '100.5');
      expect(rect).toHaveAttribute('height', '200.75');
    });
  });

  describe('selection toggling', () => {
    it('should toggle from invisible to visible', () => {
      const { container, rerender } = render(
        <svg>
          <AreaRectangle {...defaultProps} isSelected={false} />
        </svg>
      );

      let rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('fill', 'none');

      rerender(
        <svg>
          <AreaRectangle {...defaultProps} isSelected={true} />
        </svg>
      );

      rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('fill', 'var(--color-tertiary)');
    });

    it('should toggle from visible to invisible', () => {
      const { container, rerender } = render(
        <svg>
          <AreaRectangle {...defaultProps} isSelected={true} />
        </svg>
      );

      let rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('fill', 'var(--color-tertiary)');

      rerender(
        <svg>
          <AreaRectangle {...defaultProps} isSelected={false} />
        </svg>
      );

      rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('fill', 'none');
    });
  });
});
