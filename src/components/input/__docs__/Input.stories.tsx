import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {Input} from '../Input.tsx';
import {inputRoundedVariants, inputSizeVariants, inputVariantVariants} from '../../../variants/input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs', '!dev'],
  argTypes: {
    size: {
      control: {type: 'inline-radio'},
      options: inputSizeVariants,
      table: {defaultValue: {summary: 'M'}},
    },
    variant: {
      control: {type: 'inline-radio'},
      options: inputVariantVariants,
      table: {defaultValue: {summary: 'outlined'}},
    },
    rounded: {
      control: {type: 'inline-radio'},
      options: inputRoundedVariants,
      table: {defaultValue: {summary: 'Default'}},
    },
    errors: {
      control: {disable: true},
      table: {defaultValue: {summary: '[]'}},
    },
    helperText: {control: {type: 'text'}},
    label: {control: {type: 'text'}},
    placeholder: {control: {type: 'text'}},
    fullWidth: {control: {type: 'boolean'}},
    isRequired: {control: {type: 'boolean'}},
    disabled: {control: {type: 'boolean'}},
  },
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    size: 'M',
    variant: 'outlined',
    rounded: 'Default',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: {helperText: 'This is a hint to help the user.'},
};

export const WithErrors: Story = {
  args: {errors: ['Required field', 'Must be at least 3 characters']},
};

export const Required: Story = {
  args: {isRequired: true},
};

export const Disabled: Story = {
  args: {disabled: true, placeholder: 'Disabled input', value: 'locked'},
};

export const FullWidth: Story = {
  args: {fullWidth: true, label: 'Full width input'},
};

export const Sizes: Story = {
  render: () => (
    <div className="nb-demo-col">
      {inputSizeVariants.map((size) => (
        <Input key={size} size={size} label={`Size ${size}`} placeholder={`Size ${size}`}/>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="nb-demo-col">
      {inputVariantVariants.map((variant) => (
        <Input key={variant} variant={variant} label={variant} placeholder={variant}/>
      ))}
    </div>
  ),
};

export const RoundedCorners: Story = {
  render: () => (
    <div className="nb-demo-col">
      {inputRoundedVariants.map((rounded) => (
        <Input key={rounded} rounded={rounded} placeholder={String(rounded)}/>
      ))}
    </div>
  ),
};

export const Password: Story = {
  args: {type: 'password', label: 'Password', placeholder: '••••••••'},
};

export const Controlled = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="nb-demo-col">
        <Input
          label="Controlled"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type here"
        />
        <span>Value: {value || '(empty)'}</span>
      </div>
    );
  },
} satisfies StoryObj;
