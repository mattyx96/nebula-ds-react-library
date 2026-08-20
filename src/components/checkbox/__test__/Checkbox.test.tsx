import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Checkbox} from '../Checkbox.tsx';
import {clsxMerge} from '../../../common/utils/classNameUtils.ts';
import {checkboxVariants} from '../../../variants/checkbox';

describe('Checkbox', () => {
  it('renders a label and an unchecked checkbox', () => {
    const {container} = render(<Checkbox label="Remember me"/>);

    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('shows the checked state when defaultChecked', () => {
    render(<Checkbox label="Remember me" defaultChecked/>);
    expect(screen.getByLabelText('Remember me')).toBeChecked();
  });

  it('toggles on click and calls onCheckedChange', async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Remember me" onCheckedChange={onCheckedChange}/>);

    fireEvent.click(screen.getByLabelText('Remember me'));

    await waitFor(() => expect(onCheckedChange).toHaveBeenCalledWith(true));
    expect(screen.getByLabelText('Remember me')).toBeChecked();
  });

  it('supports controlled checked state', async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Remember me" checked onCheckedChange={onCheckedChange}/>);

    fireEvent.click(screen.getByLabelText('Remember me'));
    await waitFor(() => expect(onCheckedChange).toHaveBeenCalledWith(false));
  });

  it('supports indeterminate state', () => {
    const {container} = render(<Checkbox label="Select all" defaultChecked="indeterminate"/>);

    const control = container.querySelector('.nb-checkbox');
    expect(control).toHaveAttribute('data-state', 'indeterminate');
    expect(screen.getByText('Select all')).toBeInTheDocument();
  });

  it('respects disabled', () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Remember me" disabled onCheckedChange={onCheckedChange}/>);

    fireEvent.click(screen.getByLabelText('Remember me'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('applies size and rounded classes to the control', () => {
    const {container} = render(<Checkbox label="Remember me" size="L" rounded="R"/>);

    const control = container.querySelector('.nb-checkbox');
    expect(control).toHaveClass(clsxMerge(checkboxVariants({size: 'L', rounded: 'R'})));
  });
});
