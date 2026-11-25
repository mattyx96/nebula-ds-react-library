# Overlays & feedback

## Menu — responsive by default

```jsx
<Menu
  text="Actions"
  variant="outlined"
  indicator={<ChevronDownIcon width={16} height={16}/>}
  title="Actions"                       // sheet header (mobile)
  items={[
    {value: 'edit', text: 'Edit', leftIcon: <PencilIcon width={16} height={16}/>},
    {value: 'sep', separator: true},
    {value: 'delete', text: 'Delete'},
  ]}
  onSelect={(value) => act(value)}
/>
```

- `mode="auto"` (default): **dropdown on desktop, bottom sheet below
  `breakpoint`** — you do not wire `useBreakpoint()` yourself. Pin with
  `mode="menu"` or `mode="sheet"`.
- `items: { value, text, leftIcon?, rightIcon?, disabled?, separator? }[]`.
- Controlled: `open` + `onOpenChange`. Selection: `onSelect(value)`.
- Desktop-only tuning: `align`, `positioning`, `typeahead`, `loopFocus`,
  `defaultHighlightedValue`, `ariaLabel`.
- Trigger: `text` or a custom `trigger` node.

## Sheet

The standalone bottom drawer (same `items` API). Use it when the trigger is
not a menu pattern; for action menus prefer `Menu`, which already switches
to a sheet on mobile.

```jsx
<Sheet text="More" title="More actions" description="Pick one" items={items} onSelect={act}/>
```

## Dialog

```jsx
<Dialog
  text="Delete project" size="S" variant="outlined" rounded="R"
  role="alertdialog"
  title="Delete this project?"
  description="This action cannot be undone."
  open={open} onOpenChange={setOpen}
>
  <Button variant="standard" size="S" onClick={() => setOpen(false)}>Cancel</Button>
  <Button variant="filled" size="S" rounded="R" onClick={confirm}>Delete</Button>
</Dialog>
```

- `role="alertdialog"` for destructive confirms; default role for the rest.
- Children are the body — the action row goes there, Cancel closes.
- `modal` (default true), `closeOnEscape`, `closeOnOutsideClick` if present
  in your version. Controlled: `open` + `onOpenChange`.
- Trigger: `text` or a custom `trigger` node.

## Toast

The **hook** is the API: `const toast = useToast()`.

```jsx
toast.create({title, description, type, duration, closable,
             action: {label, onClick}});
toast.success({title: 'Saved'});   // also .error .warning .info .loading
toast.dismiss();                   // all
toast.remove();                     // immediately
```

- Mount: wrap in `<ToastProvider placement="bottom-end" overlap max>`, or
  provider-free — `const store = createToastStore({placement})` at module
  scope + one `<Toaster store={store} />` (works from outside React).
- `type: 'info' | 'success' | 'error' | 'warning' | 'loading'`.

## Flash

```jsx
const {flash} = useFlash();
flash('error');                 // blink the whole UI twice
flash('success', {repeats: 3, duration: 150});
```

- Tones: `'error' | 'success'` only. Requires `<FlashProvider>`.
- The blink is the feeling, the toast is the message — on submit results,
  call both (see [Composition](../composition.md#submit--flash--toast-always-together)).
