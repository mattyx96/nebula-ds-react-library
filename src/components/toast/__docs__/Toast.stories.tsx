import type {Meta, StoryObj} from '@storybook/react';
import {useRef} from 'react';
import {Button} from '../../button/Button';
import {Toaster, ToastProvider} from '../Toast.tsx';
import {createToastStore, useToast} from '../toastContext.ts';
import {Text} from '../../typography/Typography';
import {toastPlacementVariants, toastTypeVariants} from '../../../variants/toast';

type ToastType = (typeof toastTypeVariants)[number];

const TITLES: Record<ToastType, string> = {
  info: 'New message received',
  success: 'Changes saved',
  error: 'Connection lost',
  warning: 'Fuel low',
  loading: 'Warping…',
};

const DESCRIPTIONS: Record<ToastType, string> = {
  info: 'The Enterprise reports a prioritised hail from Starfleet.',
  success: 'Your configuration was persisted to ship memory.',
  error: 'Unable to reach the replicator subsystem. Retrying…',
  warning: 'Antimatter reserves are below 10%.',
  loading: 'Calculating the fastest route to the anomaly.',
};

type ToastDemoProps = {
  /**  Auto-fire one toast of this type on mount (via the store). */
  auto?: ToastType;
};

const ToastDemo = ({auto}: ToastDemoProps) => {
  const toast = useToast();
  const firedRef = useRef(false);

  const fire = (type: ToastType) => {
    toast.create({
      title: TITLES[type],
      description: DESCRIPTIONS[type],
      type,
      duration: type === 'loading' ? 4000 : undefined,
    });
  };

  if (auto && !firedRef.current) {
    firedRef.current = true;
    window.setTimeout(() => fire(auto), 50);
  }

  return (
    <div className="nb-demo-col">
      <Text component="h6" variant="header6">Toast notifications</Text>
      <div className="nb-demo-menu__row">
        {toastTypeVariants.map((type) => (
          <Button
            key={type}
            size="S"
            variant={type === 'error' ? 'outlined' : 'standard'}
            text={type}
            onClick={() => fire(type)}
          />
        ))}
      </div>
      <div className="nb-demo-menu__row">
        <Button
          size="S"
          variant="standard"
          text="With action"
          onClick={() =>
            toast.create({
              title: 'Deploy update?',
              description: 'The crew is requesting permission to install patch 4.2.',
              type: 'warning',
              closable: true,
              action: {
                label: 'Deploy',
                onClick: () => toast.success({title: 'Update deployed'}),
              },
            })
          }
        />
        <Button
          size="S"
          variant="standard"
          text="Dismiss all"
          onClick={() => toast.dismiss()}
        />
        <Button
          size="S"
          variant="standard"
          text="Remove all"
          onClick={() => toast.remove()}
        />
      </div>
      <Text component="span" variant="body3">
        Tip: toggle the theme in the toolbar, then re-trigger a toast to see the
        dark theme.
      </Text>
    </div>
  );
};

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  tags: ['autodocs', '!dev'],
  argTypes: {
    placement: {
      control: {type: 'inline-radio'},
      options: toastPlacementVariants,
      table: {defaultValue: {summary: 'bottom-end'}},
    },
    overlap: {control: {type: 'boolean'}},
    max: {control: {type: 'number'}},
  },
  args: {
    placement: 'bottom-end',
    overlap: false,
  },
} satisfies Meta<typeof ToastProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
};

export const AutoSuccess: Story = {
  render: () => (
    <ToastProvider placement="top-end">
      <ToastDemo auto="success" />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Auto-fires a success toast above the demo.',
      },
    },
  },
};

export const WithAction: Story = {
  render: () => (
    <ToastProvider placement="bottom-end">
      <ToastDemo auto="warning" />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Use the “With action” button to see the `action` option on a toast — clicking it runs `onClick` (here, firing a success toast) and dismisses.',
      },
    },
  },
};

export const OverlapMode: Story = {
  render: () => (
    <ToastProvider placement="bottom-end" overlap>
      <ToastDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '`overlap` collapses queued toasts into a compact stack.',
      },
    },
  },
};

// Module-level store: toasts can be fired from anywhere (no provider).
const globalStore = createToastStore({placement: 'bottom-end'});

const StandaloneDemo = () => {
  const toast = useToast(globalStore);

  return (
    <div className="nb-demo-col">
      <Text component="h6" variant="header6">Standalone Toaster (no provider)</Text>
      <div className="nb-demo-menu__row">
        <Button
          size="S"
          variant="standard"
          text="Fire from store"
          onClick={() => toast.success({title: 'Standalone toast', description: 'No <ToastProvider> required.'})}
        />
      </div>
      <Text component="span" variant="body3">
        The store is created at module scope with <code>createToastStore()</code>;
        the <code>&lt;Toaster store={'{…}'} /&gt;</code> viewport is mounted once. Great
        for firing toasts from non-React code.
      </Text>
    </div>
  );
};

export const StandaloneToaster: Story = {
  render: () => (
    <>
      <StandaloneDemo />
      <Toaster store={globalStore} />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Provider-free usage: create a store at module scope, mount a single `<Toaster store={store} />`, and fire toasts from anywhere — even outside React.',
      },
    },
  },
};