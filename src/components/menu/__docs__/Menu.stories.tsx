import type {Meta, StoryObj} from '@storybook/react';
import {Menu, type MenuProps} from '../Menu.tsx';
import {
  menuAlignVariants,
  menuOutlineVariants,
  menuRoundedVariants,
  menuRoundVariants,
  menuSizeVariants,
  menuVariantVariants,
} from '../../../variants/menu';
import {
  ArrowDownTrayIcon,
  ChevronDownIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import {useState} from 'react';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs', '!dev'],
  argTypes: {
    size: {
      control: {type: 'inline-radio'},
      options: menuSizeVariants,
      table: {
        defaultValue: {summary: 'M'},
      },
    },
    variant: {
      control: {type: 'inline-radio'},
      options: menuVariantVariants,
      table: {
        defaultValue: {summary: 'filled'},
      },
    },
    rounded: {
      control: {type: 'inline-radio'},
      options: menuRoundedVariants,
      table: {
        defaultValue: {summary: 'Default'},
      },
    },
    round: {
      control: {type: 'inline-radio'},
      options: menuRoundVariants,
      table: {
        defaultValue: {summary: 'no'},
      },
    },
    outline: {
      control: {type: 'inline-radio'},
      options: menuOutlineVariants,
      table: {
        defaultValue: {summary: '500'},
      },
    },
    align: {
      control: {type: 'inline-radio'},
      options: menuAlignVariants,
      table: {
        defaultValue: {summary: 'start'},
      },
    },
    trigger: {
      control: {disable: true},
      table: {type: {summary: 'ReactNode'}},
    },
    items: {
      control: {disable: true},
      table: {type: {summary: 'MenuItem[]'}},
    },
    leftIcon: {
      control: {disable: true},
    },
    rightIcon: {
      control: {disable: true},
    },
    indicator: {
      control: {disable: true},
    },
  },
  args: {
    text: 'Actions',
    size: 'M',
    variant: 'filled',
    rounded: 'Default',
    round: 'no',
    outline: '500',
    align: 'start',
    indicator: <ChevronDownIcon width={16} height={16}/>,
    items: [
      {value: 'edit', text: 'Edit', leftIcon: <PencilIcon width={16} height={16}/>},
      {value: 'duplicate', text: 'Duplicate', leftIcon: <PlusIcon width={16} height={16}/>},
      {value: 'download', text: 'Download', leftIcon: <ArrowDownTrayIcon width={16} height={16}/>},
      {value: 'delete', text: 'Delete', leftIcon: <TrashIcon width={16} height={16}/>},
    ],
  },
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithSeparators: Story = {
  render: (args) => (
    <Menu
      {...args}
      items={[
        {value: 'new', text: 'New File', leftIcon: <PlusIcon width={16} height={16}/>},
        {value: 'separator-1', separator: true},
        {value: 'edit', text: 'Edit', leftIcon: <PencilIcon width={16} height={16}/>},
        {value: 'duplicate', text: 'Duplicate'},
        {value: 'separator-2', separator: true},
        {value: 'delete', text: 'Delete', leftIcon: <TrashIcon width={16} height={16}/>},
      ]}
    />
  ),
};

export const DisabledItems: Story = {
  render: (args) => (
    <Menu
      {...args}
      items={[
        {value: 'edit', text: 'Edit'},
        {value: 'download', text: 'Download', disabled: true},
        {value: 'delete', text: 'Delete', disabled: true},
      ]}
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="nb-demo-row">
      {menuSizeVariants.map((size) => (
        <Menu
          key={size}
          text={`Size ${size}`}
          size={size}
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
        <Menu
          key={variant}
          text={variant}
          variant={variant}
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

export const RoundedCorners: Story = {
  render: () => (
    <div className="nb-demo-row">
      {menuRoundedVariants.map((rounded) => (
        <Menu
          key={rounded}
          text={String(rounded)}
          rounded={rounded}
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

export const ContentRounds: Story = {
  render: () => (
    <div className="nb-demo-row">
      {menuRoundVariants.map((round) => (
        <Menu
          key={round}
          text={`Round ${round}`}
          round={round}
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

export const Outlines: Story = {
  render: () => (
    <div className="nb-demo-row">
      {menuOutlineVariants.map((outline) => (
        <Menu
          key={outline}
          text={`Outline ${outline}`}
          outline={outline}
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

export const Alignments: Story = {
  render: () => (
    <div className="nb-demo-row">
      {menuAlignVariants.map((align) => (
        <Menu
          key={align}
          text={`Align ${align}`}
          align={align}
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

export const Selection = {
  render: () => {
    const [lastSelected, setLastSelected] = useState<string>('none');
    const [open, setOpen] = useState(false);

    return (
      <div className="nb-demo-col">
        <Menu
          text="Select an option"
          variant="outlined"
          open={open}
          onOpenChange={setOpen}
          onSelect={(value) => setLastSelected(value)}
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
} satisfies StoryObj<MenuProps>;
