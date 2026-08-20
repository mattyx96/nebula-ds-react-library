import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {RadioGroup} from '../RadioGroup.tsx';
import {radioOrientationVariants, radioRoundedVariants, radioSizeVariants} from '../../../variants/radioGroup';

const fruits = [
  {value: 'apple', label: 'Apples'},
  {value: 'orange', label: 'Oranges'},
  {value: 'mango', label: 'Mangoes'},
  {value: 'grape', label: 'Grapes'},
];

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs', '!dev'],
  argTypes: {
    items: {control: {disable: true}},
    orientation: {
      control: {type: 'inline-radio'},
      options: radioOrientationVariants,
      table: {defaultValue: {summary: 'vertical'}},
    },
    size: {
      control: {type: 'inline-radio'},
      options: radioSizeVariants,
      table: {defaultValue: {summary: 'M'}},
    },
    rounded: {
      control: {type: 'inline-radio'},
      options: radioRoundedVariants,
      table: {defaultValue: {summary: 'Default'}},
    },
    label: {control: {type: 'text'}},
    disabled: {control: {type: 'boolean'}},
    invalid: {control: {type: 'boolean'}},
    required: {control: {type: 'boolean'}},
  },
  args: {
    label: 'Pick a fruit',
    items: fruits,
    size: 'M',
    rounded: 'Default',
    orientation: 'vertical',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: {defaultValue: 'orange'},
};

export const Horizontal: Story = {
  args: {orientation: 'horizontal', label: 'Pick a fruit (horizontal)'},
};

export const Disabled: Story = {
  args: {disabled: true},
};

export const Invalid: Story = {
  args: {invalid: true},
};

export const Sizes: Story = {
  render: () => (
    <div className="nb-demo-col">
      {radioSizeVariants.map((size) => (
        <RadioGroup
          key={size}
          size={size}
          label={`Size ${size}`}
          defaultValue="apple"
          items={fruits}
        />
      ))}
    </div>
  ),
};

export const RoundedCorners: Story = {
  render: () => (
    <div className="nb-demo-col">
      {radioRoundedVariants.map((rounded) => (
        <RadioGroup
          key={rounded}
          rounded={rounded}
          label={String(rounded)}
          defaultValue="apple"
          items={fruits.slice(0, 2)}
        />
      ))}
    </div>
  ),
};

export const Controlled = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div className="nb-demo-col">
        <RadioGroup
          label="Controlled"
          items={fruits}
          value={value}
          onValueChange={setValue}
        />
        <span>Value: {value ?? '(none)'}</span>
      </div>
    );
  },
} satisfies StoryObj;
