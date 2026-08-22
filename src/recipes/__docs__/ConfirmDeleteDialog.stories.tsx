import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {Button} from '../../components/button/Button';
import {Dialog} from '../../components/dialog/Dialog';
import {FlashProvider} from '../../components/flash/FlashProvider';
import {useFlash} from '../../components/flash/flashContext';
import {ToastProvider} from '../../components/toast/Toast';
import {useToast} from '../../components/toast/toastContext';
import {Text} from '../../components/typography/Typography';

type CrewMember = {
  id: string;
  name: string;
  role: string;
};

const initialCrew: CrewMember[] = [
  {id: '1', name: 'James T. Kirk', role: 'Command'},
  {id: '2', name: 'Spock', role: 'Science'},
  {id: '3', name: 'Leonard McCoy', role: 'Medical'},
];

type ConfirmDeleteDialogProps = {
  /** The label of the trigger button. */
  text: string;
  /** Title shown in the dialog. */
  title: string;
  /** Body text of the dialog. */
  description: string;
  /** Label of the destructive confirm button. */
  confirmLabel?: string;
  /** Called when the user confirms the destructive action. */
  onConfirm: () => void;
};

/** Reusable destructive-action confirmation dialog (role="alertdialog"). */
const ConfirmDeleteDialog = (props: ConfirmDeleteDialogProps) => {
  const {text, title, description, confirmLabel = 'Delete', onConfirm} = props;
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      text={text}
      size="S"
      variant="outlined"
      rounded="R"
      title={title}
      description={description}
      role="alertdialog"
      open={open}
      onOpenChange={setOpen}
    >
      <div className="nb-recipe-row">
        <Button variant="standard" size="S" text="Cancel" onClick={() => setOpen(false)} />
        <Button
          variant="filled"
          size="S"
          rounded="R"
          text={confirmLabel}
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        />
      </div>
    </Dialog>
  );
};

const CrewManifest = () => {
  const {flash} = useFlash();
  const toast = useToast();
  const [crew, setCrew] = useState(initialCrew);

  const removeMember = (member: CrewMember) => {
    setCrew((prev) => prev.filter((item) => item.id !== member.id));
    flash('success');
    toast.success({
      title: 'Member removed',
      description: `${member.name} was removed from the roster.`,
    });
  };

  return (
    <div className="nb-recipe-col">
      <Text component="h6" variant="header6">Crew manifest</Text>
      <div className="nb-recipe-list">
        {crew.map((member) => (
          <div key={member.id} className="nb-recipe-list__item">
            <div>
              <Text component="span" variant="body1">{member.name}</Text>
              <Text component="span" variant="body3">{member.role}</Text>
            </div>
            <ConfirmDeleteDialog
              text="Remove"
              title={`Remove ${member.name}?`}
              description={`${member.name} will be removed from the roster. This action cannot be undone.`}
              confirmLabel="Remove"
              onConfirm={() => removeMember(member)}
            />
          </div>
        ))}
        {crew.length === 0 && (
          <Text component="span" variant="body3">All crew members removed.</Text>
        )}
      </div>
    </div>
  );
};

const meta = {
  title: 'Recipes/Confirm Delete Dialog',
  component: ConfirmDeleteDialog,
  tags: ['autodocs', '!dev'],
  args: {
    text: 'Delete',
    title: 'Delete this item?',
    description: 'This action cannot be undone.',
    onConfirm: () => undefined,
  },
  parameters: {
    docs: {
      description: {
        component:
          'A reusable destructive-action confirmation. Wraps `Dialog` with `role="alertdialog"`, keeps its own `open` state and exposes an `onConfirm` callback, so any screen can get a consistent “are you sure?” flow. Combine with `Flash` and a `Toast` to acknowledge the action.',
      },
    },
  },
} satisfies Meta<typeof ConfirmDeleteDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FlashProvider>
      <ToastProvider>
        <CrewManifest />
      </ToastProvider>
    </FlashProvider>
  ),
};

export const Standalone: Story = {
  render: () => (
    <FlashProvider>
      <ConfirmDeleteDialog
        text="Delete project"
        title="Delete project"
        description="All data will be permanently lost. This action cannot be undone."
        onConfirm={() => undefined}
      />
    </FlashProvider>
  ),
  parameters: {
    layout: 'centered',
  },
};
