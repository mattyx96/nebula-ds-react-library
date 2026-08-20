import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {Select} from '../Select.tsx';
import {
  selectRoundedVariants,
  selectOutlineVariants,
  selectRoundVariants,
  selectSizeVariants,
  selectVariantVariants,
} from '../../../variants/select';
import {ChevronDownIcon} from '@heroicons/react/24/solid';

const countries = [
  {label: 'Nigeria', value: 'NG'},
  {label: 'Japan', value: 'JP'},
  {label: 'Korea', value: 'KO'},
  {label: 'Kenya', value: 'KE'},
  {label: 'Italy', value: 'IT'},
  {label: 'United Kingdom', value: 'UK'},
  {label: 'Ghana', value: 'GH'},
];

const chevron = <ChevronDownIcon width={16} height={16}/>;

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs', '!dev'],
  argTypes: {
    size: {
      control: {type: 'inline-radio'},
      options: selectSizeVariants,
      table: {defaultValue: {summary: 'M'}},
    },
    variant: {
      control: {type: 'inline-radio'},
      options: selectVariantVariants,
      table: {defaultValue: {summary: 'filled'}},
    },
    rounded: {
      control: {type: 'inline-radio'},
      options: selectRoundedVariants,
      table: {defaultValue: {summary: 'Default'}},
    },
    round: {
      control: {type: 'inline-radio'},
      options: selectRoundVariants,
      table: {defaultValue: {summary: 'no'}},
    },
    outline: {
      control: {type: 'inline-radio'},
      options: selectOutlineVariants,
      table: {defaultValue: {summary: '500'}},
    },
    items: {control: {disable: true}},
    indicator: {control: {disable: true}},
  },
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    items: countries,
    indicator: chevron,
    size: 'M',
    variant: 'filled',
    rounded: 'Default',
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: {defaultValue: ['IT']},
};

export const Multiple: Story = {
  args: {multiple: true, placeholder: 'Pick countries'},
};

export const DisabledItems: Story = {
  args: {
    items: [
      {label: 'Nigeria', value: 'NG'},
      {label: 'Japan', value: 'JP', disabled: true},
      {label: 'Italy', value: 'IT'},
      {label: 'Kenya', value: 'KE', disabled: true},
    ],
  },
};

export const Invalid: Story = {
  args: {invalid: true},
};

export const Disabled: Story = {
  args: {disabled: true},
};

export const Sizes: Story = {
  render: () => (
    <div className="nb-demo-row">
      {selectSizeVariants.map((size) => (
        <Select
          key={size}
          size={size}
          label="Country"
          placeholder="Select"
          indicator={chevron}
          items={countries}
        />
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="nb-demo-row">
      {selectVariantVariants.map((variant) => (
        <Select
          key={variant}
          variant={variant}
          label="Country"
          placeholder={variant}
          indicator={chevron}
          items={countries}
        />
      ))}
    </div>
  ),
};

export const Selection = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="nb-demo-col">
        <Select
          label="Country"
          placeholder="Pick one"
          value={value}
          onValueChange={setValue}
          indicator={chevron}
          items={countries}
        />
        <span>Selected: {value.join(', ') || 'none'}</span>
      </div>
    );
  },
} satisfies StoryObj;
