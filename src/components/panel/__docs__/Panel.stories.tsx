import type {Meta, StoryObj} from '@storybook/react';
import {Button} from '../../button/Button';
import {Paper} from "../Panel.tsx";
import {Text} from "../../typography/Typography";
import {panelOutlineVariants, panelRoundVariants} from "../../../variants/panel";

const actions = (
  <div className="grid grid-cols-5 gap-4 items-center">
    <Button className="w-full col-span-3" size="S" variant="standard" text="Cancel"/>
    <Button className="w-full col-span-2" rounded="R" size="S" variant="filled" text="Do it"/>
  </div>
);

const title = (title = 'Title card') => (
  <Text component="h6" variant="header6">{title}</Text>
);

const content = (content = 'Content here') => (
  <div className="h-40 min-w-60 w-full bg-background-accent-200 flex justify-center items-center rounded-md">
    <Text component="span" variant="body1">{content}</Text>
  </div>
);

const meta = {
  title: 'Components/Paper',
  component: Paper,
  tags: ['autodocs', '!dev'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    round: {
      control: {type: 'inline-radio'},
      options: panelRoundVariants,
      table: {
        defaultValue: {
          summary: 'Default',
        },
      },
    },
    outline: {
      control: {type: 'inline-radio'},
      options: panelOutlineVariants,
      table: {
        defaultValue: {
          summary: 'None',
        },
      },
    },
    children: {
      control: {disable: true},
      table: {
        type: {
          summary: 'ReactReactNode',
        },
      },
    },
    renderTitle: {
      control: {type: 'inline-radio'},
      options: ['on', 'off'],
      table: {
        defaultValue: {
          summary: 'None',
        },
      },
    },
    renderActions: {
      control: {type: 'inline-radio'},
      options: ['on', 'off'],
      table: {
        defaultValue: {
          summary: 'None',
        },
      },
    },
  },
  args: {
    round: 'lg',
    outline: '500',
    children: content('Default Content'),
    renderTitle: 'on',
    renderActions: 'on',
  },
} satisfies Meta<typeof Paper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Paper
      {...args}
      renderTitle={args.renderTitle === 'on' && title(`Title card`)}
      renderActions={args.renderActions === 'on' && actions}
    >
      {content(`Default-content`)}
    </Paper>
  ),
  args: {
    round: 'lg',
    outline: '500',
    children: content('Default Content'),
  },
};

export const WithActionsAndTitle: Story = {
  render: () => (
    <div className="flex flex-wrap gap-10">
      {panelRoundVariants.map((round) =>
        panelOutlineVariants.map((outline) => (
          <Paper
            key={`${round}-${outline}`}
            round={round}
            outline={outline}
            renderTitle={title(`${round}-${outline}`)}
            renderActions={actions}
          >
            {content(`${round}-${outline}-actions & title`)}
          </Paper>
        ))
      )}
    </div>
  ),
};

export const WithTitleOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-10">
      {panelRoundVariants.map((round) =>
        panelOutlineVariants.map((outline) => (
          <Paper
            key={`${round}-${outline}-no-actions`}
            round={round}
            outline={outline}
            renderTitle={title(`${round}-${outline}-no actions`)}
          >
            {content(`${round}-${outline}-title only`)}
          </Paper>
        ))
      )}
    </div>
  ),
};

export const WithContentOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-10">
      {panelRoundVariants.map((round) =>
        panelOutlineVariants.map((outline) => (
          <Paper
            key={`${round}-${outline}-no`}
            round={round}
            outline={outline}
          >
            {content(`${round}-${outline}-content only`)}
          </Paper>
        ))
      )}
    </div>
  ),
};
