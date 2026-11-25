# Theming and integration

## Setup (required, in order)

1. Peer deps: `react@19`, `react-dom@19`, `@heroicons/react`,
   `class-variance-authority`, `clsx`.
2. Fonts in `<head>` — Orbitron **and** Roboto Mono, or typography falls
   back and breaks the look:

   ```html
   <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap" rel="stylesheet">
   <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
   ```

3. Styles once, in the entry file: `import 'nebula-ds-react-library/style';`
4. Providers if you theme/flash/toast: see
   [Composition](composition.md#provider-order-fixed).

## Switching themes

Light is the no-provider default. `<ThemeProvider theme>` sets
`data-nb-theme` on a **wrapper `<div>`**, not on `<html>` — everything below
it switches:

```jsx
const {theme, setTheme} = useTheme();

<ThemeProvider theme="light">
  <Button variant="outlined"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
    Toggle
  </Button>
</ThemeProvider>
```

Nested providers theme only their subtree — side-by-side light/dark is a
supported layout.

**CSS-variable gotcha**: read theme-scoped vars via `getComputedStyle` from
the themed wrapper element, not `document.documentElement` — the attribute
isn't on the root.

## Reading token values in JS

```js
import {config} from 'nebula-ds-react-library';
const {lightJsTokens, darkJsTokens} = config;
// e.g. lightJsTokens.nbPrimary500 === '#E6873E'
```

Use these for canvas drawing or non-DOM values; in CSS/JSX prefer the
`var(--nb-*)` custom properties.

## What not to do

- Don't hardcode hex values — the dark theme swaps semantic tokens, a
  literal light color silently breaks contrast in dark mode.
- Don't build a second theme system; if a theme value is missing, the fix
  belongs upstream in `nebula-ds-tokens`, not in app CSS.
- Don't override `nb-*` classes from app stylesheets. `className` props may
  add layout (grid/flex/margins) but must not restyle component internals —
  request the variant instead.
