# Design language (consumer view)

The full authority is the repo's [`docs/DESIGN_LANGUAGE.md`](../../../docs/DESIGN_LANGUAGE.md)
— this page carries the decisions you make while building screens.

## Variant roles (names are fixed)

| Variant | Look | Use | Rule |
| --- | --- | --- | --- |
| `filled` | Orange fill, dark text | The primary action | **One per view/panel** |
| `standard` | Quiet ring | Secondary actions, groups | Default for groups |
| `outlined` | Orange ring | Tertiary emphasis | Standalone openers |
| `text` | No ring | Inline/quiet | Never beside a `filled` sibling |

## The LCARS corner

One heavy corner per element, pointing **away** from the structure the
element sits against:

```
Default  ┌────┐   R      ┌────╮   RTop    ┌────╮
         └────┘          └────╯           └────┘

L        ╭────┐   RBottom ┌────┐  LTop    ╭────┐
         ╰────┘           └────╯          ╰────┘

LBottom  ┌────┐
         ╰────┘
```

- Footer rows: primary takes `rounded="R"` (or `"LBottom"`);
  an `inverse` frame flips it to the `L*` family.
- `RTop`/`RBottom`/`LTop`/`LBottom` add compensation padding that shifts the
  label away from the fat corner — don't fight it with extra padding.

## Typography

`<Text component={tag} variant={role}>`. Roles, not ad-hoc styles:

- Orbitron: `display1`, `display2`, `header1`–`header6`, `button`, `caption`
- Roboto Mono (all sentences): `body1`–`body5`

`component` (the HTML tag) and `variant` (the look) are independent —
a semantic `h2` may carry `body1` if the design says so.

## Scale discipline

- Spacing: `var(--nb-0)` … `var(--nb-10)` = 0,4,6,8,12,16,24,32,40,48,64 px.
- Radius: `var(--nb-border-radius-10…500)` (3…100 px).
- Rings/borders: `var(--nb-border-0…5)` (0…8 px). Rings grow 2→3 px on
  hover — that growth is the system; don't add your own hover styles.

## What "on-system" means in review

- zero literal colors / fonts / sizes in the diff;
- one `filled` primary per view/panel;
- corners paired with their edge, `inverse` layouts mirrored;
- frames are `FramePanel`, cards are `Panel` — no hand-rolled LCARS shapes;
- feedback = flash + toast together.
