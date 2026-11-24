# App shell — a complete page in the LCARS frame

The recipe `FramePanel` was missing: a full page composition with real
actions in every slot. Copy this file into an app, change the imports from
`../../index` to `'nebula-ds-react-library'`, and adjust the content.

## What it demonstrates

| Pattern | Where |
| --- | --- |
| Provider order `ThemeProvider > FlashProvider > ToastProvider` | `AppShellExample` |
| `FramePanel` slots: `title`, `renderHeader`, `renderSide`, `renderFooter` | `AppShell` |
| Exactly one `filled` primary action per frame (`Save changes`), everything else `standard`/`outlined` | `AppShellFooter` |
| LCARS corner pairing: the primary footer button takes `rounded="R"` so its heavy corner opens toward the frame edge | `AppShellFooter` |
| Responsive action size via `useBreakpoint()` (M desktop, S below) | `AppShell` |
| Theme toggle with `useTheme().setTheme` | `AppShellHeader` |
| `Menu` with separators + a chevron `indicator`, firing toasts from `onSelect` | `AppShellHeader` |
| Form state lifted to the frame so the footer's Save submits the card's fields | `StatusForm` |
| Feedback pair on submit: `flash('error'|'success')` + `toast.error/success` | `AppShell.save` |
| A `Panel` card (`outline`, `round`, `renderTitle`) inside the frame body | `StatusForm` |
| `IconButton` with `aria-label` (icons carry no name by themselves) | `AppShellHeader`, `AppShellSide` |

## FramePanel slot map (as used here)

```
┌────────────────────────────────────────────────┐
│ title ── connector ── [theme] [bell] [menu]    │  header (renderHeader)
├──────┬─────────────────────────────────────────┤
│ side │  Panel card (StatusForm)                 │  renderSide → IconButtons
│      │                                          │  (collapses to a strip on mobile)
├──────┴─────────────────────────────────────────┤
│ connector ──────────── [Back] [Save changes]   │  footer (renderFooter)
└────────────────────────────────────────────────┘
```

With `inverse`, every position mirrors (title right, actions left, side
column right, footer actions left) — swap the footer primary to
`rounded="L"` to keep the heavy corner opening toward the edge.

## Run it

```bash
pnpm dev            # open the dev app, page "AppShell"
pnpm storybook      # Components → FramePanel → AppShellComposition
```

The connector nodes collapse automatically when the frame gets narrow —
that is intended responsive behaviour (thresholds in `FramePanel.tsx`
JSDoc), not a layout bug.
