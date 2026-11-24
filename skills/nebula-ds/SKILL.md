---
name: nebula-ds
description: >-
  Builds, integrates and reviews React application UI using the
  nebula-ds-react-library package (the LCARS-inspired Nebula Design System).
  Use when setting up the library, or when changing screens, component
  composition, styling, themes or feedback in an app that uses it. Not a
  guide to maintaining the library itself.
metadata:
  source-revision: "94ede01"
---

# Consuming Nebula Design System

Nebula is a retro-futuristic React component library: Orbitron + Roboto Mono,
one signature orange, pages drawn as LCARS frames, everything token-driven.
Build application UI with its public components; this skill keeps the system
intact while you compose them.

## How to work with Nebula

1. Check the installed version before using anything: a component on
   repository `main` is not proof it has been released. Installed exports
   and declarations determine availability — verify behaviour against the
   matching-version source, not another library's similarly named API.
   Report a mismatch rather than inventing a prop or alias.
2. Load **only** the reference your task needs (table below). Do not read
   the whole set for every task.
3. Reuse the app's established compositions and change only the requested
   UI. Run the app's type/build checks and inspect the rendered states you
   touched (widths, themes, input modes). Report checks you did not perform.

## Consumer rules

- **No literal colors, fonts, sizes, spacings or radii in app code.** Use the
  semantic CSS variables (`var(--nb-*)`) or the `Text` component's variants.
  Semantic tokens before raw primitives.
- **One `filled` button per view or panel.** Secondary actions are
  `standard` (the group default), tertiary emphasis is `outlined`, inline
  actions are `text`.
- **Prefer existing components to lookalikes.** The app owns page layout and
  content; components own their anatomy. Customize through public props
  (`variant`, `size`, `rounded`, `outline`, `round`, `className`), never by
  targeting `nb-*` classes in app CSS.
- **Structure is composed, never drawn**: page → `FramePanel`, card →
  `Panel`, connector → `FrameConnector`, decorative band → `Horizon`.
- **Provider order is fixed**: `ThemeProvider > FlashProvider > ToastProvider
  > content`. `useFlash` throws outside its provider on purpose.
- **Feedback travels in pairs**: `flash('error'|'success')` for the blink,
  `toast.error/success({ title, description })` for the message.
- **Icons** come from `@heroicons/react` (peer dep) through `leftIcon`/
  `rightIcon`, `icon`, or the `Icon` wrapper; an `IconButton` always needs
  `aria-label`.
- Preserve accessible names, keyboard operation and visible focus when
  composing or overriding.

## Load by task

Paths are relative to this skill folder.

| Task | Read |
| --- | --- |
| Create or restyle UI; judge visual consistency | [Design language](references/design-language.md) |
| Assemble screens, forms, frames, feedback | [Composition](references/composition.md) |
| Install/integrate CSS; change themes or tokens | [Theming](references/theming.md) |
| Labels, focus, overlays, icon buttons, a11y | [Accessibility](references/accessibility.md) |
| Choose/configure a component or check its API | [Component index](references/components/index.md) |
| Buttons, icons, typography | [Actions & display](references/components/actions.md) |
| Fields, selection, validation patterns | [Forms](references/components/forms.md) |
| Menu/Sheet/Dialog + toast/flash wiring | [Overlays & feedback](references/components/overlays.md) |
| FramePanel slots, Panel cards, connectors | [Frame & layout](references/components/frame-layout.md) |

Upstream authority when in doubt: the repo's
[`docs/DESIGN_LANGUAGE.md`](../../docs/DESIGN_LANGUAGE.md) owns visual
policy; installed public declarations own the API. This skill is a consumer
translation of both — when they conflict, the source wins and the skill
needs an update.
