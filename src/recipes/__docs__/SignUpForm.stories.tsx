import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {Button} from '../../components/button/Button';
import {Checkbox} from '../../components/checkbox/Checkbox';
import {FlashProvider} from '../../components/flash/FlashProvider';
import {useFlash} from '../../components/flash/flashContext';
import {ToastProvider} from '../../components/toast/Toast';
import {useToast} from '../../components/toast/toastContext';
import {Input} from '../../components/input/Input';
import {Paper} from '../../components/panel/Panel';
import {RadioGroup} from '../../components/radioGroup/RadioGroup';
import {Select} from '../../components/select/Select';
import {Text} from '../../components/typography/Typography';

const divisions = [
  {value: 'command', label: 'Command'},
  {value: 'operations', label: 'Operations'},
  {value: 'sciences', label: 'Sciences'},
];

const ranks = [
  {value: 'ensign', label: 'Ensign'},
  {value: 'lieutenant', label: 'Lieutenant'},
  {value: 'commander', label: 'Commander'},
  {value: 'captain', label: 'Captain'},
];

const chevron = <ChevronDownIcon width={16} height={16} />;

type SignUpValues = {
  name: string;
  email: string;
  password: string;
  rank: string[];
  division: string | null;
  terms: boolean;
};

const SignUpForm = () => {
  const {flash} = useFlash();
  const toast = useToast();
  const [values, setValues] = useState<SignUpValues>({
    name: '',
    email: '',
    password: '',
    rank: [],
    division: null,
    terms: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const nameError = submitted && values.name.trim().length < 2 ? ['Enter your full name'] : undefined;
  const emailError =
    submitted && !/^\S+@\S+\.\S+$/.test(values.email) ? ['Enter a valid email address'] : undefined;
  const passwordError =
    submitted && values.password.length < 8
      ? ['Password must be at least 8 characters']
      : undefined;
  const rankError = submitted && values.rank.length === 0 ? ['Pick a rank'] : undefined;
  const divisionError = submitted && !values.division ? ['Pick a division'] : undefined;
  const termsError = submitted && !values.terms ? ['You must accept the terms'] : undefined;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (
      nameError ||
      emailError ||
      passwordError ||
      rankError ||
      divisionError ||
      termsError
    ) {
      flash('error');
      toast.error({title: 'Cannot create account', description: 'Check the highlighted fields.'});
      return;
    }
    flash('success');
    toast.success({
      title: 'Welcome to Starfleet',
      description: 'Your account has been created and you are signed in.',
    });
    setSubmitted(false);
    setValues({name: '', email: '', password: '', rank: [], division: null, terms: false});
  };

  return (
    <form className="nb-recipe-form" onSubmit={handleSubmit} noValidate>
      <Paper
        round="lg"
        outline="500"
        renderTitle={<Text component="h6" variant="header6">Create your account</Text>}
        renderActions={<Button type="submit" rounded="R">Sign up</Button>}
      >
        <div className="nb-recipe-fields">
          <Input
            label="Full name"
            placeholder="James T. Kirk"
            isRequired
            value={values.name}
            onChange={(event) => setValues({...values, name: event.target.value})}
            errors={nameError}
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            isRequired
            value={values.email}
            onChange={(event) => setValues({...values, email: event.target.value})}
            errors={emailError}
          />
          <Input
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            isRequired
            value={values.password}
            onChange={(event) => setValues({...values, password: event.target.value})}
            errors={passwordError}
          />
          <Select
            label="Rank"
            placeholder="Pick a rank"
            indicator={chevron}
            items={ranks}
            value={values.rank}
            onValueChange={(rank) => setValues({...values, rank})}
            invalid={Boolean(rankError)}
          />
          <RadioGroup
            label="Division"
            items={divisions}
            value={values.division}
            onValueChange={(division) => setValues({...values, division})}
            invalid={Boolean(divisionError)}
          />
          <Checkbox
            label="I accept the terms of service"
            checked={values.terms}
            onCheckedChange={(checked) => setValues({...values, terms: checked === true})}
            invalid={Boolean(termsError)}
          />
        </div>
      </Paper>
    </form>
  );
};

const meta = {
  title: 'Recipes/Sign Up Form',
  component: SignUpForm,
  tags: ['autodocs', '!dev'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A full registration form. Shows how to mix `Input`, `Select`, `RadioGroup` and `Checkbox` in one `Paper`, each wired to a single `values` state object with submit-time validation. Fires an `error`/`success` `Flash` and `Toast` on submit.',
      },
    },
  },
} satisfies Meta<typeof SignUpForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FlashProvider>
      <ToastProvider>
        <SignUpForm />
      </ToastProvider>
    </FlashProvider>
  ),
};
