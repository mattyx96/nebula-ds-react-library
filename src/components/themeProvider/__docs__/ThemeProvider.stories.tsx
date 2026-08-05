import type {Meta, StoryObj} from '@storybook/react';
import {ThemeProvider} from '../ThemeProvider.tsx';
import {useTheme} from '../themeContext.ts';
import {Button} from '../../button/Button.tsx';
import {Paper} from '../../panel/Panel.tsx';
import {Text} from '../../typography/Typography.tsx';

const meta = {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs', '!dev'],
  argTypes: {
    theme: {
      control: {type: 'inline-radio'},
      options: ['light', 'dark'],
      table: {
        defaultValue: {
          summary: 'light',
        },
      },
    },
    className: {
      control: 'text',
    },
    children: {
      control: {disable: true},
    },
  },
  args: {
    theme: 'light',
  },
} satisfies Meta<typeof ThemeProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

const DemoCard = ({label}: {label: string}) => (
  <Paper outline="500" round="xs" renderTitle={<Text variant="header6">{label}</Text>}>
    <div className="nb-demo-block">
      <Text component="span" variant="body1">Themed content</Text>
    </div>
  </Paper>
);

export const Default: Story = {
  args: {
    theme: 'light',
    children: <DemoCard label="Light (default)"/>,
  },
};

export const Dark: Story = {
  args: {
    theme: 'dark',
    children: <DemoCard label="Dark"/>,
  },
};

export const SideBySide: Story = {
  render: () => (
    <div className="nb-demo-col">
      <ThemeProvider theme="light">
        <DemoCard label="Light subtree"/>
      </ThemeProvider>
      <ThemeProvider theme="dark">
        <DemoCard label="Dark subtree"/>
      </ThemeProvider>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const Toggle = () => {
      const {theme, setTheme} = useTheme();
      return (
        <div className="nb-demo-col">
          <Button
            variant="outlined"
            text={`Switch to ${theme === 'light' ? 'dark' : 'light'}`}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <DemoCard label={`Current: ${theme}`}/>
        </div>
      );
    };
    return (
      <ThemeProvider theme="light">
        <Toggle/>
      </ThemeProvider>
    );
  },
};
