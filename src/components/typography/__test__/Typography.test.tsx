import {render} from '@testing-library/react';
import {Tags, Text} from '../Typography.tsx';
import {describe, expect, it} from 'vitest';
import {typographyVariantVariants, typographyWeightVariants} from "../../../variants/typography";

describe('Text', () => {
  it('renders correctly', () => {
    const {container} = render(<Text text="Sample Text"/>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with different variants', () => {
    typographyVariantVariants.forEach((variant) => {
      const {container} = render(<Text text={`Text with ${variant}`} variant={variant}/>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders correctly with different components', () => {
    const components: Tags[] = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    components.forEach((component) => {
      const {container} = render(<Text text={`Text as ${component}`} component={component}/>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders correctly with different weights', () => {
    typographyWeightVariants.forEach((weight) => {
      const {container} = render(<Text text={`Text with weight ${weight}`} weight={weight}/>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders correctly with children', () => {
    const {container} = render(<Text>Child Text</Text>);
    expect(container.firstChild).toHaveTextContent('Child Text');
  });

  it('handles className prop correctly', () => {
    const {container} = render(<Text text="Class Name Text" className="custom-class"/>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
