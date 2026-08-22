import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {Button} from '../../components/button/Button';
import {Checkbox} from '../../components/checkbox/Checkbox';
import {FlashProvider} from '../../components/flash/FlashProvider';
import {useFlash} from '../../components/flash/flashContext';
import {Input} from '../../components/input/Input';
import {Paper} from '../../components/panel/Panel';
import {Text} from '../../components/typography/Typography';

type LoginValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm = () => {
  const {flash} = useFlash();
  const [values, setValues] = useState<LoginValues>({email: '', password: '', rememberMe: false});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailError =
    submitted && !/^\S+@\S+\.\S+$/.test(values.email)
      ? ['Enter a valid email address']
      : undefined;
  const passwordError =
    submitted && values.password.length < 6 ? ['Password must be at least 6 characters'] : undefined;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (emailError || passwordError) {
      flash('error');
      return;
    }
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(false);
      setValues({email: '', password: '', rememberMe: false});
      flash('success');
    }, 800);
  };

  return (
    <form className="nb-recipe-form" onSubmit={handleSubmit} noValidate>
      <Paper
        round="lg"
        outline="500"
        renderTitle={<Text component="h6" variant="header6">Sign in to your console</Text>}
        renderActions={
          <Button type="submit" rounded="R" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </Button>
        }
      >
        <div className="nb-recipe-fields">
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
            placeholder="••••••••"
            isRequired
            value={values.password}
            onChange={(event) => setValues({...values, password: event.target.value})}
            errors={passwordError}
          />
          <Checkbox
            label="Remember me"
            checked={values.rememberMe}
            onCheckedChange={(checked) => setValues({...values, rememberMe: checked === true})}
          />
        </div>
      </Paper>
    </form>
  );
};

const meta = {
  title: 'Recipes/Login Form',
  component: LoginForm,
  tags: ['autodocs', '!dev'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A self-contained sign-in card. Uses `Paper` as the shell with a submit action in `renderActions`, two `Input`s with inline validation and a `Checkbox` for “remember me”. On submit the form flashes `error` or `success` via the `Flash` provider.',
      },
    },
  },
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FlashProvider>
      <LoginForm />
    </FlashProvider>
  ),
};
