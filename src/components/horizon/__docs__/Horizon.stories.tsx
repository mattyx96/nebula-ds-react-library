import type {Meta, StoryObj} from '@storybook/react';
import {Horizon} from '../Horizon';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Horizon',
  component: Horizon,
  tags: ['autodocs', '!dev'],
  parameters: {
    docs: {
      description: {
        component: [
          'Decorative SVG band of horizontal lines whose thickness and spacing decay — a receding horizon. Pure decoration: pass `aria-hidden="true"`.',
          'The default `color` is the theme contrast token (`var(--nb-background-contrast-primary-500)`), so the band stays visible in both light and dark themes. Override only with a token value, never a literal color.',
          'It re-fits on resize and prop changes; `inverse` draws the lines from the bottom up.',
        ].join('\n\n'),
      },
    },
  },
  argTypes: {
    color: {
      control: 'color',
      table: {
        defaultValue: {
          summary: 'var(--nb-background-contrast-primary-500)',
        },
      },
    },
    numLines: {
      control: 'number',
      table: {
        defaultValue: {
          summary: '15',
        },
      },
    },
    lineThickness: {
      control: 'number',
      table: {
        defaultValue: {
          summary: '13',
        },
      },
    },
    distance: {
      control: 'number',
      table: {
        defaultValue: {
          summary: '15',
        },
      },
    },
    distanceGrowthFactor: {
      control: 'number',
      table: {
        defaultValue: {
          summary: '1.2',
        },
      },
    },
    thicknessDecayFactor: {
      control: 'number',
      table: {
        defaultValue: {
          summary: '0.9',
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
    numLines: 15,
    lineThickness: 13,
    distance: 15,
    distanceGrowthFactor: 1.2,
    thicknessDecayFactor: 0.9,
    className: 'nb-demo-w-full',
    inverse: false,
  },
} satisfies Meta<typeof Horizon>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {},
};

export const DenseBand: Story = {
  args: {
    numLines: 55,
    lineThickness: 10,
    distance: 10,
    distanceGrowthFactor: 1.05,
    thicknessDecayFactor: 0.95,
  },
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
