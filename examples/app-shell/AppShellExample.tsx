import {useState} from 'react';
import {
  Button,
  FlashProvider,
  FramePanel,
  IconButton,
  Input,
  Menu,
  Panel,
  Select,
  Text,
  ThemeProvider,
  ToastProvider,
  useBreakpoint,
  useFlash,
  useTheme,
  useToast,
} from '../../index';
import {
  ArrowRightIcon,
  BellIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';

type ActionSize = 'M' | 'S';

/** Header actions: theme toggle, notifications, and an overflow menu. */
const AppShellHeader = ({size}: {size: ActionSize}) => {
  const {theme, setTheme} = useTheme();
  const toast = useToast();

  return (
    <>
      <Button
        variant="standard"
        size={size}
        text={theme === 'light' ? 'Dark' : 'Light'}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
      <IconButton
        variant="standard"
        size={size}
        icon={<BellIcon width={16} height={16}/>}
        aria-label="Notifications"
        onClick={() => toast.info({title: 'No new hails', description: 'The channel is quiet.'})}
      />
      <Menu
        variant="outlined"
        size={size}
        text="Actions"
        indicator={<ChevronDownIcon width={16} height={16}/>}
        items={[
          {value: 'edit', text: 'Edit ship', leftIcon: <PencilIcon width={16} height={16}/>},
          {value: 'report', text: 'Generate report'},
          {value: 'sep-1', separator: true},
          {value: 'alert', text: 'Red alert', leftIcon: <ExclamationTriangleIcon width={16} height={16}/>},
        ]}
        onSelect={(value) => toast.info({title: `Action: ${value}`})}
      />
    </>
  );
};

/** Side action stack — collapses into a strip above the body on mobile. */
const AppShellSide = ({size}: {size: ActionSize}) => (
  <>
    <IconButton variant="standard" size={size} icon={<MagnifyingGlassIcon width={16} height={16}/>} aria-label="Search"/>
    <IconButton variant="standard" size={size} icon={<Cog6ToothIcon width={16} height={16}/>} aria-label="Settings"/>
    <IconButton variant="standard" size={size} icon={<QuestionMarkCircleIcon width={16} height={16}/>} aria-label="Help"/>
  </>
);

/** Footer: one standard back action, one filled primary, LCARS-cornered. */
const AppShellFooter = ({size, onSave}: {size: ActionSize; onSave: () => void}) => (
  <>
    <Button variant="standard" size={size} text="Back"/>
    <Button
      variant="filled"
      size={size}
      rounded="R"
      text="Save changes"
      rightIcon={<ArrowRightIcon width={16} height={16}/>}
      onClick={onSave}
    />
  </>
);

type StatusFormProps = {
  name: string;
  onNameChange: (name: string) => void;
  status: string[];
  onStatusChange: (status: string[]) => void;
  submitted: boolean;
};

/** Body: a Panel card holding the controlled form. State lives in the frame. */
const StatusForm = (props: StatusFormProps) => {
  const {name, onNameChange, status, onStatusChange, submitted} = props;

  const nameError =
    submitted && name.trim().length === 0 ? ['Name is required'] : undefined;

  return (
    <Panel
      outline="500"
      round="lg"
      className="nb-demo-w-full"
      renderTitle={<Text component="h6" variant="header6">Ship configuration</Text>}
    >
      <div className="nb-recipe-fields">
        <Input
          label="Ship name"
          placeholder="NCC-1701"
          isRequired
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          errors={nameError}
        />
        <Select
          label="Status"
          placeholder="Pick a status"
          indicator={<ChevronDownIcon width={16} height={16}/>}
          items={[
            {label: 'Active', value: 'active'},
            {label: 'Docked', value: 'docked'},
            {label: 'Under repair', value: 'repair'},
          ]}
          value={status}
          onValueChange={onStatusChange}
        />
        <Text component="p" variant="body3">
          Feedback pairs Flash (the whole-UI blink) with Toast (the message) —
          trigger it from the frame footer.
        </Text>
      </div>
    </Panel>
  );
};

const AppShell = () => {
  const breakpoint = useBreakpoint();
  const actionSize: ActionSize = breakpoint.isDesktop ? 'M' : 'S';
  const {flash} = useFlash();
  const toast = useToast();

  const [name, setName] = useState('USS Enterprise');
  const [status, setStatus] = useState<string[]>(['active']);
  const [submitted, setSubmitted] = useState(false);

  const save = () => {
    setSubmitted(true);
    if (name.trim().length === 0) {
      flash('error');
      toast.error({title: 'Cannot save', description: 'Check the highlighted fields.'});
      return;
    }
    flash('success');
    toast.success({title: 'Changes saved', description: `${name} is ${status[0] ?? 'active'}.`});
  };

  return (
    <FramePanel
      title="Ship status"
      renderHeader={<AppShellHeader size={actionSize}/>}
      renderSide={<AppShellSide size={actionSize}/>}
      renderFooter={<AppShellFooter size={actionSize} onSave={save}/>}
    >
      <StatusForm
        name={name}
        onNameChange={setName}
        status={status}
        onStatusChange={setStatus}
        submitted={submitted}
      />
    </FramePanel>
  );
};

/**
 * The missing recipe: a complete page inside the LCARS frame.
 * Demonstrates provider order (ThemeProvider > FlashProvider > ToastProvider),
 * FramePanel slots with real actions, responsive action sizes via
 * useBreakpoint, a Panel card holding a controlled form whose state is
 * lifted to the frame, and the Flash + Toast feedback pair on submit.
 *
 * Repo-internal imports point at `../../index` — in a consuming app every
 * named import here comes from 'nebula-ds-react-library'.
 */
export const AppShellExample = () => (
  <ThemeProvider theme="light">
    <FlashProvider>
      <ToastProvider placement="bottom-end">
        <AppShell/>
      </ToastProvider>
    </FlashProvider>
  </ThemeProvider>
);
