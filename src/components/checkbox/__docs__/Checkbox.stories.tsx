import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {Checkbox} from '../Checkbox.tsx';
import {checkboxRoundedVariants, checkboxSizeVariants} from '../../../variants/checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs', '!dev'],
  parameters: {
    docs: {
      description: {
        component: [
          'Zag-powered checkbox. `checked` is controlled (`true | false | "indeterminate"`), or seed `defaultChecked` and read `onCheckedChange`.',
          '`label` renders beside the control; use `renderLabel` for custom label content. `invalid` turns the box\'s ring to the error tone — pair it with an error message in your form.',
          'A parent "select all" checkbox takes `defaultChecked="indeterminate"` while only some children are checked.',
        ].join('\n\n'),
      },
    },
  },
  argTypes: {
    size: {
      control: {type: 'inline-radio'},
      options: checkboxSizeVariants,
      table: {defaultValue: {summary: 'M'}},
    },
    rounded: {
      control: {type: 'inline-radio'},
      options: checkboxRoundedVariants,
      table: {defaultValue: {summary: 'Default'}},
    },
    checked: {
      control: {type: 'select'},
      options: [true, false, 'indeterminate'],
    },
    label: {control: {type: 'text'}},
    disabled: {control: {type: 'boolean'}},
    invalid: {control: {type: 'boolean'}},
    required: {control: {type: 'boolean'}},
    readOnly: {control: {type: 'boolean'}},
  },
  args: {
    label: 'Remember me',
    size: 'M',
    rounded: 'Default',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {defaultChecked: true},
};

export const Indeterminate: Story = {
  args: {defaultChecked: 'indeterminate', label: 'Select all'},
};

export const Disabled: Story = {
  args: {disabled: true, label: 'Disabled'},
};

export const DisabledChecked: Story = {
  args: {disabled: true, defaultChecked: true, label: 'Disabled & checked'},
};

export const WithError: Story = {
  args: {invalid: true, label: 'Accept terms'},
};

export const Sizes: Story = {
  render: () => (
    <div className="nb-demo-row">
      {checkboxSizeVariants.map((size) => (
        <Checkbox key={size} size={size} label={`Size ${size}`}/>
      ))}
    </div>
  ),
};

export const RoundedCorners: Story = {
  render: () => (
    <div className="nb-demo-col">
      {checkboxRoundedVariants.map((rounded) => (
        <Checkbox key={rounded} rounded={rounded} defaultChecked label={String(rounded)}/>
      ))}
    </div>
  ),
};

export const Controlled = {
  render: () => {
    const [checked, setChecked] = useState<'indeterminate' | boolean>(false);
    return (
      <div className="nb-demo-col">
        <Checkbox
          label="Controlled"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <span>State: {String(checked)}</span>
      </div>
    );
  },
} satisfies StoryObj;
