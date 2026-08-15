import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {useState} from 'react';
import {describe, expect, it, vi} from 'vitest';
import {Menu, type MenuItem} from '../Menu.tsx';
import {clsxMerge} from '../../../common/utils/classNameUtils.ts';
import {
  menuContentVariants,
  menuVariants,
} from '../../../variants/menu';

const items: MenuItem[] = [
  {value: 'edit', text: 'Edit'},
  {value: 'duplicate', text: 'Duplicate'},
  {value: 'delete', text: 'Delete'},
];

describe('Menu', () => {
  it('renders the trigger and keeps the content hidden by default', () => {
    const {container} = render(<Menu text="Actions" items={items}/>);

    const trigger = screen.getByRole('button', {name: 'Actions'});
    const content = screen.getByRole('menu', {hidden: true});

    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(content).toHaveAttribute('hidden');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('opens on trigger click', async () => {
    render(<Menu text="Actions" items={items}/>);

    const trigger = screen.getByRole('button', {name: 'Actions'});
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('menu', {hidden: true})).not.toHaveAttribute('hidden');
    });
  });

  it('selects an item on click and calls onSelect', async () => {
    const onSelect = vi.fn();
    render(<Menu text="Actions" onSelect={onSelect} items={items}/>);

    fireEvent.click(screen.getByRole('button', {name: 'Actions'}));
    const content = screen.getByRole('menu', {hidden: true});
    await waitFor(() => expect(content).not.toHaveAttribute('hidden'));

    fireEvent.keyDown(content, {key: 'ArrowDown'});
    const editItem = screen.getByRole('menuitem', {name: 'Edit', hidden: true});
    await waitFor(() => expect(editItem).toHaveAttribute('data-highlighted'));

    fireEvent.click(editItem);

    await waitFor(() => expect(onSelect).toHaveBeenCalledWith('edit'));
  });

  it('does not select disabled items', async () => {
    const onSelect = vi.fn();
    const menuItems: MenuItem[] = [
      {value: 'edit', text: 'Edit'},
      {value: 'download', text: 'Download', disabled: true},
    ];
    render(<Menu text="Actions" onSelect={onSelect} items={menuItems}/>);

    fireEvent.click(screen.getByRole('button', {name: 'Actions'}));
    await waitFor(() =>
      expect(screen.getByRole('menu', {hidden: true})).not.toHaveAttribute('hidden')
    );

    const disabledItem = screen.getByRole('menuitem', {
      name: 'Download',
      hidden: true,
    });
    expect(disabledItem).toHaveAttribute('aria-disabled', 'true');

    fireEvent.click(disabledItem);
    await waitFor(() => expect(onSelect).not.toHaveBeenCalled());
  });

  it('closes after selection', async () => {
    render(<Menu text="Actions" items={items}/>);

    fireEvent.click(screen.getByRole('button', {name: 'Actions'}));
    await waitFor(() =>
      expect(screen.getByRole('menu', {hidden: true})).not.toHaveAttribute('hidden')
    );

    fireEvent.click(screen.getByRole('menuitem', {name: 'Edit', hidden: true}));
    await waitFor(() =>
      expect(screen.getByRole('menu', {hidden: true})).toHaveAttribute('hidden')
    );
  });

  it('calls per-item onSelect when the item is selected', async () => {
    const onItemSelect = vi.fn();
    const menuItems: MenuItem[] = [
      {value: 'edit', text: 'Edit', onSelect: onItemSelect},
      {value: 'duplicate', text: 'Duplicate'},
    ];
    render(<Menu text="Actions" items={menuItems}/>);

    fireEvent.click(screen.getByRole('button', {name: 'Actions'}));
    const content = screen.getByRole('menu', {hidden: true});
    await waitFor(() => expect(content).not.toHaveAttribute('hidden'));

    fireEvent.keyDown(content, {key: 'ArrowDown'});
    const editItem = screen.getByRole('menuitem', {name: 'Edit', hidden: true});
    await waitFor(() => expect(editItem).toHaveAttribute('data-highlighted'));

    fireEvent.click(editItem);

    await waitFor(() => expect(onItemSelect).toHaveBeenCalledWith('edit'));
  });

  it('supports controlled open state', async () => {
    const onOpenChange = vi.fn();
    const Controlled = () => {
      const [open, setOpen] = useState(false);
      return (
        <Menu
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

    const trigger = screen.getByRole('button', {name: 'Actions'});
    expect(screen.getByRole('menu', {hidden: true})).toHaveAttribute('hidden');

    fireEvent.click(trigger);
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(screen.getByRole('menu', {hidden: true})).not.toHaveAttribute('hidden');
    });

    fireEvent.click(trigger);
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
      expect(screen.getByRole('menu', {hidden: true})).toHaveAttribute('hidden');
    });
  });

  it('selects the highlighted item via keyboard', async () => {
    const onSelect = vi.fn();
    render(<Menu text="Actions" onSelect={onSelect} items={items}/>);

    const trigger = screen.getByRole('button', {name: 'Actions'});
    fireEvent.focus(trigger);
    fireEvent.keyDown(trigger, {key: 'ArrowDown'});

    const content = screen.getByRole('menu', {hidden: true});
    await waitFor(() => expect(content).not.toHaveAttribute('hidden'));

    fireEvent.keyDown(content, {key: 'Enter'});

    await waitFor(() => expect(onSelect).toHaveBeenCalledWith('edit'));
  });

  it('renders separators', async () => {
    const menuItems: MenuItem[] = [
      {value: 'new', text: 'New File'},
      {value: 'separator-1', separator: true},
      {value: 'edit', text: 'Edit'},
    ];
    render(<Menu text="Actions" items={menuItems}/>);

    fireEvent.click(screen.getByRole('button', {name: 'Actions'}));

    await waitFor(() => {
      expect(screen.getAllByRole('separator', {hidden: true})).toHaveLength(1);
    });
  });

  it('aligns the dropdown relative to the trigger', async () => {
    render(<Menu text="Actions" align="end" items={items}/>);

    fireEvent.click(screen.getByRole('button', {name: 'Actions'}));

    const content = screen.getByRole('menu', {hidden: true});
    await waitFor(() => expect(content).toHaveAttribute('data-placement', 'bottom-end'));
  });

  it('applies the design system variant classes', () => {
    const {container} = render(
      <Menu text="Actions" size="L" variant="outlined" round="lg" outline="200" align="end" items={items}/>
    );

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass(clsxMerge(menuVariants({size: 'L'})));

    const trigger = screen.getByRole('button', {name: 'Actions'});
    expect(trigger).toHaveClass('nb-menu__trigger');
    expect(trigger).toHaveClass('nb-button--size-l');
    expect(trigger).toHaveClass('nb-button--outlined');

    const content = screen.getByRole('menu', {hidden: true});
    expect(content).toHaveClass(
      clsxMerge(menuContentVariants({round: 'lg', outline: '200'}))
    );
  });
});
