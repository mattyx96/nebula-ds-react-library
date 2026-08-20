import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {RadioGroup} from '../RadioGroup.tsx';
import {clsxMerge} from '../../../common/utils/classNameUtils.ts';
import {radioItemVariants} from '../../../variants/radioGroup';

const items = [
  {value: 'apple', label: 'Apples'},
  {value: 'orange', label: 'Oranges'},
  {value: 'mango', label: 'Mangoes'},
];

describe('RadioGroup', () => {
  it('renders a group label and all options', () => {
    const {container} = render(<RadioGroup label="Fruits" items={items}/>);

    expect(screen.getByText('Fruits')).toBeInTheDocument();
    items.forEach((item) => expect(screen.getByText(item.label)).toBeInTheDocument());
    expect(container.firstChild).toMatchSnapshot();
  });

  it('checks the default value', () => {
    render(<RadioGroup label="Fruits" items={items} defaultValue="orange"/>);
    expect(screen.getByLabelText('Oranges')).toBeChecked();
  });

  it('selects an option and calls onValueChange', async () => {
    const onValueChange = vi.fn();
    render(<RadioGroup label="Fruits" items={items} onValueChange={onValueChange}/>);

    fireEvent.click(screen.getByLabelText('Mangoes'));

    await waitFor(() => expect(onValueChange).toHaveBeenCalledWith('mango'));
    expect(screen.getByLabelText('Mangoes')).toBeChecked();
  });

  it('supports controlled value', async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup
        label="Fruits"
        items={items}
        value="apple"
        onValueChange={onValueChange}
      />
    );

    expect(screen.getByLabelText('Apples')).toBeChecked();

    fireEvent.click(screen.getByLabelText('Oranges'));
    await waitFor(() => expect(onValueChange).toHaveBeenCalledWith('orange'));
  });

  it('respects disabled', () => {
    const onValueChange = vi.fn();
    render(<RadioGroup label="Fruits" items={items} disabled onValueChange={onValueChange}/>);

    fireEvent.click(screen.getByLabelText('Oranges'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('applies size and rounded classes to the controls', () => {
    const {container} = render(
      <RadioGroup label="Fruits" items={items} size="L" rounded="R"/>
    );

    const control = container.querySelector('.nb-radio__control');
    expect(control).toHaveClass(clsxMerge(radioItemVariants({size: 'L', rounded: 'R'})));
  });

  it('renders a horizontal layout', () => {
    const {container} = render(<RadioGroup label="Fruits" items={items} orientation="horizontal"/>);

    expect(container.querySelector('.nb-radio-group--horizontal')).toBeInTheDocument();
  });
});
