import type {Meta, StoryObj} from '@storybook/react';
import {Horizon} from '../Horizon';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Horizon',
  component: Horizon,
  tags: ['autodocs', '!dev'],
  argTypes: {
    color: {
      control: 'color',
      table: {
        defaultValue: {
          summary: '#000',
        },
      },
    },
    numLines: {
      control: 'number',
      table: {
        defaultValue: {
          summary: '55',
        },
      },
    },
    lineThickness: {
      control: 'number',
      table: {
        defaultValue: {
          summary: '10',
        },
      },
    },
    distance: {
      control: 'number',
      table: {
        defaultValue: {
          summary: '10',
        },
      },
    },
    distanceGrowthFactor: {
      control: 'number',
      table: {
        defaultValue: {
          summary: '1.05',
        },
      },
    },
    thicknessDecayFactor: {
      control: 'number',
      table: {
        defaultValue: {
          summary: '0.95',
        },
      },
    },
    className: {
      control: 'text',
    },
    height: {
      control: 'number',
    },
    width: {
      control: 'number',
    },
    inverse: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
  args: {
    color: '#000',
    numLines: 55,
    lineThickness: 10,
    distance: 10,
    distanceGrowthFactor: 1.05,
    thicknessDecayFactor: 0.95,
    className: 'w-full',
    inverse: false,
  },
} satisfies Meta<typeof Horizon>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {},
};

export const ColoredLines: Story = {
  args: {
    color: '#FF0000',
  },
};

export const ThickLines: Story = {
  args: {
    lineThickness: 20,
  },
};

export const WideSpacing: Story = {
  args: {
    distance: 20,
  },
};

export const InverseLines: Story = {
  args: {
    inverse: true,
  },
};

export const CustomDimensions: Story = {
  args: {
    height: 300,
    width: 1500,
  },
};
