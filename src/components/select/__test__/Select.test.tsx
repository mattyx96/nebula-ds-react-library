import {fireEvent, render, screen, waitFor, within} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Select} from '../Select.tsx';
import {clsxMerge} from '../../../common/utils/classNameUtils.ts';
import {selectContentVariants} from '../../../variants/select';

const items = [
  {label: 'Nigeria', value: 'NG'},
  {label: 'Japan', value: 'JP'},
  {label: 'Italy', value: 'IT'},
];

const getTrigger = () => {
  const comboboxes = screen.getAllByRole('combobox', {hidden: true});
  return comboboxes.find((el) => el.hasAttribute('aria-expanded')) as HTMLElement;
};

const getListbox = () => screen.getByRole('listbox', {hidden: true});

const openListbox = async () => {
  const trigger = getTrigger();
  fireEvent.click(trigger);
  const listbox = getListbox();
  await waitFor(() => expect(listbox).not.toHaveAttribute('hidden'));
  return {trigger, listbox};
};

describe('Select', () => {
  it('renders the label, trigger and hidden native select', () => {
    const {container} = render(<Select label="Country" items={items}/>);

    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(getTrigger()).toBeInTheDocument();
    expect(screen.getByRole('combobox', {hidden: true, name: ''})).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('opens the listbox on trigger click', async () => {
    render(<Select items={items}/>);
    const {listbox} = await openListbox();
    expect(within(listbox).getByText('Nigeria')).toBeInTheDocument();
  });

  it('selects an item and calls onValueChange + onSelect', async () => {
    const onValueChange = vi.fn();
    const onSelect = vi.fn();
    render(<Select items={items} onValueChange={onValueChange} onSelect={onSelect}/>);
    const {listbox} = await openListbox();

    fireEvent.click(within(listbox).getByText('Japan'));

    await waitFor(() => {
      expect(onSelect).toHaveBeenCalledWith('JP');
      expect(onValueChange).toHaveBeenCalledWith(['JP']);
    });
  });

  it('shows the selected value as the trigger text', async () => {
    render(<Select items={items}/>);
    const {listbox} = await openListbox();

    fireEvent.click(within(listbox).getByText('Nigeria'));

    await waitFor(() => {
      expect(getTrigger()).toHaveTextContent('Nigeria');
    });
  });

  it('respects defaultValue', () => {
    render(<Select items={items} defaultValue={['IT']}/>);
    expect(getTrigger()).toHaveTextContent('Italy');
  });

  it('closes after selection by default', async () => {
    render(<Select items={items}/>);
    const {listbox} = await openListbox();

    fireEvent.click(within(listbox).getByText('Japan'));

    await waitFor(() => expect(listbox).toHaveAttribute('hidden'));
  });

  it('does not select disabled items', async () => {
    const onValueChange = vi.fn();
    const withDisabled = [
      {label: 'Nigeria', value: 'NG'},
      {label: 'Japan', value: 'JP', disabled: true},
    ];
    render(<Select items={withDisabled} onValueChange={onValueChange}/>);
    const {listbox} = await openListbox();

    fireEvent.click(within(listbox).getByText('Japan'));

    await waitFor(() => expect(onValueChange).not.toHaveBeenCalled());
  });

  it('applies the design system variant classes', () => {
    const {container} = render(<Select items={items} round="lg" outline="200"/>);

    expect((container.firstChild as HTMLElement)).toHaveClass('nb-select');

    const content = getListbox();
    expect(content).toHaveClass(clsxMerge(selectContentVariants({round: 'lg', outline: '200'})));
  });
});
