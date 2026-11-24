# Composition

How pieces combine into screens. All names import from
`'nebula-ds-react-library'`.

## Provider order (fixed)

```jsx
<ThemeProvider theme="light">
  <FlashProvider>
    <ToastProvider placement="bottom-end">
      <App />
    </ToastProvider>
  </FlashProvider>
</ThemeProvider>
```

`ThemeProvider` is the only required one. `useFlash()` throws outside
`FlashProvider` — that is intentional; mount the provider instead of working
around it.

## A page = one FramePanel

Wrap the page (or a major section) in a `FramePanel` and fill the slots;
never draw the frame geometry yourself.

```jsx
<FramePanel
  title="Ship status"                 // or renderTitle — never both
  renderHeader={<ThemeToggle/>}       // opposite the title
  renderSide={<IconActions/>}         // collapses to a strip on mobile
  renderFooter={<SaveBackRow/>}
>
  {content}                           // Panel cards, forms, tables
</FramePanel>
```

`inverse` mirrors every slot position — flip the footer primary's corner
from `R*` to `L*` to keep the heavy corner opening toward the edge.

## A card = one Panel

```jsx
<Panel
  outline="500"
  round="lg"
  className="app-grid__full"          // layout only, never internals
  renderTitle={<Text component="h6" variant="header6">Crew</Text>}
  renderActions={<Button variant="filled" rounded="R">Save</Button>}
>
  <Text component="p" variant="body1">…</Text>
</Panel>
```

## A form

Controlled fields in one state object; validate on submit; surface errors
through each control's error path:

```jsx
const [values, setValues] = useState({email: '', role: []});
const [submitted, setSubmitted] = useState(false);

const emailError = submitted && !/^\S+@\S+\.\S+$/.test(values.email)
  ? ['Enter a valid email'] : undefined;

<Input label="Email" isRequired value={values.email}
       onChange={(e) => setValues({...values, email: e.target.value})}
       errors={emailError}/>

<Select label="Role" items={roles} value={values.role}
        onValueChange={(role) => setValues({...values, role})}/>
```

- `Input` renders its own `errors` list.
- `Select`/`RadioGroup`/`Checkbox` take `invalid` + an error line you render.
- `Checkbox` submits: pass `name` + `value` and it participates in forms.

## Submit = flash + toast, always together

```jsx
const {flash} = useFlash();
const toast = useToast();

function onSubmit(e) {
  e.preventDefault();
  setSubmitted(true);
  if (invalid) {
    flash('error');
    toast.error({title: 'Cannot save', description: 'Check the fields.'});
    return;
  }
  flash('success');
  toast.success({title: 'Saved', description: 'Configuration persisted.'});
}
```

## Responsive actions (Menu switches itself)

`Menu` is responsive by default: `mode="auto"` renders the dropdown on
desktop and a bottom **sheet** below its `breakpoint` (pass `title`/
`description` for the sheet header). Pin a presentation with
`mode="menu"` or `mode="sheet"`; reach for the standalone `Sheet` component
only when the trigger is not a menu (custom bottom drawers).

Frame actions step down a size on mobile:
`const size = isMobile ? 'S' : 'M'`.

## Complete page reference

[`examples/app-shell`](../../../examples/app-shell) in the repo — frame +
header actions + side stack + footer with the one primary + lifted form
state + feedback, with a slot map in its README.
