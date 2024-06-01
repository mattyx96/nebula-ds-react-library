import {fireEvent, getByText, render} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Button} from '../Button.tsx';
import {buttonVariants} from '../../../variants';
import {clsxMerge} from '../../../common/utils/classNameUtils.ts';
import {PlusIcon} from '@heroicons/react/24/solid';
import {buttonRoundedVariants, buttonSizeVariants, buttonVariantVariants,} from '../../../variants/button';

const sizes = buttonSizeVariants;
const rounded = buttonRoundedVariants;
const variants = buttonVariantVariants;

describe('Button', () => {
  it('renders correctly', () => {
    const {container} = render(<Button>Click Me</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with left icon', () => {
    const {container} = render(
      <Button leftIcon={<span>👈</span>}>Click Me</Button>
    );

    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent('👈');
  });

  it('renders correctly with right icon', () => {
    const {container} = render(
      <Button rightIcon={<span>👉</span>}>Click Me</Button>
    );

    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent('👉');
  });

  it('renders correctly with both icons', () => {
    const {container} = render(
      <Button leftIcon={<span>👈</span>} rightIcon={<span>👉</span>}/>
    );

    expect(container).toHaveTextContent('👈');
    expect(container).toHaveTextContent('👉');
  });

  it('renders correctly with text', () => {
    const {container} = render(<Button text="Click Me"/>);

    expect(container).toHaveTextContent('Click Me');
  });

  it('renders correctly with label and left icon', () => {
    const {container} = render(
      <Button
        text="Click Me"
        leftIcon={<span>👈</span>}
        rightIcon={<span>👉</span>}
      />
    );

    expect(container).toHaveTextContent('Click Me');
    expect(container).toHaveTextContent('👈');
    expect(container).toHaveTextContent('👉');
  });

  it('render correctly with variant prop', () => {
    variants.forEach((variant) => {
      const {container} = render(<Button variant={variant}/>);
      expect(container.firstChild).toHaveClass(
        clsxMerge(buttonVariants({variant}))
      );
      expect(container).toMatchSnapshot();
    });
  });

  it('render correctly with size prop', () => {
    const variants = ['filled', 'outlined', 'standard', 'text'] as const;

    variants.forEach((variant) => {
      const {container} = render(<Button variant={variant}/>);
      expect(container.firstChild).toHaveClass(
        clsxMerge(buttonVariants({variant}))
      );
      expect(container).toMatchSnapshot();
    });
  });

  it('render correctly with rounded prop', () => {
    rounded.forEach((rounded) => {
      const {container} = render(<Button rounded={rounded}/>);
      expect(container).toMatchSnapshot();
      expect(container.firstChild).toHaveClass(buttonVariants({rounded}));
    });
  });

  it('render correctly with size prop', () => {
    sizes.forEach((size) => {
      const {container} = render(<Button size={size}/>);
      expect(container).toMatchSnapshot();
      expect(container.firstChild).toHaveClass(buttonVariants({size}));
    });
  });

  it('should render correctly with all props mix and handle click', () => {
    variants.map((variant) => {
      sizes.map((size) => {
        rounded.map((round) => {
          const handleClick = vi.fn();
          const {container} = render(
            <Button
              key={`${variant}-${size}-${round}`}
              text={`Variant: ${variant}, Size: ${size}, Rounded: ${round}`}
              variant={variant}
              size={size}
              rounded={round}
              leftIcon={<PlusIcon/>}
              onClick={handleClick}
            />
          );

          expect(container).toMatchSnapshot();
          expect(container.firstChild).toHaveClass(
            buttonVariants({size, variant, rounded: round})
          );

          const buttonElement = getByText(
            container,
            `Variant: ${variant}, Size: ${size}, Rounded: ${round}`
          );
          fireEvent.click(buttonElement);

          expect(handleClick).toHaveBeenCalled();
        });
      });
    });

    sizes.forEach((size) => {
      const {container} = render(<Button size={size}/>);
      expect(container).toMatchSnapshot();
      expect(container.firstChild).toHaveClass(buttonVariants({size}));
    });
  });

  it('button is disabled correctly', () => {
    const handleClick = vi.fn();
    const {container: containerDisabled} = render(
      <Button onClick={handleClick} disabled>
        Disabled button
      </Button>
    );

    expect(containerDisabled).toMatchSnapshot();
    expect(containerDisabled.firstChild).toHaveClass(
      'disabled:cursor-not-allowed'
    );

    const buttonElement = getByText(containerDisabled, 'Disabled button');
    fireEvent.click(buttonElement);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
