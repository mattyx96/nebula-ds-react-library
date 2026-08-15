import {useState} from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Sheet} from '../Sheet.tsx';
import type {MenuItem} from '../../../common/types';

const items: MenuItem[] = [
  {value: 'edit', text: 'Edit'},
  {value: 'duplicate', text: 'Duplicate'},
  {value: 'delete', text: 'Delete'},
];

describe('Sheet', () => {
  it('renders the trigger with the content hidden by default', () => {
    const {container} = render(<Sheet text="Actions" items={items}/>);

    const trigger = screen.getByRole('button', {name: 'Actions'});
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('dialog', {hidden: true})).toHaveAttribute('hidden');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('opens the sheet on trigger click', async () => {
    render(<Sheet text="Actions" items={items}/>);

    const trigger = screen.getByRole('button', {name: 'Actions'});
    fireEvent.click(trigger);

    const dialog = await screen.findByRole('dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await waitFor(() => expect(dialog).not.toHaveAttribute('hidden'));
  });

  it('selects an item, calls onSelect and closes', async () => {
    const onSelect = vi.fn();
    render(<Sheet text="Actions" onSelect={onSelect} items={items}/>);

    fireEvent.click(screen.getByRole('button', {name: 'Actions'}));
    await screen.findByRole('dialog');

    fireEvent.click(screen.getByRole('button', {name: 'Edit'}));

    await waitFor(() => expect(onSelect).toHaveBeenCalledWith('edit'));
    await waitFor(() =>
      expect(screen.getByRole('dialog', {hidden: true})).toHaveAttribute('hidden')
    );
  });

  it('calls per-item onSelect when selected', async () => {
    const onItemSelect = vi.fn();
    const menuItems: MenuItem[] = [
      {value: 'edit', text: 'Edit', onSelect: onItemSelect},
    ];
    render(<Sheet text="Actions" items={menuItems}/>);

    fireEvent.click(screen.getByRole('button', {name: 'Actions'}));
    await screen.findByRole('dialog');

    fireEvent.click(screen.getByRole('button', {name: 'Edit'}));

    await waitFor(() => expect(onItemSelect).toHaveBeenCalledWith('edit'));
  });

  it('does not select disabled items', async () => {
    const onSelect = vi.fn();
    const menuItems: MenuItem[] = [
      {value: 'edit', text: 'Edit'},
      {value: 'download', text: 'Download', disabled: true},
    ];
    render(<Sheet text="Actions" onSelect={onSelect} items={menuItems}/>);

    fireEvent.click(screen.getByRole('button', {name: 'Actions'}));
    await screen.findByRole('dialog');

    const disabled = screen.getByRole('button', {name: 'Download'});
    expect(disabled).toBeDisabled();
    fireEvent.click(disabled);

    await waitFor(() => expect(onSelect).not.toHaveBeenCalled());
  });

  it('renders a title when provided', async () => {
    render(<Sheet text="Actions" title="Actions Sheet" items={items}/>);

    fireEvent.click(screen.getByRole('button', {name: 'Actions'}));

    expect(await screen.findByText('Actions Sheet')).toBeInTheDocument();
  });

  it('supports controlled open state', async () => {
    const onOpenChange = vi.fn();
    const Controlled = () => {
      const [open, setOpen] = useState(false);
      return (
        <Sheet
          text="Actions"
          open={open}
          onOpenChange={(next) => {
            onOpenChange(next);
            setOpen(next);
          }}
          items={items}
        />
      );
    };

    render(<Controlled/>);

    fireEvent.click(screen.getByRole('button', {name: 'Actions'}));

    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true));
    await waitFor(() =>
      expect(screen.getByRole('dialog')).not.toHaveAttribute('hidden')
    );
  });
});
