import {render} from '@testing-library/react';
import {describe, expect, it, beforeAll, vi} from 'vitest';
import {Horizon} from '../Horizon';

// Extend the SVGElement type to include the getBBox method
declare global {
  interface SVGElement {
    getBBox(): { x: number; y: number; width: number; height: number };
  }
}

describe('Horizon', () => {
  // Mock getBBox method
  beforeAll(() => {
    SVGElement.prototype.getBBox = vi.fn().mockImplementation(() => ({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    }));
  });

  it('renders correctly with default props', () => {
    const {container} = render(<Horizon/>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with className prop', () => {
    const {container} = render(<Horizon className="custom-class"/>);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with custom color', () => {
    const {container} = render(<Horizon color="red"/>);
    const paths = container.querySelectorAll('path');
    paths.forEach(path => {
      expect(path).toHaveAttribute('stroke', 'red');
    });
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with custom number of lines', () => {
    const {container} = render(<Horizon numLines={30}/>);
    const paths = container.querySelectorAll('path');
    expect(paths).toHaveLength(30);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with custom line thickness', () => {
    const lineThickness = 20;
    const thicknessDecayFactor = 0.95;
    const numLines = 30;

    const {container} = render(
      <Horizon lineThickness={lineThickness} thicknessDecayFactor={thicknessDecayFactor} numLines={numLines}/>
    );

    const paths = container.querySelectorAll('path');
    let currentThickness = lineThickness;
    paths.forEach((path) => {
      expect(path).toHaveAttribute('stroke-width', currentThickness.toString());
      currentThickness *= thicknessDecayFactor; // Update the thickness for the next path
    });
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with custom distance and distance growth factor', () => {
    const {container} = render(<Horizon distance={15} distanceGrowthFactor={1.1}/>);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with custom thickness decay factor', () => {
    const {container} = render(<Horizon thicknessDecayFactor={0.9}/>);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with inverse prop', () => {
    const {container} = render(<Horizon inverse/>);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with custom height and width', () => {
    const {container} = render(<Horizon height={500} width={500}/>);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('height', '500');
    expect(svgElement).toHaveAttribute('width', '500');
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with all props mixed', () => {
    const props = {
      color: 'blue',
      numLines: 40,
      lineThickness: 15,
      distance: 20,
      distanceGrowthFactor: 1.2,
      thicknessDecayFactor: 0.85,
      className: 'custom-class',
      height: 600,
      width: 800,
      inverse: true,
    };
    const {container} = render(<Horizon {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
