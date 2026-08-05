# REWORK-003 — ThemeProvider component

> **Order:** run **after REWORK-002** (needs the theme selectors `[data-nb-theme=…]` to exist).

## Goal

Add a React `ThemeProvider` component that scopes a theme to its subtree via a `data-nb-theme` attribute + React context, plus a `useTheme()` hook. Consumers wrap the app (or parts of it) to choose `light` / `dark` (and future themes).

## Current state

- No theming API exists. `index.ts` loads only the light token CSS globally (`nebula-ds-tokens/build/light-variables.css`), so every component renders the light theme.
- Components read token CSS vars; there is no React context for theme state.
- Storybook has a static theme in `.storybook/theme.ts` (docs chrome), but story content is always light.

## Target

`src/components/themeProvider/ThemeProvider.tsx`:

- Props:
  - `theme?: 'light' | 'dark'` — **required** default `'light'`.
  - `className?: string` — extra classes for the wrapper.
  - `children?: ReactNode`.
- Renders a wrapper `<div data-nb-theme={theme} className={clsx('nb-theme-provider', className)}>`.
- Provides context `{ theme, setTheme, themes }`.
- Exports:
  - `ThemeProvider`
  - `useTheme()` hook (`useContext`; throws if used outside provider, or returns defaults — decide and document; recommend returning a sensible default so it works without a provider).
  - A registry: `export const themes = ['light', 'dark'] as const` (and a `Theme = typeof themes[number]` type) so adding a theme = add CSS (REWORK-002) + register here.
- Nested providers must work (inner provider overrides outer for its subtree only).

## Steps

1. **Create the provider**
   - `src/components/themeProvider/ThemeProvider.tsx` (impl + context + hook + registry).
   - `src/components/themeProvider/ThemeProvider.css` (`.nb-theme-provider` — a plain display/layout class if needed; theme colors are inherited automatically from `[data-nb-theme]` selectors in REWORK-002).
   - `src/components/themeProvider/__docs__/ThemeProvider.stories.tsx`:
     - default light story;
     - dark story;
     - "side-by-side" story rendering two nested providers (light + dark) to prove simultaneous theming;
     - interactive story with a toggle button using `useTheme().setTheme`.
   - `src/components/themeProvider/__test__/ThemeProvider.test.tsx`:
     - renders `data-nb-theme="light"` by default;
     - sets `data-nb-theme="dark"` when `theme="dark"`;
     - nested provider overrides parent in its subtree only;
     - `useTheme` returns the right theme inside the provider.
2. **Export from `index.ts`** (`ThemeProvider`, `useTheme`, `themes`).
3. **Wire Storybook**
   - `.storybook/preview.tsx`: wrap the `decorators` in `<ThemeProvider theme="light">`.
   - Add a Storybook `globals`/toolbar control (light/dark) in `.storybook/main.ts` or `preview.tsx` using `globalTypes`/`initialGlobals` that switches the provider's theme — gives a live theme switcher for all stories.
   - Keep `.storybook/theme.ts` (docs chrome) as-is; optionally sync the toolbar value into it later (out of scope).
4. **Use in the demo app** (`src/main.tsx` / `src/App.tsx`): wrap the demo in `<ThemeProvider theme="light">`; optionally add a toggle button on the demo page to exercise dark.
5. **Docs** — update `docs/PROJECT.md` and the Developer getting-started MDX with a ThemeProvider usage snippet.

## Files touched

- `src/components/themeProvider/ThemeProvider.tsx` (new)
- `src/components/themeProvider/ThemeProvider.css` (new)
- `src/components/themeProvider/__docs__/ThemeProvider.stories.tsx` (new)
- `src/components/themeProvider/__test__/ThemeProvider.test.tsx` (new)
- `index.ts`
- `.storybook/preview.tsx`, `.storybook/main.ts` (toolbar/globals)
- `src/main.tsx`, `src/App.tsx` (demo)
- `docs/PROJECT.md`, `src/stories/getting-started/GettingStartedDeveloper.mdx`

## Acceptance criteria

- `<ThemeProvider theme="dark">` flips all children to the dark semantic tokens; `light` restores them.
- Nested providers work independently (verified by the side-by-side Storybook story and a test).
- `useTheme()` exposes `{ theme, setTheme, themes }` and updates `data-nb-theme` on the wrapper when `setTheme` is called.
- Storybook has a working light/dark toggle affecting all stories.
- `pnpm build`, `pnpm test`, `pnpm lint` pass.

## Dependencies

- Blocked by: REWORK-002 (theme selectors must exist for the attribute to have effect).
- Independent of: REWORK-001, REWORK-004 (but do it after 001 so the wrapper CSS follows the new plain-CSS pattern).
