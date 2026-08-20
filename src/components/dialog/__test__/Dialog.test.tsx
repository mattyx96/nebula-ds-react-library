import {useState} from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Dialog} from '../Dialog.tsx';

describe('Dialog', () => {
  it('renders the trigger and keeps the dialog hidden by default', () => {
    const {container} = render(<Dialog text="Open" title="Title"/>);

    expect(screen.getByRole('button', {name: 'Open'})).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('opens the dialog on trigger click', async () => {
    render(<Dialog text="Open" title="Title" description="Desc">
      <span>Body</span>
    </Dialog>);

    fireEvent.click(screen.getByRole('button', {name: 'Open'}));

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveTextContent('Title');
    expect(screen.getByText('Desc')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('closes via the close trigger', async () => {
    render(<Dialog text="Open" title="Title">Body</Dialog>);

    fireEvent.click(screen.getByRole('button', {name: 'Open'}));
    await screen.findByRole('dialog');

    fireEvent.click(screen.getByRole('button', {name: 'Close'}));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('closes via Escape', async () => {
    render(<Dialog text="Open" title="Title">Body</Dialog>);

    fireEvent.click(screen.getByRole('button', {name: 'Open'}));
    await screen.findByRole('dialog');

    // Give the dismissable (escape) effect a beat to attach its document listener.
    await new Promise((r) => setTimeout(r, 50));

    const esc = new KeyboardEvent('keydown', {key: 'Escape', bubbles: true, cancelable: true});
    document.dispatchEvent(esc);

    await waitFor(
      () => expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
      {timeout: 2000}
    );
  });

  it('supports controlled open state', async () => {
    const onOpenChange = vi.fn();
    const Controlled = () => {
      const [open, setOpen] = useState(false);
      return (
        <Dialog
          text="Open"
          title="Title"
          open={open}
          onOpenChange={(next) => {
            onOpenChange(next);
            setOpen(next);
          }}
        />
      );
    };

    render(<Controlled/>);

    fireEvent.click(screen.getByRole('button', {name: 'Open'}));

    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true));
    await screen.findByRole('dialog');
  });
});
