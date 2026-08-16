import type {Meta, StoryObj} from '@storybook/react';
import {useEffect, useState, type ReactElement} from 'react';
import {FlashProvider} from '../FlashProvider.tsx';
import {useFlash, type FlashColor} from '../flashContext.ts';
import {Button} from '../../button/Button.tsx';
import {Paper} from '../../panel/Panel.tsx';
import {Text} from '../../typography/Typography.tsx';

type FlashDemoProps = {
  /** Auto-trigger this tone once on mount. */
  auto?: FlashColor;
  /** Initial blink count (default 2). */
  initialRepeats?: number;
};

const FlashDemo = ({auto, initialRepeats = 2}: FlashDemoProps) => {
  const {flash} = useFlash();
  const [repeats, setRepeats] = useState(initialRepeats);

  useEffect(() => {
    if (auto) flash(auto, {repeats});
  }, [auto, flash, repeats]);

  return (
    <div className="nb-demo-col">
      <Paper
        renderTitle={<Text component="h6" variant="header6">Flash Feedback</Text>}
      >
        <Text component="p" variant="body1">
          The whole UI — backgrounds, buttons, panels, typography and even frame
          connectors — flashes in the given tone and returns to normal.
        </Text>
        <div className="nb-demo-row">
          <Button text="Flash error" onClick={() => flash('error', {repeats})}/>
          <Button text="Flash success" onClick={() => flash('success', {repeats})}/>
        </div>
        <div className="nb-demo-row">
          <Text component="span" variant="body1">repeats:</Text>
          {[1, 2, 3].map((n) => (
            <Button
              key={n}
              size="S"
              variant={repeats === n ? 'filled' : 'standard'}
              text={String(n)}
              onClick={() => setRepeats(n)}
            />
          ))}
        </div>
      </Paper>
    </div>
  );
};

const meta = {
  title: 'Components/Flash',
  component: FlashProvider,
  tags: ['autodocs', '!dev'],
  parameters: {},
} satisfies Meta<typeof FlashProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

const withFlash = (demo: ReactElement) => (
  <FlashProvider>{demo}</FlashProvider>
);

export const Default: Story = {
  render: () => withFlash(<FlashDemo/>),
};

export const Error: Story = {
  render: () => withFlash(<FlashDemo auto="error"/>),
};

export const Success: Story = {
  render: () => withFlash(<FlashDemo auto="success"/>),
};

export const SingleBlink: Story = {
  render: () => withFlash(<FlashDemo auto="error" initialRepeats={1}/>),
};
