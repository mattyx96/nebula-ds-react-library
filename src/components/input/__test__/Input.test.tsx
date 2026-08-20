import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Input} from '../Input.tsx';
import {clsxMerge} from '../../../common/utils/classNameUtils.ts';
import {inputVariants} from '../../../variants/input';

describe('Input', () => {
  it('renders an input with the given label', () => {
    const {container} = render(<Input label="Username"/>);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a required asterisk', () => {
    render(<Input label="Username" isRequired/>);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows errors', () => {
    render(<Input label="Username" errors={['Required']}/>);
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows helper text when no errors', () => {
    render(<Input label="Username" helperText="A hint"/>);
    expect(screen.getByText('A hint')).toBeInTheDocument();
    expect(screen.queryByText('Required')).not.toBeInTheDocument();
  });

  it('applies variant and size classes', () => {
    const {container} = render(<Input label="Username" variant="filled" size="L" rounded="R"/>);

    const input = screen.getByLabelText('Username');
    expect(input).toHaveClass(clsxMerge(inputVariants({variant: 'filled', size: 'L', rounded: 'R'})));
    expect(container.firstChild).toBeTruthy();
  });

  it('forwards value and onChange', () => {
    const onChange = vi.fn();
    render(<Input label="Username" value="ab" onChange={onChange}/>);

    fireEvent.change(screen.getByLabelText('Username'), {target: {value: 'abc'}});
    expect(onChange).toHaveBeenCalled();
  });

  it('supports fullWidth', () => {
    const {container} = render(<Input label="Username" fullWidth/>);
    expect(container.firstChild).toHaveClass('nb-input__wrapper--full');
  });

  it('respects disabled', () => {
    render(<Input label="Username" disabled/>);
    expect(screen.getByLabelText('Username')).toBeDisabled();
  });
});
