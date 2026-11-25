# nebula-ds-react-library

React implementation of the **Nebula Design System** — a retro-futuristic,
LCARS-inspired component library. Orbitron + Roboto Mono, one signature
orange, structure drawn as frames, everything token-driven.

- **Storybook:** https://nebula-ds-react-library.irongalaxy.space
- **Design language (read this before styling anything):** [`docs/DESIGN_LANGUAGE.md`](docs/DESIGN_LANGUAGE.md)
- **Palette and color roles:** [`docs/PALETTE.md`](docs/PALETTE.md)
- **Copyable full-page examples:** [`examples/`](examples/)
- **Tokens repository:** https://github.com/mattyx96/nebula-ds-tokens

## Installation

Requires **React 19** and the peer dependencies `@heroicons/react`,
`class-variance-authority`, `clsx` (install them yourself — they are not
bundled).

```bash
pnpm add nebula-ds-react-library @heroicons/react class-variance-authority clsx
```

**1. Load the fonts** — Orbitron and Roboto Mono are required, in `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
```

**2. Import the stylesheet** once, in your entry file:

```js
import 'nebula-ds-react-library/style';
```

**3. Wrap your app in the providers** (theme, whole-UI flash feedback, toasts —
in that order):

```jsx
import {
  ThemeProvider, FlashProvider, ToastProvider,
} from 'nebula-ds-react-library';

root.render(
  <ThemeProvider theme="light">
    <FlashProvider>
      <ToastProvider placement="bottom-end">
        <App />
      </ToastProvider>
    </FlashProvider>
  </ThemeProvider>
);
```

Only `ThemeProvider` is strictly required; add the others when you use
`useFlash()` / `useToast()`.

## Quick usage

```jsx
import {
  Button, IconButton, Text, Panel, FramePanel,
  Input, Checkbox, Select, RadioGroup,
  Menu, Sheet, Dialog,
  useToast, useFlash, useTheme,
} from 'nebula-ds-react-library';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

<Text component="h1" variant="header2">Ship status</Text>

<Button variant="filled" rounded="R" onClick={save}>Save</Button>
<Button variant="standard" size="S" onClick={cancel}>Cancel</Button>
<IconButton variant="outlined" icon={<TrashIcon />} aria-label="Delete" />

<Input label="Email" type="email" value={v} onChange={e => setV(e.target.value)}
       errors={submitted && !valid ? ['Enter a valid email'] : undefined} />

<Panel outline="500" round="lg" renderTitle={<Text component="h6" variant="header6">Crew</Text>}>
  <Text component="p" variant="body1">Content…</Text>
</Panel>
```

## Component map

| Group | Exports |
| --- | --- |
| **Actions** | `Button`, `IconButton` |
| **Forms** | `Input`, `Select`, `Checkbox`, `RadioGroup` |
| **Overlays** | `Dialog`, `Sheet`, `Menu` (responsive menu → sheet), `ToastProvider`, `Toaster`, `useToast`, `createToastStore` |
| **Feedback** | `FlashProvider`, `useFlash` (`flash('error' \| 'success')` blinks the whole UI) |
| **Layout & frames** | `FramePanel` (page frame), `Panel` (card, alias `Paper`), `FrameConnector`, `Horizon` (decorative line band) |
| **Typography** | `Text` — Orbitron display/headers (`display1-2`, `header1-6`, `button`, `caption`), Roboto Mono body (`body1-5`) |
| **Theme & utils** | `ThemeProvider`, `useTheme`, `themes`, `Icon` (icon sizing wrapper), `useBreakpoint` |
| **Tokens** | `config` namespace from `nebula-ds-tokens` (`lightJsTokens`, `darkJsTokens`, `tw`, `utilities`) |

### The two contract rules agents break most often

1. **Variant semantics are fixed** (see
   [DESIGN_LANGUAGE.md](docs/DESIGN_LANGUAGE.md#button--variant-semantics-names-are-fixed)):
   `filled` = the one primary action per view/panel; `standard` = secondary;
   `outlined` = tertiary emphasis; `text` = inline/quiet.
2. **Frame slots are positional** (see
   [examples/app-shell](examples/app-shell)):
   `FramePanel` takes `title` **or** `renderTitle` (never both), plus
   `renderHeader`, `renderSide`, `renderSideHeader`, `renderFooter`;
   `inverse` mirrors the frame; on mobile `renderSide` collapses into a strip
   above the content.

### Feedback wiring

```jsx
const toast = useToast();
const { flash } = useFlash();

function onSubmit(event) {
  event.preventDefault();
  if (!valid) {
    flash('error');
    toast.error({ title: 'Cannot sign in', description: 'Check the fields.' });
    return;
  }
  flash('success');
  toast.success({ title: 'Welcome aboard' });
}
```

Provider-free toasts: `const store = createToastStore({ placement: 'bottom-end' })`
at module scope, mount `<Toaster store={store} />` once, then
`useToast(store)` — usable even from outside React.

## Theming

Light is the default (no provider needed). `<ThemeProvider theme="dark">`
sets `data-nb-theme` on a wrapper `<div>`; every Nebula component below it
switches. Nested providers theme only their own subtree, so you can show
light and dark side by side.

```jsx
function App() {
  const { theme, setTheme } = useTheme();
  return (
    <ThemeProvider theme="light">
      <Button variant="outlined" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle
      </Button>
    </ThemeProvider>
  );
}
```

Semantic tokens (`--nb-background-*`, `--nb-button-*`, `--nb-paper-*`, …) swap
per theme; app code should use them, never literal colors. The generated
files `src/styles/tokens/primitives.css` and `src/styles/themes/*.css` are
the runtime source of truth (`pnpm generate-themes` regenerates them from
`nebula-ds-tokens`).

## For AI agents

- **Skill:** [`skills/nebula-ds`](skills/nebula-ds) — install it into your
  agent's skill directory; it routes you to the exact reference for your task
  (design language, composition, theming, per-component families). It ships
  inside the npm tarball too:
  `node_modules/nebula-ds-react-library/skills/nebula-ds/SKILL.md`.
- **llms.txt:** `https://nebula-ds-react-library.irongalaxy.space/llms.txt`
  indexes every component, example and contract as plain text.
- Storybook is the rendered evidence, not the documentation: the contracts
  are these markdown files.

## Releasing a new version

On GitHub run the matching **Publish** workflow (Actions → **Publish patch** /
**Publish minor** / **Publish major** → Run workflow). The workflow bumps the
version, builds, publishes to npm (with provenance via npm Trusted
Publishing / OIDC), commits + pushes + **tags** the version bump, and creates
the matching **GitHub Release** from the tag — no local steps needed. The
local `pnpm release` mirrors the same logic (bump → build → commit → push →
tag; publish and the GitHub Release only via the workflow).

### Roadmap

- [X] document tokens
- [X] document typography
- [X] improve typography (adding ad-hoc component)
- [X] theming infrastructure (light/dark CSS scaffolding)
- [X] remove Tailwind (plain CSS)
- [X] add theme provider
- [X] FramePanel responsive rework (CSS Grid + container queries)
- [X] update Storybook & libraries (Vite 6, Vitest 2, TS 5.9, ESLint 9, Husky 9)
- [X] update everything to latest majors (Storybook 10, React 19, Vite 8, Vitest 4, TS 6)
- [X] agent-usability layer (design language, examples, consumer skill —
      see [`rework/REWORK-006-agent-usability.md`](rework/REWORK-006-agent-usability.md))
- [ ] accessibility pass (a11y addon, WCAG audit)
