# Actions & display

## Button

```jsx
<Button variant="filled" rounded="R" onClick={save}>Save</Button>
<Button variant="standard" size="S">Cancel</Button>
```

- Variants (roles fixed): `filled` primary — **one per view/panel**;
  `standard` secondary/group default; `outlined` tertiary emphasis;
  `text` inline/quiet.
- `size`: `S` / `M` (default) / `L`. `rounded`: `Default, R, L, RTop,
  RBottom, LTop, LBottom` — the heavy corner points away from the structure
  the button sits against.
- Label: `children` preferred; `text` is a string shorthand. Both render if
  both are passed (`text` first) — pick one.
- Icons: `leftIcon` / `rightIcon` (any heroicons node; sized by `size`).
- Native props pass through; renders `type="button"` — pass
  `type="submit"` inside forms. No `href` prop: wrap in `<a>` for links.
- Disabled: 0.5 opacity, `cursor: not-allowed` — no extra styling needed.

## IconButton

```jsx
<IconButton variant="standard" icon={<BellIcon width={16} height={16}/>} aria-label="Notifications"/>
```

- `icon` required; same `variant`/`size`/`rounded` vocabulary as Button.
- **Always `aria-label`** — an icon has no accessible name.
- Rules inherit from Button: one `filled` icon action at most, `standard`
  for toolbars, corners paired with the frame edge.

## Icon

Sizing wrapper for inline icons (`S`/`M`/`L`); spreads native div props, so
`aria-hidden`/`style`/`title` work. You rarely use it directly — Button and
IconButton wrap their icon slots for you.

## Text

```jsx
<Text component="h2" variant="header2">Warp core</Text>
<Text component="p" variant="body1">Full impulse.</Text>
```

- `variant` = the type role; `component` = the HTML tag. Independent.
- Orbitron: `display1`, `display2`, `header1`–`header6`, `button`,
  `caption`. Roboto Mono: `body1`–`body5` (all sentences).
- `text` prop is a string shorthand; `children` wins if both are passed.
- Never hand-set font-family/size/weight — if a role is missing, the
  library's variants get extended, not your app's CSS.
