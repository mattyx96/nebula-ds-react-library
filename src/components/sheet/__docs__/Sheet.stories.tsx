import type {Meta, StoryObj} from '@storybook/react';
import {Sheet} from '../Sheet.tsx';
import {menuRoundedVariants, menuSizeVariants, menuVariantVariants} from '../../../variants/menu';
import {ChevronDownIcon, PencilIcon, PlusIcon, TrashIcon} from '@heroicons/react/24/solid';
import {useState} from 'react';

const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs', '!dev'],
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
    trigger: {
      control: {disable: true},
    },
    items: {
      control: {disable: true},
    },
  },
  args: {
    text: 'Actions',
    title: 'Actions',
    size: 'M',
    variant: 'filled',
    rounded: 'Default',
    items: [
      {value: 'edit', text: 'Edit', leftIcon: <PencilIcon width={16} height={16}/>},
      {value: 'duplicate', text: 'Duplicate', leftIcon: <PlusIcon width={16} height={16}/>},
      {value: 'delete', text: 'Delete', leftIcon: <TrashIcon width={16} height={16}/>},
    ],
  },
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    indicator: <ChevronDownIcon width={16} height={16}/>,
  },
};

export const WithTitleAndDescription: Story = {
  args: {
    text: 'More',
    title: 'More actions',
    description: 'Select an action to continue',
    indicator: <ChevronDownIcon width={16} height={16}/>,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="nb-demo-row">
      {menuSizeVariants.map((size) => (
        <Sheet
          key={size}
          text={`Size ${size}`}
          size={size}
          title="Actions"
          indicator={<ChevronDownIcon width={16} height={16}/>}
          items={[
            {value: 'edit', text: 'Edit'},
            {value: 'duplicate', text: 'Duplicate'},
            {value: 'delete', text: 'Delete'},
          ]}
        />
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="nb-demo-row">
      {menuVariantVariants.map((variant) => (
        <Sheet
          key={variant}
          text={variant}
          variant={variant}
          title="Actions"
          indicator={<ChevronDownIcon width={16} height={16}/>}
          items={[
            {value: 'edit', text: 'Edit'},
            {value: 'duplicate', text: 'Duplicate'},
            {value: 'delete', text: 'Delete'},
          ]}
        />
      ))}
    </div>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <Sheet
      text="Actions"
      title="Actions"
      indicator={<ChevronDownIcon width={16} height={16}/>}
      items={[
        {value: 'edit', text: 'Edit'},
        {value: 'download', text: 'Download', disabled: true},
        {value: 'delete', text: 'Delete', disabled: true},
      ]}
    />
  ),
};

export const Selection = {
  render: () => {
    const [lastSelected, setLastSelected] = useState('none');
    return (
      <div className="nb-demo-col">
        <Sheet
          text="Select an option"
          variant="outlined"
          title="Select an option"
          onSelect={setLastSelected}
          indicator={<ChevronDownIcon width={16} height={16}/>}
          items={[
            {value: 'option-1', text: 'Option 1'},
            {value: 'option-2', text: 'Option 2'},
            {value: 'option-3', text: 'Option 3'},
          ]}
        />
        <span>Last selected: {lastSelected}</span>
      </div>
    );
  },
} satisfies StoryObj;
