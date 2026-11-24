# Nebula Design Language

> Canonical visual authority. Anyone — human or agent — creating, changing or
> reviewing UI with `nebula-ds-react-library` reads this first. When a rule
> lives here, it is not decided again in application code.

## Identity

Nebula is a retro-futuristic system: 1970s space-age optimism, Bauhaus geometry,
and the structural language of Star Trek's LCARS interface.

- **Typography**: `Orbitron` (500–800) carries display, headers, buttons and
  captions; `Roboto Mono` (400) carries all body copy and field labels. Body
  text being monospace is deliberate — it reads as a ship's console.
- **Color**: one vivid orange (`#E6873E`, `--nb-primary-500`) reserved for
  primary actions and structure, one red-orange (`#E35A3D`,
  `--nb-secondary-500`) for pressed/emergency states, on warm bone neutrals.
  See [`PALETTE.md`](PALETTE.md).
- **Structure over decoration**: pages are frames (`FramePanel`), cards are
  panels (`Panel`), and the curved "frame connector" nodes are load-bearing
  structure, never ornament.
- **One heavy corner per element**: a single fully-rounded corner is the
  signature LCARS gesture (see Corners).

## Hard rules for application code

These are the rules that keep a consumer app *on-system*. Breaking any of
them is a review failure, not a style preference.

1. **No literal colors.** Never write a hex, `rgb()` or named color in app
   code. Use the semantic CSS variable (`var(--nb-background-primary)`, …) or,
   if you must read a value in JS, the token objects
   (`import { lightJsTokens, darkJsTokens } from 'nebula-ds-tokens'`).
   Semantic tokens first; raw primitives (`--nb-orange-500`, `--nb-gray-700`)
   only when no semantic role fits.
2. **No literal typography.** Never set font-family/size/weight by hand.
   Render text with the `Text` component and its `variant`
   (`display1…caption`, `header1-6`, `body1-5`, `button`). Only app-scale
   content that has no variant (rare) may use `--nb-font-size-*` tokens.
3. **Spacing comes from the scale.** `--nb-0…--nb-10` = 0, 4, 6, 8, 12, 16,
   24, 32, 40, 48, 64 px. No other values.
4. **Radii come from the scale.** `--nb-border-radius-10…500`
   (3…100 px). No other values.
5. **Borders/rings come from the scale.** `--nb-border-0…5` (0…8 px). Nebula
   draws outlines as `box-shadow` rings that grow on hover (2 px → 3 px) —
   reproduce that with the tokens, never with ad-hoc shadows.
6. **One `filled` button per view or panel.** Everything else is `standard`
   (default for groups), `outlined` (tertiary emphasis) or `text`
   (inline/quiet). See Button roles below.
7. **Never style `nb-*` classes from app CSS.** Components are customized
   through their props (`size`, `variant`, `rounded`, `outline`, `className`).
   `className` may add layout (flex, grid, margin) but must not override
   component internals.
8. **Don't hand-roll LCARS shapes.** A page frame is `FramePanel`, a card is
   `Panel`, a connector is `FrameConnector`, a decorative band is `Horizon`.
   Compose them; never draw the geometry yourself.
9. **Icons** come from `@heroicons/react` (peer dependency) and are passed
   through `leftIcon` / `rightIcon` (Button), `icon` (IconButton/Menu items)
   or the `Icon` sizing wrapper. 16 px inside menus and selects, the
   component's own size elsewhere.
10. **Feedback uses both channels**: `flash('error'|'success')` for the
    whole-UI blink **and** `toast.error/success({...})` for the message, on
    any submit that can fail or succeed.

## Component roles

### Button — `variant` semantics (names are fixed)

| Variant | Look | Use for | Rule |
| --- | --- | --- | --- |
| `filled` | Orange background, near-black text | The single primary action | **One per view/panel** |
| `standard` | Transparent, quiet gray ring | Secondary actions, toolbars, most of a group | Default for groups |
| `outlined` | Transparent, orange ring | Tertiary emphasis, standalone openers | When the action deserves notice but isn't primary |
| `text` | No ring | Inline/quiet actions, nav | Never adjacent to a `filled` sibling |

Sizes `S` / `M` (default) / `L`. `type="button"` by default — pass
`type="submit"` inside forms. For links, wrap a button in `<a>` or style an
anchor as text; there is no `href` prop.

`IconButton` takes the same `variant`/`size`/`rounded` vocabulary and a
required `icon`.

### Corners — `rounded` vocabulary (names are fixed)

Nebula's signature is **one fully-rounded corner**; the rest stay small.

```
Default   ┌────┐      all four corners small (6–8 px by size)
          └────┘

R         ┌────╮      right side (both corners) fully rounded
          └────╯

L         ╭────┐      left side (both corners) fully rounded
          ╰────┘

RTop      ┌────╮      only top-right fully rounded
          └────┘

RBottom   ┌────┐      only bottom-right fully rounded
          └────╯

LTop      ╭────┐      only top-left fully rounded
          ╰────┘

LBottom   ┌────┐      only bottom-left fully rounded
          ╰────┘
```

Read `R`/`L` as "the heavy side". `RTop`/`RBottom`/`LTop`/`LBottom` add
compensation padding that shifts the label away from the fat corner.

**Pairing rule**: the heavy corner points away from the structure the button
sits against. A button in a panel's footer row uses `rounded="R"` (or
`LBottom`/`RBottom` at the very edge) so the frame reads as one continuous
shape. Buttons mirrored by `inverse` layouts flip to the `L*` family.

### Panels and frames

- **`Panel`** (a card): optional `renderTitle` above, `children` body,
  `renderActions` below; `outline` (`50|200|500|700`) sets border strength,
  `round` (`no|xs|lg`) sets the bottom-left corner. Use for grouping content.
- **`FramePanel`** (a page): the LCARS frame around a whole page or a major
  section. Slots: `title`/`renderTitle` (exactly one, XOR), `renderHeader`
  (actions opposite the title), `renderSideHeader`, `renderSide` (side action
  stack — becomes a top strip on mobile), `renderFooter`, `inverse` (mirrors
  the whole frame). The frame connectors collapse automatically below
  internal width thresholds; never disable that behaviour manually.
  Slot-by-slot detail lives in
  [`skills/nebula-ds/references/components/frame-layout.md`](../skills/nebula-ds/references/components/frame-layout.md)
  and [`examples/app-shell`](../examples/app-shell).
- **`FrameConnector`**: the curved node + bridge elements. Sizing `S/M/L`,
  `vertical`, `divider` (bridge only), per-node `hidden`/`fill`/`className`.

### Typography — `Text` variants

Orbitron: `display1` (72), `display2` (60), `header1-6` (48→18), `button`
(12/500), `caption` (10/500). Roboto Mono: `body1` (16) … `body5` (12).
`component` picks the HTML tag (`h1…h6`, `p`, `span`, `label`) independently of
`variant`. Headers and labels are Orbitron; sentences are Roboto Mono.

### Feedback

- **`Flash`** — `useFlash().flash('error' | 'success', {repeats, duration})`:
  blinks the entire UI (backgrounds, buttons, frames) twice by default.
  Requires `<FlashProvider>` around the app content.
- **`Toast`** — `useToast()` with `.create/.success/.error/.warning/.info/
  .loading({...})`, `action: {label, onClick}`, `closable`; `<ToastProvider>`
  (or a module-level `createToastStore()` + one `<Toaster store={…} />` for
  non-React callers).
- Provider order: `ThemeProvider > FlashProvider > ToastProvider > content`.

### Theming

Two themes, light (default) and dark. `<ThemeProvider theme>` sets
`data-nb-theme` on a wrapper `<div>` — everything below switches, and nested
providers theme only their subtree. Generated files
(`src/styles/tokens/primitives.css`, `src/styles/themes/*.css`) are the
runtime source of truth; regenerate with `pnpm generate-themes`, never
hand-edit them.

## Do / Don't

**Don't** — a form footer:

```tsx
// ❌ literal colors, ad-hoc spacing, two filled buttons, hand-rolled radius
<div style={{display: 'flex', gap: 10, marginTop: 20}}>
  <button style={{background: '#E6873E', color: '#111', borderRadius: 40}}>Save</button>
  <button style={{background: '#E6873E', color: '#111'}}>Delete</button>
</div>
```

**Do**:

```tsx
// ✅ tokens via variants, one primary, LCARS corner pairing
<div style={{display: 'flex', gap: 'var(--nb-4)', marginTop: 'var(--nb-5)'}}>
  <Button variant="standard" size="S" text="Delete" />
  <Button variant="filled" size="S" rounded="R" text="Save" />
</div>
```

**Don't** — drawing a frame by hand with divs and SVGs.
**Do** — `<FramePanel title="Ship status" renderHeader={…} renderFooter={…}>`.

**Don't** — `<h3 style={{fontFamily: 'Orbitron', fontSize: 30}}>` headings.
**Do** — `<Text component="h3" variant="header3">`.
