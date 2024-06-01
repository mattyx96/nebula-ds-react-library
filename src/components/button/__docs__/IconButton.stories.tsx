import type { Meta, StoryObj } from '@storybook/react';
import {
  buttonRoundedVariants,
  buttonSizeVariants,
  buttonVariantVariants,
} from '../../../variants/button';
import { IconButton } from '../IconButton.tsx';
import { PlusIcon } from '@heroicons/react/24/solid';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: { disable: true },
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    size: {
      control: { type: 'inline-radio' },
      options: buttonSizeVariants,
      table: {
        defaultValue: {
          summary: 'M',
        },
      },
    },
    variant: {
      control: { type: 'inline-radio' },
      defaultValue: 'filled',
      options: buttonVariantVariants,
      table: {
        defaultValue: {
          summary: 'filled',
        },
      },
    },
    rounded: {
      control: { type: 'inline-radio' },
      options: buttonRoundedVariants,
      defaultValue: 'Default',
      table: {
        defaultValue: {
          summary: 'Default',
        },
      },
    },
  },
  args: {
    size: 'M',
    icon: <PlusIcon />,
    variant: 'filled',
    rounded: 'Default',
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    icon: <PlusIcon />,
  },
};

export const Filled: Story = {
  render: () => (
    <div className="flex gap-5">
      {buttonRoundedVariants.map((rounded) => (
        <IconButton
          key={rounded}
          icon={<PlusIcon />}
          variant="filled"
          rounded={rounded}
        />
      ))}
    </div>
  ),
};

export const Outlined: Story = {
  render: () => (
    <div className="flex gap-5">
      {buttonRoundedVariants.map((rounded) => (
        <IconButton
          key={rounded}
          icon={<PlusIcon />}
          variant="outlined"
          rounded={rounded}
        />
      ))}
    </div>
  ),
};

export const Standard: Story = {
  render: () => (
    <div className="flex gap-5">
      {buttonRoundedVariants.map((rounded) => (
        <IconButton
          key={rounded}
          icon={<PlusIcon />}
          variant="standard"
          rounded={rounded}
        />
      ))}
    </div>
  ),
};

export const Text: Story = {
  render: () => (
    <div className="flex gap-5">
      {buttonRoundedVariants.map((rounded) => (
        <IconButton
          key={rounded}
          icon={<PlusIcon />}
          variant="text"
          rounded={rounded}
        />
      ))}
    </div>
  ),
};

export const Large: Story = {
  render: () => (
    <div className="flex gap-5">
      {buttonRoundedVariants.map((rounded) => (
        <IconButton
          key={rounded}
          icon={<PlusIcon />}
          variant="filled"
          size="L"
          rounded={rounded}
        />
      ))}
    </div>
  ),
};

export const Small: Story = {
  render: () => (
    <div className="flex gap-5">
      {buttonRoundedVariants.map((rounded) => (
        <IconButton
          key={rounded}
          icon={<PlusIcon />}
          variant="filled"
          size="S"
          rounded={rounded}
        />
      ))}
    </div>
  ),
};
