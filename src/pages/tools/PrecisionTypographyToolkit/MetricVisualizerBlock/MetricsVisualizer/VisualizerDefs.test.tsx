import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { VisualizerDefs } from './VisualizerDefs';

describe('VisualizerDefs', () => {
  const defaultProps = {
    arrowWidth: 50,
    arrowHeight: 100,
    refPoint: 25,
    measureColor: 'var(--color-tertiary)',
    selectedMeasureColor: 'var(--color-primary-border-hover)',
    unitsPerRem: 16,
  };

  const renderDefs = (props = {}) => {
    return render(
      <svg>
        <VisualizerDefs {...defaultProps} {...props} />
      </svg>
    );
  };

  describe('rendering', () => {
    it('should render defs element', () => {
      const { container } = renderDefs();

      const defs = container.querySelector('defs');
      expect(defs).toBeInTheDocument();
    });

    it('should render all gradients', () => {
      const { container } = renderDefs();

      expect(container.querySelector('#circle-border')).toBeInTheDocument();
      expect(
        container.querySelector('#circle-border-active')
      ).toBeInTheDocument();
      expect(container.querySelector('#circle-fill')).toBeInTheDocument();
    });

    it('should render all filters', () => {
      const { container } = renderDefs();

      expect(container.querySelector('#glow-effect')).toBeInTheDocument();
      expect(container.querySelector('#inner-shadow')).toBeInTheDocument();
    });

    it('should render all arrow markers', () => {
      const { container } = renderDefs();

      expect(container.querySelector('#arrow-start')).toBeInTheDocument();
      expect(container.querySelector('#arrow-end')).toBeInTheDocument();
      expect(
        container.querySelector('#arrow-start--selected')
      ).toBeInTheDocument();
      expect(
        container.querySelector('#arrow-end--selected')
      ).toBeInTheDocument();
    });
  });

  describe('gradients configuration', () => {
    it('should configure circle-border gradient with correct stops', () => {
      const { container } = renderDefs();

      const gradient = container.querySelector('#circle-border');
      const stops = gradient?.querySelectorAll('stop');

      expect(stops).toHaveLength(2);
      expect(stops?.[0]).toHaveAttribute('offset', '55%');
      expect(stops?.[1]).toHaveAttribute('offset', '90%');
    });

    it('should configure circle-border-active gradient with correct colors', () => {
      const { container } = renderDefs();

      const gradient = container.querySelector('#circle-border-active');
      const stops = gradient?.querySelectorAll('stop');

      expect(stops).toHaveLength(2);
      expect(stops?.[0]).toHaveAttribute(
        'stop-color',
        'var(--color-primary-border-bright)'
      );
      expect(stops?.[1]).toHaveAttribute(
        'stop-color',
        'var(--color-primary-border-hover)'
      );
    });

    it('should configure circle-fill gradient with surface colors', () => {
      const { container } = renderDefs();

      const gradient = container.querySelector('#circle-fill');
      const stops = gradient?.querySelectorAll('stop');

      expect(stops).toHaveLength(2);
      expect(stops?.[0]).toHaveAttribute(
        'stop-color',
        'var(--color-primary-surface)'
      );
      expect(stops?.[1]).toHaveAttribute(
        'stop-color',
        'var(--color-primary-surface-dark)'
      );
    });

    it('should set 45° gradient direction (bottom right)', () => {
      const { container } = renderDefs();

      const gradient = container.querySelector('#circle-border');
      expect(gradient).toHaveAttribute('x1', '0%');
      expect(gradient).toHaveAttribute('y1', '0%');
      expect(gradient).toHaveAttribute('x2', '100%');
      expect(gradient).toHaveAttribute('y2', '100%');
    });
  });

  describe('filters configuration', () => {
    it('should configure glow-effect with correct blur', () => {
      const { container } = renderDefs({ unitsPerRem: 16 });

      const filter = container.querySelector('#glow-effect');
      const feDropShadow = filter?.querySelector('feDropShadow');

      // 0.5 * 16 = 8
      expect(feDropShadow).toHaveAttribute('stdDeviation', '8');
    });

    it('should configure glow-effect with correct color', () => {
      const { container } = renderDefs();

      const filter = container.querySelector('#glow-effect');
      const feDropShadow = filter?.querySelector('feDropShadow');

      expect(feDropShadow).toHaveAttribute(
        'flood-color',
        'var(--color-primary-border-hover)'
      );
      expect(feDropShadow).toHaveAttribute('flood-opacity', '0.8');
    });

    it('should configure inner-shadow with correct blur', () => {
      const { container } = renderDefs({ unitsPerRem: 16 });

      const filter = container.querySelector('#inner-shadow');
      const feGaussianBlur = filter?.querySelector('feGaussianBlur');

      // 0.125 * 16 = 2
      expect(feGaussianBlur).toHaveAttribute('stdDeviation', '2');
    });

    it('should configure inner-shadow with correct offset', () => {
      const { container } = renderDefs({ unitsPerRem: 16 });

      const filter = container.querySelector('#inner-shadow');
      const feOffset = filter?.querySelector('feOffset');

      // 0.0625 * 16 = 1
      expect(feOffset).toHaveAttribute('dy', '1');
    });

    it('should scale filters with unitsPerRem', () => {
      const { container } = renderDefs({ unitsPerRem: 32 });

      const glowFilter = container.querySelector('#glow-effect');
      const feDropShadow = glowFilter?.querySelector('feDropShadow');

      // 0.5 * 32 = 16
      expect(feDropShadow).toHaveAttribute('stdDeviation', '16');

      const shadowFilter = container.querySelector('#inner-shadow');
      const feGaussianBlur = shadowFilter?.querySelector('feGaussianBlur');

      // 0.125 * 32 = 4
      expect(feGaussianBlur).toHaveAttribute('stdDeviation', '4');
    });

    it('should set filter regions to 200%', () => {
      const { container } = renderDefs();

      const glowFilter = container.querySelector('#glow-effect');
      expect(glowFilter).toHaveAttribute('x', '-50%');
      expect(glowFilter).toHaveAttribute('y', '-50%');
      expect(glowFilter).toHaveAttribute('width', '200%');
      expect(glowFilter).toHaveAttribute('height', '200%');
    });
  });

  describe('arrow markers configuration', () => {
    it('should configure default arrow-start marker', () => {
      const { container } = renderDefs();

      const marker = container.querySelector('#arrow-start');
      expect(marker).toHaveAttribute('markerWidth', '50');
      expect(marker).toHaveAttribute('markerHeight', '100');
      expect(marker).toHaveAttribute('refX', '25');
      expect(marker).toHaveAttribute('refY', '25');
      expect(marker).toHaveAttribute('orient', 'auto-start-reverse');
    });

    it('should configure default arrow-end marker', () => {
      const { container } = renderDefs();

      const marker = container.querySelector('#arrow-end');
      expect(marker).toHaveAttribute('orient', 'auto');
    });

    it('should configure selected arrow-start marker', () => {
      const { container } = renderDefs();

      const marker = container.querySelector('#arrow-start--selected');
      expect(marker).toHaveAttribute('markerWidth', '50');
      expect(marker).toHaveAttribute('orient', 'auto-start-reverse');
    });

    it('should configure selected arrow-end marker', () => {
      const { container } = renderDefs();

      const marker = container.querySelector('#arrow-end--selected');
      expect(marker).toHaveAttribute('orient', 'auto');
    });

    it('should use measureColor for default arrows', () => {
      const { container } = renderDefs({
        measureColor: 'var(--test-color)',
      });

      const startMarker = container.querySelector('#arrow-start');
      const startPath = startMarker?.querySelector('path');
      expect(startPath).toHaveAttribute('fill', 'var(--test-color)');

      const endMarker = container.querySelector('#arrow-end');
      const endPath = endMarker?.querySelector('path');
      expect(endPath).toHaveAttribute('fill', 'var(--test-color)');
    });

    it('should use selectedMeasureColor for selected arrows', () => {
      const { container } = renderDefs({
        selectedMeasureColor: 'var(--selected-color)',
      });

      const startMarker = container.querySelector('#arrow-start--selected');
      const startPath = startMarker?.querySelector('path');
      expect(startPath).toHaveAttribute('fill', 'var(--selected-color)');

      const endMarker = container.querySelector('#arrow-end--selected');
      const endPath = endMarker?.querySelector('path');
      expect(endPath).toHaveAttribute('fill', 'var(--selected-color)');
    });

    it('should scale arrow markers with dimensions', () => {
      const { container } = renderDefs({
        arrowWidth: 100,
        arrowHeight: 200,
        refPoint: 50,
      });

      const marker = container.querySelector('#arrow-start');
      expect(marker).toHaveAttribute('markerWidth', '100');
      expect(marker).toHaveAttribute('markerHeight', '200');
      expect(marker).toHaveAttribute('refX', '50');
      expect(marker).toHaveAttribute('refY', '50');
    });

    it('should use userSpaceOnUse for marker units', () => {
      const { container } = renderDefs();

      const marker = container.querySelector('#arrow-start');
      expect(marker).toHaveAttribute('markerUnits', 'userSpaceOnUse');
    });

    it('should create correct arrow path', () => {
      const { container } = renderDefs({
        arrowWidth: 50,
        arrowHeight: 100,
        refPoint: 25,
      });

      const marker = container.querySelector('#arrow-start');
      const path = marker?.querySelector('path');

      // Path: M 0 0 L arrowWidth refPoint L 0 arrowHeight z
      expect(path).toHaveAttribute('d', 'M 0 0 L 50 25 L 0 100 z');
    });
  });

  describe('dynamic sizing', () => {
    it('should calculate blur proportional to unitsPerRem', () => {
      // Test with unitsPerRem=10
      const { container } = renderDefs({ unitsPerRem: 10 });
      const filter = container.querySelector('#glow-effect');
      const feDropShadow = filter?.querySelector('feDropShadow');
      expect(feDropShadow).toHaveAttribute('stdDeviation', '5'); // 0.5 * 10 = 5
    });

    it('should double blur when unitsPerRem doubles', () => {
      // Test with unitsPerRem=20
      const { container } = renderDefs({ unitsPerRem: 20 });
      const filter = container.querySelector('#glow-effect');
      const feDropShadow = filter?.querySelector('feDropShadow');
      expect(feDropShadow).toHaveAttribute('stdDeviation', '10'); // 0.5 * 20 = 10
    });

    it('should maintain aspect ratio for arrow dimensions', () => {
      const { container } = renderDefs({
        arrowWidth: 25,
        arrowHeight: 50,
        refPoint: 12.5,
      });

      const marker = container.querySelector('#arrow-start');
      const width = Number(marker?.getAttribute('markerWidth'));
      const height = Number(marker?.getAttribute('markerHeight'));

      expect(height / width).toBe(2); // 2:1 aspect ratio
    });
  });

  describe('accessibility and semantics', () => {
    it('should provide unique IDs for all definitions', () => {
      const { container } = renderDefs();

      const ids = [
        'circle-border',
        'circle-border-active',
        'circle-fill',
        'glow-effect',
        'inner-shadow',
        'arrow-start',
        'arrow-end',
        'arrow-start--selected',
        'arrow-end--selected',
      ];

      ids.forEach((id) => {
        expect(container.querySelector(`#${id}`)).toBeInTheDocument();
      });
    });

    it('should use CSS variables for theme colors', () => {
      const { container } = renderDefs();

      // Check gradients use CSS variables
      const borderGradient = container.querySelector('#circle-border');
      const stops = borderGradient?.querySelectorAll('stop');
      expect(stops?.[0]).toHaveAttribute('stop-color', 'var(--color-tertiary)');
    });
  });
});
