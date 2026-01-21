import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

// Mock Icon component
vi.mock('@/components/ui/Icon', () => ({
  Icon: ({ size, fill }: any) => (
    <span data-testid="mock-icon" data-size={size} data-fill={fill}>
      Icon
    </span>
  ),
}));

// Mock icon component for testing
const MockIcon = () => <svg data-testid="test-icon" />;

describe('Button', () => {
  describe('rendering', () => {
    it('should render button with children', () => {
      render(<Button>Click me</Button>);

      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('should render as button element by default', () => {
      render(<Button>Click me</Button>);

      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('should render as anchor element when href is provided', () => {
      render(<Button href="/test">Link</Button>);

      const link = screen.getByRole('link');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/test');
    });

    it('should render as div element when variant is "label"', () => {
      const { container } = render(<Button variant="label">Label</Button>);

      const element = container.firstChild;
      expect(element?.nodeName).toBe('DIV');
    });
  });

  describe('variants', () => {
    const variants = [
      'primary',
      'secondary',
      'accent',
      'ghost',
      'link',
      'success',
      'warning',
      'danger',
      'info',
      'label',
    ] as const;

    variants.forEach((variant) => {
      it(`should render with variant "${variant}"`, () => {
        render(<Button variant={variant}>Button</Button>);

        const button = screen.getByText('Button');
        expect(button).toBeInTheDocument();
      });
    });

    it('should default to "primary" variant', () => {
      render(<Button>Button</Button>);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    const sizes = ['xs', 'sm', 'base', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`should render with size "${size}"`, () => {
        render(<Button size={size}>Button</Button>);

        expect(screen.getByRole('button')).toBeInTheDocument();
      });
    });

    it('should default to "base" size', () => {
      render(<Button>Button</Button>);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('icon support', () => {
    it('should render button with icon', () => {
      render(<Button icon={MockIcon}>Button</Button>);

      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should render icon-only button with aria-label', () => {
      render(
        <Button icon={MockIcon} iconOnly aria-label="Close">
          Button
        </Button>
      );

      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
      expect(screen.getByLabelText('Close')).toBeInTheDocument();
    });

    it('should apply iconFill prop to Icon', () => {
      render(
        <Button icon={MockIcon} iconFill="primary">
          Button
        </Button>
      );

      const icon = screen.getByTestId('mock-icon');
      expect(icon).toHaveAttribute('data-fill', 'primary');
    });
  });

  describe('interaction', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(<Button onClick={onClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <Button onClick={onClick} disabled>
          Click me
        </Button>
      );

      await user.click(screen.getByRole('button'));

      expect(onClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when loading', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <Button onClick={onClick} loading>
          Click me
        </Button>
      );

      await user.click(screen.getByRole('button'));

      expect(onClick).not.toHaveBeenCalled();
    });

    it('should not call onClick for label variant', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <Button variant="label" onClick={onClick}>
          Label
        </Button>
      );

      const element = screen.getByText('Label');
      await user.click(element);

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('disabled state', () => {
    it('should render as disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should render as disabled when loading is true', () => {
      render(<Button loading>Loading</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('loading state', () => {
    it('should set aria-busy when loading', () => {
      render(<Button loading>Loading</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('should disable button when loading', () => {
      render(<Button loading>Loading</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('link behavior', () => {
    it('should open external links in new tab', () => {
      render(
        <Button href="https://example.com" external>
          External Link
        </Button>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should not add target/rel for internal links', () => {
      render(<Button href="/internal">Internal Link</Button>);

      const link = screen.getByRole('link');
      expect(link).not.toHaveAttribute('target');
      expect(link).not.toHaveAttribute('rel');
    });

    it('should disable tabindex when disabled link', () => {
      render(
        <Button href="/test" disabled>
          Disabled Link
        </Button>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('button types', () => {
    it('should default to type="button"', () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should accept type="submit"', () => {
      render(<Button type="submit">Submit</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should accept type="reset"', () => {
      render(<Button type="reset">Reset</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });
  });

  describe('layout', () => {
    it('should support fullWidth prop', () => {
      render(<Button fullWidth>Full Width</Button>);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should support narrow prop', () => {
      render(<Button narrow>Narrow</Button>);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('radius', () => {
    const radiuses = ['sm', 'md', 'lg'] as const;

    radiuses.forEach((radius) => {
      it(`should render with radius "${radius}"`, () => {
        render(<Button radius={radius}>Button</Button>);

        expect(screen.getByRole('button')).toBeInTheDocument();
      });
    });

    it('should default to "md" radius', () => {
      render(<Button>Button</Button>);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('spacing utilities', () => {
    it('should apply marginTop class', () => {
      render(<Button marginTop="md">Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('mt-md');
    });

    it('should apply marginBottom class', () => {
      render(<Button marginBottom="lg">Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('mb-lg');
    });

    it('should apply both margin classes', () => {
      render(
        <Button marginTop="sm" marginBottom="xl">
          Button
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('mt-sm', 'mb-xl');
    });
  });

  describe('accessibility', () => {
    it('should require aria-label for icon-only buttons', () => {
      render(
        <Button icon={MockIcon} iconOnly aria-label="Close dialog">
          Button
        </Button>
      );

      const button = screen.getByLabelText('Close dialog');
      expect(button).toBeInTheDocument();
    });

    it('should set title attribute for icon-only buttons', () => {
      render(
        <Button icon={MockIcon} iconOnly aria-label="Close dialog">
          Button
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Close dialog');
    });

    it('should support custom aria-label for regular buttons', () => {
      render(<Button aria-label="Custom label">Button</Button>);

      const button = screen.getByLabelText('Custom label');
      expect(button).toBeInTheDocument();
    });
  });

  describe('custom className', () => {
    it('should apply custom className', () => {
      render(<Button className="custom-class">Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('should combine custom className with default classes', () => {
      render(
        <Button className="custom-class" variant="primary">
          Button
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });
});
