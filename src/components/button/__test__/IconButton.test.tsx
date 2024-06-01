import { fireEvent, getByRole, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { buttonVariants } from '../../../variants';
import { clsxMerge } from '../../../common/utils/classNameUtils.ts';
import { PlusIcon } from '@heroicons/react/24/solid';
import { IconButton } from '../IconButton.tsx';

const sizes = ['L', 'M', 'S'] as const;
const rounded = [
  'Default',
  'R',
  'RTop',
  'RBottom',
  'L',
  'LTop',
  'LBottom',
] as const;
const variants = ['filled', 'outlined', 'standard', 'text'] as const;

describe('IconButton', () => {
  it('renders correctly', () => {
    const { container } = render(<IconButton icon={<PlusIcon />} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('render correctly with variant prop', () => {
    variants.forEach((variant) => {
      const { container } = render(
        <IconButton icon={<PlusIcon />} variant={variant} />
      );
      expect(container.firstChild).toHaveClass(
        clsxMerge(buttonVariants({ variant }))
      );
      expect(container).toMatchSnapshot();
    });
  });

  it('render correctly with size prop', () => {
    const variants = ['filled', 'outlined', 'standard', 'text'] as const;

    variants.forEach((variant) => {
      const { container } = render(
        <IconButton icon={<PlusIcon />} variant={variant} />
      );
      expect(container.firstChild).toHaveClass(
        clsxMerge(buttonVariants({ variant }))
      );
      expect(container).toMatchSnapshot();
    });
  });

  it('render correctly with rounded prop', () => {
    rounded.forEach((rounded) => {
      const { container } = render(
        <IconButton icon={<PlusIcon />} rounded={rounded} />
      );
      expect(container).toMatchSnapshot();
      expect(container.firstChild).toHaveClass(buttonVariants({ rounded }));
    });
  });

  it('render correctly with size prop', () => {
    sizes.forEach((size) => {
      const { container } = render(
        <IconButton icon={<PlusIcon />} size={size} />
      );
      expect(container).toMatchSnapshot();
      expect(container.firstChild).toHaveClass(buttonVariants({ size }));
    });
  });

  it('should render correctly with all props mix and handle click', () => {
    variants.map((variant) => {
      sizes.map((size) => {
        rounded.map((round) => {
          const handleClick = vi.fn();
          const { container } = render(
            <IconButton
              variant={variant}
              size={size}
              rounded={round}
              icon={<PlusIcon />}
              onClick={handleClick}
            />
          );

          expect(container).toMatchSnapshot();
          expect(container.firstChild).toHaveClass(
            buttonVariants({ size, variant, rounded: round })
          );

          const buttonElement = getByRole(container, `button`);
          fireEvent.click(buttonElement);

          expect(handleClick).toHaveBeenCalled();
        });
      });
    });

    sizes.forEach((size) => {
      const { container } = render(
        <IconButton icon={<PlusIcon />} size={size} />
      );
      expect(container).toMatchSnapshot();
      expect(container.firstChild).toHaveClass(buttonVariants({ size }));
    });
  });

  it('button is disabled correctly', () => {
    const handleClick = vi.fn();
    const { container: containerDisabled } = render(
      <IconButton
        id="icon"
        icon={<PlusIcon />}
        onClick={handleClick}
        disabled
      />
    );

    expect(containerDisabled).toMatchSnapshot();
    expect(containerDisabled.firstChild).toHaveClass(
      'disabled:cursor-not-allowed'
    );

    const buttonElement = getByRole(containerDisabled, 'button');
    fireEvent.click(buttonElement);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
