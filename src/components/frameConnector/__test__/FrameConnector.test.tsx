import {describe, expect} from 'vitest';
import {it} from 'vitest';
import {FrameConnector} from '../FrameConnector';
import {render} from "@testing-library/react";

describe('FrameConnector', () => {
  it('renders correctly', () => {
    const {container} = render(<FrameConnector/>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with className prop', () => {
    const {container} = render(<FrameConnector className="custom-class"/>);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with bridge className prop', () => {
    const {container} = render(<FrameConnector bridge={{className: 'bridge-class'}}/>);
    expect(container.firstChild).toMatchSnapshot();
    expect(container.querySelector('.bridge-class')).toBeInTheDocument();
  });

  it('renders correctly with firstNode props', () => {
    const firstNodeProps = {fill: 'red', className: 'first-node-class'};
    const {container} = render(<FrameConnector firstNode={firstNodeProps}/>);
    expect(container.firstChild).toMatchSnapshot();
    expect(container.querySelector('.first-node-class')).toBeInTheDocument();
  });

  it('renders correctly with secondNode props', () => {
    const secondNodeProps = {fill: 'blue', className: 'second-node-class'};
    const {container} = render(<FrameConnector secondNode={secondNodeProps}/>);
    expect(container.firstChild).toMatchSnapshot();
    expect(container.querySelector('.second-node-class')).toBeInTheDocument();
  });

  it('hides nodes correctly with hidden prop', () => {
    const {container} = render(<FrameConnector firstNode={{hidden: true}} secondNode={{hidden: true}}/>);
    expect(container.firstChild).toMatchSnapshot();
    expect(container.querySelector('svg')).toBeNull();
  });

  it('handles divider prop correctly', () => {
    const {container} = render(<FrameConnector divider/>);
    expect(container.firstChild).toMatchSnapshot();
    expect(container.querySelector('svg')).toBeNull();
  });

  it('renders correctly with all props mixed', () => {
    const props = {
      className: 'custom-class',
      bridge: {className: 'bridge-class'},
      firstNode: {fill: 'red', className: 'first-node-class'},
      secondNode: {fill: 'blue', className: 'second-node-class'},
    };
    const {container} = render(<FrameConnector {...props} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
    expect(container.querySelector('.bridge-class')).toBeInTheDocument();
    expect(container.querySelector('.first-node-class')).toBeInTheDocument();
    expect(container.querySelector('.second-node-class')).toBeInTheDocument();
  });
});
