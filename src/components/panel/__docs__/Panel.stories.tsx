import type {Meta, StoryObj} from '@storybook/react';
import {Button} from '../../button/Button';
import {Panel} from "../Panel.tsx";
import {Text} from "../../typography/Typography";
import {panelOutlineVariants, panelRoundVariants} from "../../../variants/panel";

const actions = (
  <div className="nb-demo-actions">
    <Button className="nb-demo-w-full nb-demo-span-3" size="S" variant="standard" text="Cancel"/>
    <Button className="nb-demo-w-full nb-demo-span-2" rounded="R" size="S" variant="filled" text="Do it"/>
  </div>
);

const title = (title = 'Title card') => (
  <Text component="h6" variant="header6">{title}</Text>
);

const content = (content = 'Content here') => (
  <div className="nb-demo-block">
    <Text component="span" variant="body1">{content}</Text>
  </div>
);

const meta = {
  title: 'Components/Panel',
  component: Panel,
  tags: ['autodocs', '!dev'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'The Nebula **card**: an optional title above, body content, optional actions below. Use it to group content; use `FramePanel` for a whole page or major section.',
          '`outline` (`50|200|500|700`) sets border strength, `round` (`no|xs|lg`) the bottom-left corner. Give the title as `<Text component="h6" variant="header6">`.',
          'The inner surface swallows click events (`stopPropagation`) so a panel inside a clickable container acts as one unit — pass `onClick` for the panel\'s own action.',
          'Historical name: the component was renamed from `Paper` to `Panel`; `Paper` remains a deprecated alias.',
        ].join('\n\n'),
      },
    },
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
} satisfies Meta<typeof Panel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Panel
      {...args}
      renderTitle={args.renderTitle === 'on' && title(`Title card`)}
      renderActions={args.renderActions === 'on' && actions}
    >
      {content(`Default-content`)}
    </Panel>
  ),
  args: {
    round: 'lg',
    outline: '500',
    children: content('Default Content'),
  },
};

export const WithActionsAndTitle: Story = {
  render: () => (
    <div className="nb-demo-row--lg">
      {panelRoundVariants.map((round) =>
        panelOutlineVariants.map((outline) => (
          <Panel
            key={`${round}-${outline}`}
            round={round}
            outline={outline}
            renderTitle={title(`${round}-${outline}`)}
            renderActions={actions}
          >
            {content(`${round}-${outline}-actions & title`)}
          </Panel>
        ))
      )}
    </div>
  ),
};

export const WithTitleOnly: Story = {
  render: () => (
    <div className="nb-demo-row--lg">
      {panelRoundVariants.map((round) =>
        panelOutlineVariants.map((outline) => (
          <Panel
            key={`${round}-${outline}-no-actions`}
            round={round}
            outline={outline}
            renderTitle={title(`${round}-${outline}-no actions`)}
          >
            {content(`${round}-${outline}-title only`)}
          </Panel>
        ))
      )}
    </div>
  ),
};

export const WithContentOnly: Story = {
  render: () => (
    <div className="nb-demo-row--lg">
      {panelRoundVariants.map((round) =>
        panelOutlineVariants.map((outline) => (
          <Panel
            key={`${round}-${outline}-no`}
            round={round}
            outline={outline}
          >
            {content(`${round}-${outline}-content only`)}
          </Panel>
        ))
      )}
    </div>
  ),
};
