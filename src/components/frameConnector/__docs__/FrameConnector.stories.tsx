import type {Meta, StoryObj} from '@storybook/react';
import {FrameConnector} from '../FrameConnector';
import {lightJsTokens} from 'nebula-ds-tokens';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/FrameConnector',
  component: FrameConnector,
  tags: ['autodocs'],
  argTypes: {
    divider: {
      control: 'boolean',
      table: {
        disable: true,
        defaultValue: {},
      },
    },
    className: {
      control: 'text',
    },
    bridge: {
      control: 'object',
    },
    firstNode: {
      control: 'object',
    },
    secondNode: {
      control: 'object',
    },
  },
  args: {
    divider: false,
    className: '',
    bridge: {
      className: '',
    },
    firstNode: {
      fill: lightJsTokens.nbBackgroundAccent200,
      className: '',
      hidden: false,
    },
    secondNode: {
      fill: lightJsTokens.nbBackgroundAccent200,
      className: '',
      hidden: false,
    },
  },
} satisfies Meta<typeof FrameConnector>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {},
};

export const DividerOnly: Story = {
  args: {
    divider: true,
  },
};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
};

export const HiddenNodes: Story = {
  args: {
    firstNode: {
      hidden: true,
    },
  },
};
