import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {Dialog} from '../Dialog.tsx';
import {menuSizeVariants, menuVariantVariants, menuRoundedVariants} from '../../../variants/menu';
import {Button} from '../../button/Button.tsx';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs', '!dev'],
  parameters: {
    docs: {
      description: {
        component: [
          'Modal (or non-modal) dialog behind a Button-style trigger. `title` names the dialog; `children` is the body — put the action row there and make "Cancel" close it.',
          'For destructive confirmations pass `role="alertdialog"` and keep the confirm button `filled`, everything else `standard` (see `examples/` / the recipes for the full pattern with Flash + Toast).',
          'Controlled open state: `open` + `onOpenChange`. `modal: false` for a non-blocking dialog.',
        ].join('\n\n'),
      },
    },
  },
  argTypes: {
    size: {
      control: {type: 'inline-radio'},
      options: menuSizeVariants,
      table: {defaultValue: {summary: 'M'}},
    },
    variant: {
      control: {type: 'inline-radio'},
      options: menuVariantVariants,
      table: {defaultValue: {summary: 'filled'}},
    },
    rounded: {
      control: {type: 'inline-radio'},
      options: menuRoundedVariants,
      table: {defaultValue: {summary: 'Default'}},
    },
    trigger: {control: {disable: true}},
    children: {control: {disable: true}},
  },
  args: {
    text: 'Open Dialog',
    title: 'Edit profile',
    description: 'Make changes to your profile here.',
    size: 'M',
    variant: 'filled',
    rounded: 'Default',
    children: (
      <div className="nb-demo-col">
        <Button variant="standard" size="S" text="Cancel"/>
        <Button variant="filled" size="S" rounded="R" text="Save changes"/>
      </div>
    ),
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomContent: Story = {
  args: {
    title: 'Confirm deletion',
    description: 'This action cannot be undone.',
    variant: 'outlined',
    children: (
      <div className="nb-demo-row">
        <Button variant="standard" size="S" text="Cancel"/>
        <Button variant="filled" size="S" rounded="R" text="Delete"/>
      </div>
    ),
  },
};

export const NonModal: Story = {
  args: {modal: false},
};

export const Sizes: Story = {
  render: () => (
    <div className="nb-demo-row">
      {menuSizeVariants.map((size) => (
        <Dialog
          key={size}
          text={`Size ${size}`}
          size={size}
          title="Edit profile"
          description={`A ${size} dialog.`}
        >
          Done.
        </Dialog>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="nb-demo-row">
      {menuVariantVariants.map((variant) => (
        <Dialog
          key={variant}
          text={variant}
          variant={variant}
          title="Edit profile"
          description="Make changes."
        >
          Done.
        </Dialog>
      ))}
    </div>
  ),
};

export const Controlled = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dialog
        text="Controlled Dialog"
        variant="outlined"
        title="Controlled"
        description="Open state is controlled externally."
        open={open}
        onOpenChange={setOpen}
      >
        <Button variant="standard" size="S" text="Close" onClick={() => setOpen(false)}/>
      </Dialog>
    );
  },
} satisfies StoryObj;
