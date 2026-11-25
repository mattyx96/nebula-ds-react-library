# Forms

Pattern shared by all fields: controlled state in one object, validate on
submit, surface errors through each control's own error path. See
[Composition → A form](../composition.md#a-form).

## Input

```jsx
<Input
  label="Email" type="email" isRequired
  placeholder="you@example.com"
  value={values.email}
  onChange={(e) => setValues({...values, email: e.target.value})}
  errors={emailError}
  helperText="We never share it."
/>
```

- `label` (or `labelContent` for a custom label node); `helperText` is the
  quiet hint; **`errors: string[]` renders the error list** — the canonical
  way to show a field problem.
- Native input props pass through (`type`, `autoComplete`, `disabled`, …).
- `fullWidth` stretches the field; `isRequired` renders the asterisk.
- `size` S/M/L, `variant` (default `outlined`), `rounded` as usual.

## Select

```jsx
<Select
  label="Status"
  placeholder="Pick a status"
  indicator={<ChevronDownIcon width={16} height={16}/>}
  items={[
    {label: 'Active', value: 'active'},
    {label: 'Docked', value: 'docked', disabled: true},
  ]}
  value={values.status}                    // string[] — always an array
  onValueChange={(status) => setValues({...values, status})}
/>
```

- `items: { label, value, disabled? }[]`. Value is **`string[]` even for
  single select**; `defaultValue: ['active']`.
- `multiple` picks many; `name` makes it participate in native forms.
- Invalid: pass `invalid` and render an error line beside it (Select has no
  `errors` prop — the error lives in your form layout, matching the
  recipes' pattern).
- Panel look: `round`/`outline` style the popup; `size`/`variant`/`rounded`
  style the trigger.

## Checkbox

```jsx
<Checkbox
  label="Remember me"
  checked={values.rememberMe}
  onCheckedChange={(checked) => setValues({...values, rememberMe: checked === true})}
/>
```

- `checked` controlled: `true | false | 'indeterminate'`;
  `defaultChecked` seeds uncontrolled. `onCheckedChange` reports the next
  state.
- Forms: pass `name` + `value` — a hidden input participates in submission.
- "Select all" parent: `checked="indeterminate"` while some children are
  on. `invalid` flags the box with the error tone.

## RadioGroup

```jsx
<RadioGroup
  label="Engine"
  items={[{value: 'impulse', label: 'Impulse'}, {value: 'warp', label: 'Warp'}]}
  value={values.engine}
  onValueChange={(engine) => setValues({...values, engine})}
/>
```

- Exactly one choice — for multi-choice use `Checkbox`es or a `multiple`
  `Select`, never a RadioGroup.
- `defaultValue` for uncontrolled; `orientation="horizontal|vertical"`;
  `invalid` + your own error line.
- `label` on the group names every radio (one field, one name).
