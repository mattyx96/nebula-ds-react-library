import type {Meta, StoryObj} from '@storybook/react';
import {FramePanel} from '../FramePanel';
import {Button} from '../../button/Button';
import {Text} from '../../typography/Typography';
import {IconButton} from "../../button/IconButton";
import {ArrowRightIcon, CodeBracketIcon, ArrowLeftIcon} from "@heroicons/react/16/solid";
import {useBreakpoint} from "../../../hook/useBreakpoint.ts";

const content = (content = 'Content Here') => (
  <div className="w-full h-52 bg-background-accent-200 flex justify-center items-center rounded-md">
    <Text component="span" variant="body1">{content}</Text>
  </div>
);

const actions = (size: 'M' | 'S') => (
  <>
    <IconButton size={size} variant="outlined" icon={<CodeBracketIcon/>}/>
    <Button size={size} rounded="R" text="Open" rightIcon={<ArrowRightIcon/>}/>
  </>
);

const actionsInverse = (size: 'M' | 'S') => (
  <>
    <Button size={size} rounded="L" text="Open" leftIcon={<ArrowLeftIcon/>}/>
    <IconButton size={size} variant="outlined" icon={<CodeBracketIcon/>}/>
  </>
);

const renderFooter = (size: 'M' | 'S') => (
  <>
    <IconButton size={size} variant="standard" icon={<CodeBracketIcon/>}/>
    <Button size={size} rounded="R" variant="outlined" text="Open" rightIcon={<ArrowRightIcon/>}/>
  </>
);

const actionsFooterInverse = (size: 'M' | 'S') => (
  <>
    <Button size={size} rounded="L" variant="outlined" text="Open"
            leftIcon={<ArrowLeftIcon/>}/>
    <IconButton size={size} variant="standard" icon={<CodeBracketIcon/>}/>
  </>
);

const sideActions = (size: 'M' | 'S') => (
  <>
    <IconButton size={size} variant="standard" icon={<CodeBracketIcon/>}/>
    <IconButton size={size} variant="standard" icon={<CodeBracketIcon/>}/>
  </>
);

const meta = {
  title: 'Components/FramePanel',
  component: FramePanel,
  tags: ['autodocs', '!dev'],
  parameters: {},
  argTypes: {
    renderHeader: {
      control: {disable: true},
      table: {
        type: {summary: 'ReactNode'},
      },
    },
    renderFooter: {
      control: {disable: true},
      table: {
        type: {summary: 'ReactNode'},
      },
    },
    renderSide: {
      control: {disable: true},
      table: {
        type: {summary: 'ReactNode'},
      },
    },
    inverse: {
      control: {type: 'boolean'},
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    title: {
      control: {type: 'text'},
      table: {
        type: {summary: 'string'},
        defaultValue: {summary: 'Panel Title'},
      },
    },
    renderTitle: {
      control: {disable: true},
      table: {
        type: {summary: 'ReactNode'},
      },
    },
    className: {
      control: {disable: true},
      table: {
        type: {summary: 'string'},
      }
    },
    children: {
      control: {disable: true},
      table: {
        type: {summary: 'ReactNode'},
      },
    },
  },
  args: {
    inverse: false,
    title: 'Panel Title',
    children: content(),
  },
} satisfies Meta<typeof FramePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const breakpoint = useBreakpoint();
    return (
      <FramePanel
        {...args}
        renderHeader={args.inverse ? actionsInverse(breakpoint.isDesktop ? 'M' : 'S') : actions(breakpoint.isDesktop ? 'M' : 'S')}
        renderFooter={args.inverse ? actionsFooterInverse(breakpoint.isDesktop ? 'M' : 'S') : renderFooter(breakpoint.isDesktop ? 'M' : 'S')}
      />
    )
  },
  args: {
    renderFooter: renderFooter('M'),
    renderHeader: actions('M'),
    title: 'Panel Title',
    inverse: false,
    children: content(),
  },
};

export const WithSideActions: Story = {
  render: (args) => {
    const breakpoint = useBreakpoint();
    return (
      <FramePanel {...args} renderHeader={actions(breakpoint.isDesktop ? 'M' : 'S')}
                  renderSide={sideActions(breakpoint.isDesktop ? 'M' : 'S')}
                  renderFooter={renderFooter(breakpoint.isDesktop ? 'M' : 'S')}/>
    )
  },
  args: {
    title: 'With Side Actions Panel',
    children: content('Side action panel Content'),
    inverse: false,
    renderFooter: renderFooter('M'),
    renderHeader: actions('M'),
  },
};

export const InverseLayout: Story = {
  render: (args) => {
    const breakpoint = useBreakpoint();
    return (
      <FramePanel
        {...args}
        renderHeader={actionsInverse(breakpoint.isDesktop ? 'M' : 'S')}
        renderFooter={actionsFooterInverse(breakpoint.isDesktop ? 'M' : 'S')}
      />
    )
  },
  args: {
    title: 'Inverse Panel',
    children: content('Inverse Content'),
    inverse: true,
    renderFooter: renderFooter('M'),
    renderHeader: actions('M'),
  },
};

export const WithoutHeaderAndFooter: Story = {
  render: (args) => {
    return (
      <FramePanel {...args} />
    )
  },
  args: {
    title: 'No header and footer',
    children: content('No header and footer Content'),
    inverse: true,
    renderFooter: undefined,
    renderHeader: undefined,
  },
};

export const WithCustomTitle: Story = {
  render: (args) => {
    const breakpoint = useBreakpoint();
    return (
      <FramePanel {...args} renderHeader={actions(breakpoint.isDesktop ? 'M' : 'S')}
                  renderFooter={renderFooter(breakpoint.isDesktop ? 'M' : 'S')}/>
    )
  },
  args: {
    renderTitle: <Text component="h2" style={{fontWeight: 600, backgroundColor: 'yellow'}} variant="body1">Custom
      Title</Text>,
    renderHeader: actions('M'),
    renderFooter: renderFooter('M'),
    children: content('Custom Title Content'),
  },
};

export const ChainedSections: Story = {
  render: () => {
    const breakpoint = useBreakpoint();
    return (
      <div className="flex flex-col gap-4">
        <FramePanel
          renderHeader={actions(breakpoint.isDesktop ? 'M' : 'S')}
          renderFooter={renderFooter(breakpoint.isDesktop ? 'M' : 'S')}
          renderSide={sideActions(breakpoint.isDesktop ? 'M' : 'S')}
          title="Section-1"
        >
          {content('Section-1 Content')}
        </FramePanel>

        <FramePanel
          renderHeader={actionsInverse(breakpoint.isDesktop ? 'M' : 'S')}
          renderFooter={actionsFooterInverse(breakpoint.isDesktop ? 'M' : 'S')}
          renderSide={sideActions(breakpoint.isDesktop ? 'M' : 'S')}
          title="Section-2"
          inverse
        >
          {content('Section-1 Content')}
        </FramePanel>
      </div>
    )
  },
  args: {
    renderFooter: renderFooter('M'),
    renderHeader: actions('M'),
    title: '',
    inverse: false,
    children: content(),
  },
};
