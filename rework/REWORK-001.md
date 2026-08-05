# REWORK-001 — Get rid of Tailwind, use plain CSS

> **Order:** run **after REWORK-002** (needs the split token CSS / theming scaffolding).

## Goal

Remove Tailwind CSS from the runtime, build pipeline, and dependencies. Replace utility-class strings with hand-written, co-located plain CSS class names, keeping `clsx` for class composition and **CVA** for variant → class-name mapping.

## Current state

- Tailwind 3.4 compiled at build time: `pnpm build-tailwind` runs the CLI over `src/index.css` (`@tailwind base/components/utilities`) → `src/nebula.css`, then `vite build` bundles it and `rm src/nebula.css` cleans up.
- `tailwind.config.mjs` spreads `tw.generateTailwindCompatibleTheme()` into `theme.extend`, generating utility names from tokens (e.g. `bg-button-background-primary`, `px-button-spacing-md-h-default`, `ring-border-1`).
- `vite.config.ts` and `postcss.config.js` both configure the Tailwind PostCSS plugin.
- Component variants (`src/variants/**/*.ts`, CVA) emit long Tailwind utility strings; the hand-written CSS (`typography/index.css`, `button/button.css`, `panel/panel.css`) already mixes plain classes with token `var(--nb-*)` references.
- `clsxMerge()` in `src/common/utils/classNameUtils.ts` is currently a thin `clsx` wrapper; `tailwindMergeConfig.ts` exists but is unused.

## Target

- No Tailwind dependency, config, or CLI step. Tailwind-generated utilities are replaced by real CSS classes.
- One plain `.css` file per component (or per variant group), imported by the component.
- Class naming convention (BEM-ish, `nb-` prefix): e.g. `.nb-button`, `.nb-button--filled`, `.nb-button--size-m`, `.nb-button--rounded-r`, `.nb-icon`, `.nb-panel`, `.nb-text--header1`.
- CVA stays but now returns plain class names instead of utilities (`cva('nb-button', { variants: { variant: { filled: 'nb-button--filled', … }, size: { S: 'nb-button--size-s', … }, … } })`).
- `clsx` kept for composition (`clsx` suffices; tailwind-merge is not needed once classes are plain CSS).

## Steps

1. **Remove Tailwind plumbing**
   - Delete `tailwind.config.mjs`, `postcss.config.js` (or strip its tailwindcss plugin; keep autoprefixer/cssnano if desired).
   - `package.json`: drop `tailwindcss`; remove `build-tailwind` script; adjust `build` script (`tsc && vite build`).
   - `vite.config.ts`: remove `tailwindcss` PostCSS plugin from `css.postcss`.
   - Delete `src/tailwindMergeConfig.ts` (tailwind-merge no longer relevant) and simplify `clsxMerge` in `src/common/utils/classNameUtils.ts` to plain `clsx` (or keep the `clsxMerge` name as an alias for continuity).
2. **Rewrite `src/variants/**` to plain CSS + CVA class names**
   - Convert every CVA string (button, iconButton, panel/paper, typography) from Tailwind utilities to plain classes.
   - Expand the existing `*.css` files (`button/button.css`, `typography/index.css`, `panel/panel.css`) into full component stylesheets that read `var(--nb-*)` directly (the token vars now split per REWORK-002).
   - Layout/interaction styles previously done with utilities (flex, padding, gap, rounded corners, hover/active/focus/disabled states) become authored CSS.
3. **Rewrite components** to import their `.css` and use CVA output + `clsx`/`clsxMerge`. Keep the rendered DOM and prop API identical to avoid breaking consumers/tests beyond snapshots.
4. **Rewrite demo pages & stories** (`src/pages/**`, `src/components/**/__docs__/**`) — replace utility strings with the same plain classes or component-level classes. Prefer composing primitives in CSS over one-off page utilities.
5. **Build & bundle**
   - Ensure Vite extracts one `dist/style.css` from imported CSS (no Tailwind passthrough). Confirm `index.ts` CSS imports (primitives + themes + component CSS) all end up in the bundle.
   - Remove the `rm src/nebula.css` step and the `src/nebula.css` generated-file mechanism entirely; delete `src/index.css` or repurpose it as the single entry that imports all library CSS (decide in step 5; likely keep a top-level `src/styles/index.css`).
6. **Update tests** — snapshot files under `src/**/__test__/__snapshots__/` will change because class strings change; regenerate them (`pnpm test -u`). Update any test asserting Tailwind classes (e.g. `disabled:cursor-not-allowed` in `Button.test.tsx`).

## Files touched

- Delete: `tailwind.config.mjs`, `postcss.config.js` (tailwind part), `src/tailwindMergeConfig.ts`
- `package.json`, `vite.config.ts`, `index.ts`, `src/index.css`
- Every `src/variants/**` (CVA files + CSS)
- Every `src/components/**/*.tsx`, plus new per-component `.css` files
- `src/pages/**`, `src/components/**/__docs__/**`, `src/components/**/__test__/**` (+ snapshots)
- `src/common/utils/classNameUtils.ts`

## Acceptance criteria

- `pnpm build` succeeds with no Tailwind; output `dist/style.css` contains the authored component CSS.
- `pnpm test` passes (snapshots regenerated, assertions updated).
- `pnpm lint` passes.
- Visual parity in Storybook and the dev app vs. the current build (spot-check buttons, panels, typography, FrameConnector/FramePanel).
- No `tailwind*` package remains in `package.json` / lockfile.
- `clsx` retained; `tailwind-merge` removed (unused).

## Dependencies

- Blocked by: REWORK-002 (token CSS scaffolding).
- Unblocks: REWORK-003, REWORK-004 (cleaner to rewrite components after CSS is in place).
