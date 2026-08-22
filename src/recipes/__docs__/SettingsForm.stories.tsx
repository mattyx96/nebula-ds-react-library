import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {Button} from '../../components/button/Button';
import {Checkbox} from '../../components/checkbox/Checkbox';
import {FlashProvider} from '../../components/flash/FlashProvider';
import {useFlash} from '../../components/flash/flashContext';
import {Input} from '../../components/input/Input';
import {Paper} from '../../components/panel/Panel';
import {RadioGroup} from '../../components/radioGroup/RadioGroup';
import {Select} from '../../components/select/Select';
import {Text} from '../../components/typography/Typography';

const languages = [
  {value: 'en', label: 'English'},
  {value: 'it', label: 'Italiano'},
  {value: 'ja', label: '日本語'},
  {value: 'kl', label: 'Klingon'},
];

const themes = [
  {value: 'light', label: 'Light'},
  {value: 'dark', label: 'Dark'},
];

const chevron = <ChevronDownIcon width={16} height={16} />;

type SettingsValues = {
  displayName: string;
  email: string;
  language: string[];
  theme: string | null;
  alerts: boolean;
  reports: boolean;
};

const defaultSettings: SettingsValues = {
  displayName: 'J. Kirk',
  email: 'jkirk@enterprise.fed',
  language: ['en'],
  theme: 'dark',
  alerts: true,
  reports: false,
};

const SettingsForm = () => {
  const {flash} = useFlash();
  const [values, setValues] = useState<SettingsValues>(defaultSettings);
  const [saved, setSaved] = useState(false);

  const isDirty = JSON.stringify(values) !== JSON.stringify(defaultSettings);

  const reset = () => {
    setValues(defaultSettings);
    setSaved(false);
  };

  const save = () => {
    setSaved(true);
    flash('success');
  };

  return (
    <form
      className="nb-recipe-form"
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
    >
      <Paper
        round="lg"
        outline="500"
        renderTitle={<Text component="h6" variant="header6">Preferences</Text>}
        renderActions={
          <div className="nb-recipe-row">
            <Button variant="standard" size="S" text="Reset" onClick={reset} disabled={!isDirty} />
            <Button type="submit" size="S" rounded="R" text={saved ? 'Saved' : 'Save changes'} disabled={!isDirty} />
          </div>
        }
      >
        <div className="nb-recipe-fields">
          <Input
            label="Display name"
            placeholder="Your name"
            value={values.displayName}
            onChange={(event) => setValues({...values, displayName: event.target.value})}
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(event) => setValues({...values, email: event.target.value})}
          />
          <Select
            label="Language"
            placeholder="Pick a language"
            indicator={chevron}
            items={languages}
            value={values.language}
            onValueChange={(language) => setValues({...values, language})}
          />
          <RadioGroup
            label="Theme"
            orientation="horizontal"
            items={themes}
            value={values.theme}
            onValueChange={(theme) => setValues({...values, theme})}
          />
          <Checkbox
            label="Receive mission alerts"
            checked={values.alerts}
            onCheckedChange={(checked) => setValues({...values, alerts: checked === true})}
          />
          <Checkbox
            label="Receive weekly reports"
            checked={values.reports}
            onCheckedChange={(checked) => setValues({...values, reports: checked === true})}
          />
        </div>
      </Paper>
    </form>
  );
};

const meta = {
  title: 'Recipes/Settings Form',
  component: SettingsForm,
  tags: ['autodocs', '!dev'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A profile/settings editor. Groups `Input`, `Select`, `RadioGroup` and `Checkbox` in one `Paper`, tracks dirty state against a default snapshot and disables the actions until something changes.',
      },
    },
  },
} satisfies Meta<typeof SettingsForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FlashProvider>
      <SettingsForm />
    </FlashProvider>
  ),
};
