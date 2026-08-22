import {render, screen, waitFor, within} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Button} from '../../button/Button';
import {ThemeProvider} from '../../themeProvider/ThemeProvider';
import {ToastProvider} from '../Toast.tsx';
import {useToast} from '../toastContext.ts';

const ToastDemo = () => {
  const toast = useToast();
  return <Button variant="standard" text="Fire" onClick={() => toast.success({title: 'Saved', description: 'Done.'})} />;
};

describe('Toast', () => {
  it('renders children and keeps the viewport empty by default', () => {
    const {container} = render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );

    expect(screen.getByRole('button', {name: 'Fire'})).toBeInTheDocument();
    // The store subscribes via the group machine, so the region exists but has no toasts yet.
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a toast when the store fires', async () => {
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );

    const fire = screen.getByRole('button', {name: 'Fire'});
    fire.click();

    const toast = await screen.findByRole('status');
    expect(toast).toHaveTextContent('Saved');
    expect(toast).toHaveTextContent('Done.');
  });

  it('renders multiple toasts', async () => {
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );

    const fire = screen.getByRole('button', {name: 'Fire'});
    fire.click();
    fire.click();

    await screen.findAllByRole('status');
    await waitFor(() => {
      expect(screen.getAllByRole('status')).toHaveLength(2);
    });
  });

  it('dismisses all toasts', async () => {
    const DismissAll = () => {
      const toast = useToast();
      return (
        <>
          <Button variant="standard" text="Fire" onClick={() => toast.error({title: 'Oops'})} />
          <Button variant="standard" text="Dismiss all" onClick={() => toast.dismiss()} />
        </>
      );
    };

    render(
      <ToastProvider>
        <DismissAll />
      </ToastProvider>
    );

    screen.getByRole('button', {name: 'Fire'}).click();
    await screen.findByRole('status');

    screen.getByRole('button', {name: 'Dismiss all'}).click();

    await waitFor(
      () => expect(screen.queryByRole('status', {name: /Oops/})).not.toBeInTheDocument(),
      {timeout: 2000}
    );
  });

  it('removes a toast via its close trigger', async () => {
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );

    screen.getByRole('button', {name: 'Fire'}).click();

    const toast = await screen.findByRole('status');
    const close = within(toast).getByRole('button', {name: 'Dismiss'});
    close.click();

    await waitFor(
      () => expect(screen.queryByRole('status')).not.toBeInTheDocument(),
      {timeout: 2000}
    );
  });

  it('carries the active theme onto the portaled viewport', async () => {
    render(
      <ThemeProvider theme="dark">
        <ToastProvider>
          <ToastDemo />
        </ToastProvider>
      </ThemeProvider>
    );

    screen.getByRole('button', {name: 'Fire'}).click();

    const toast = await screen.findByRole('status');

    // The viewport is portaled to <body>, outside the themed wrapper; it must
    // still resolve the dark-theme CSS variables by carrying data-nb-theme.
    const group = toast.closest('.nb-toast__group');
    expect(group).not.toBeNull();
    expect(group?.getAttribute('data-nb-theme')).toBe('dark');
  });
});