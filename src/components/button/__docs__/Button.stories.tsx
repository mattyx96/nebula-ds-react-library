import type {Meta, StoryObj} from '@storybook/react';
import {Button} from '../Button.tsx';
import {buttonRoundedVariants, buttonSizeVariants, buttonVariantVariants,} from '../../../variants/button';
import {PlusIcon} from '@heroicons/react/24/solid'; // More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {type: 'inline-radio'},
      options: buttonSizeVariants,
      table: {
        defaultValue: {
          summary: 'M',
        },
      },
    },
    leftIcon: {
      control: {type: 'select'},
      options: [undefined, <PlusIcon key="icon"/>],
    },
    rightIcon: {
      control: {type: 'select'},
      options: [undefined, <PlusIcon key="icon"/>],
    },
    variant: {
      control: {type: 'inline-radio'},
      defaultValue: 'filled',
      options: buttonVariantVariants,
      table: {
        defaultValue: {
          summary: 'filled',
        },
      },
    },
    rounded: {
      control: {type: 'inline-radio'},
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
    text: 'Button',
    size: 'M',
    variant: 'filled',
    rounded: 'Default',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    text: 'Button',
  },
};

export const Filled: Story = {
  render: () => (
    <div className="flex gap-5">
      {buttonRoundedVariants.map((rounded) => (
        <Button
          key={rounded}
          text="Button"
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
        <Button
          key={rounded}
          text="Button"
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
        <Button
          key={rounded}
          text="Button"
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
        <Button key={rounded} text="Button" variant="text" rounded={rounded}/>
      ))}
    </div>
  ),
};

export const Large: Story = {
  render: () => (
    <div className="flex gap-5">
      {buttonRoundedVariants.map((rounded) => (
        <Button
          key={rounded}
          text="Button"
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
        <Button
          key={rounded}
          text="Button"
          variant="filled"
          size="S"
          rounded={rounded}
        />
      ))}
    </div>
  ),
};
