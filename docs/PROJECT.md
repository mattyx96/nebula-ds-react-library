# Nebula Design System — React Library

Comprehensive project documentation for the `nebula-ds-react-library` repository.

- **Repo**: https://github.com/mattyx96/nebula-ds-react-library
- **Storybook**: https://nebula-ds-react-library.irongalaxy.space
- **Tokens repo**: https://github.com/mattyx96/nebula-ds-tokens
- **Author**: mattyx96 (Matteo Omicini)

---

## 1. Overview

`nebula-ds-react-library` is the **React implementation** of the Nebula Design System. It is a publishable component library (MIT, public on npm) whose visual language is driven entirely by the **design tokens** from the companion package `nebula-ds-tokens`.

The aesthetic is "retro-futuristic": inspired by 1970s space-age design, Bauhaus geometry, and Star Trek's **LCARS** interface. Its signature elements are the *frame connector* graphics (curved "LCARS-style" node SVG shapes connected by bridges) used to build the `FrameConnector` and `FramePanel` components, and the **Orbitron / Roboto Mono** font pairing.

Currently the library ships **7 public components**, **1 hook**, plus the tokens re-exported under a `config` namespace.

---

## 2. Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 18 (`^18.2.0`, peer dep) |
| Language | TypeScript 5.4 (strict) |
| Bundler | Vite 5 (library mode) |
| Styling | Tailwind CSS 3.4 + CSS custom properties (tokens) |
| Variants | class-variance-authority (CVA) |
| Class merge | `clsx` (twMerge disabled — see §7) |
| Icons (peer) | `@heroicons/react` `^2.1.3` |
| Testing | Vitest 1.6 + @testing-library/react + jest-dom, jsdom env |
| Docs | Storybook 8 + MDX + autodocs, themed with `@storybook/theming` |
| Lint/Format | ESLint 8 (flat config) + Prettier (via eslint-plugin-prettier) |
| Package manager | pnpm (lockfile committed) |
| Hooks | Husky 8 + lint-staged (pre-commit runs `pnpm run lint`) |
| Deploy | Vercel (Storybook static build) |

### Dependencies

- **runtime**: `nebula-ds-tokens` `0.2.0`
- **peer** (must be provided by the consumer): `@heroicons/react`, `class-variance-authority`, `clsx`, `react`, `react-dom`, `tailwind-merge`

---

## 3. Repo Structure

```
.
├── .husky/                 # pre-commit hook -> pnpm run lint
├── .scripts/
│   └── release.sh          # version bump + build + publish + commit + push
├── .storybook/             # Storybook config, custom theme, head files
├── docs/
│   └── PROJECT.md          # this file
├── public/                 # favicons, logo, design-tokens.source.json (gitignored)
├── src/
│   ├── App.tsx             # demo app page switcher (used by `pnpm dev`)
│   ├── index.css           # @tailwind base/components/utilities (build input)
│   ├── main.tsx            # demo app entry
│   ├── common/
│   │   └── utils/classNameUtils.ts    # clsxMerge()
│   ├── components/         # each component: impl + __docs__ (stories) + __test__
│   ├── hook/               # useBreakpoint, useElementDimensions, useEventListener
│   ├── pages/              # demo pages shown in the dev app / Tokens MDX
│   ├── stories/            # MDX docs: Introduction, Tokens, Getting started
│   ├── tailwindMergeConfig.ts  # extended twMerge config (currently unused)
│   └── variants/           # CVA variants + css per component
├── index.ts                # library entry / public exports
├── index.html              # demo app shell (loads Orbitron + Roboto Mono fonts)
├── tailwind.config.mjs     # theme extended from tokens
├── vite.config.ts          # lib build + vitest config
├── tsconfig.json / tsconfig.node.json
├── eslint.config.js
├── postcss.config.js
├── prettier.config.cjs
├── vercel.json             # Storybook deploy config
└── setupTests.ts           # vitest setup + jest-dom matchers + useBreakpoint mock
```

### Component folder convention

Every component lives under `src/components/<name>/` and follows the same layout:

```
src/components/<name>/
├── <Name>.tsx              # implementation
├── __docs__/               # <Name>.stories.tsx (Storybook stories)
└── __test__/               # <Name>.test.tsx + __snapshots__/
```

Note: `FramePanel`'s docs folder is `__docs___` (three underscores) — an existing inconsistency.

---

## 4. Public API

The library entry is `index.ts`. Everything exported from it becomes the published package API:

```ts
import 'nebula-ds-tokens/build/light-variables.css'
import './src/nebula.css'

export * as config from 'nebula-ds-tokens'
export * from './src/components/button/Button'
export * from './src/components/button/IconButton'
export * from './src/components/icon/Icon'
export * from './src/components/panel/Panel'
export * from './src/components/horizon/Horizon'
export * from './src/components/frameConnector/FrameConnector'
export * from './src/components/framePanel/FramePanel'
export * from './src/components/typography/Typography'
export { useBreakpoint } from './src/hook/useBreakpoint'
```

### 4.1 `Button`

Basic text button built on `buttonVariants` (CVA). Renders a native `<button>` with `type="button"`.

Props (`ButtonProps = ButtonWithTextProps`):

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'filled' \| 'outlined' \| 'standard' \| 'text'` | `'filled'` | Visual style |
| `size` | `'S' \| 'M' \| 'L'` | `'M'` | Size scale |
| `rounded` | `'Default' \| 'R' \| 'L' \| 'RTop' \| 'RBottom' \| 'LTop' \| 'LBottom'` | `'Default'` | Corner shape (LCARS style — one corner can be fully rounded) |
| `leftIcon` | `ReactNode` | — | Rendered left of the label, wrapped in `<Icon>` |
| `rightIcon` | `ReactNode` | — | Rendered right of the label, wrapped in `<Icon>` |
| `text` | `string` | — | Label text |
| `children` | `ReactNode` | — | Alternative to `text` |
| `...rest` | `ComponentPropsWithRef<'button'>` | — | Native button props (`onClick`, `disabled`, `className`, …) |

Renders children in order: `leftIcon` → `text` → `children` → `rightIcon`.

### 4.2 `IconButton`

Square/round icon-only button. Extends `Button`'s variants and adds a size-specific min-width/height plus an absolutely-centered icon wrapper.

Props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` | **required** | Icon content |
| `iconClasses` | `string` | — | Extra classes for the icon wrapper (currently unused in impl) |
| `size` | `'S' \| 'M' \| 'L'` | `'M'` | Also drives the icon size |
| `variant` / `rounded` | as `Button` | — | Reuses `buttonVariants` |
| `...rest` | `ComponentPropsWithRef<'button'>` | — | Native props |

### 4.3 `Icon`

Tiny wrapper `<div>` that sizes its child icon. Note: **not exported with the `.tsx` extension in `index.ts`** (exported as `Icon`).

Props:

| Prop | Type | Default |
| --- | --- | --- |
| `size` | `'S' \| 'M' \| 'L'` | `'M'` |
| `children` | `ReactNode` | — |
| `...rest` | `ComponentPropsWithRef<'div'>` | — |

Sizes map to Tailwind classes: S → `w-5 h-5`, M → `w-6 h-6`, L → `w-7 h-7`.

### 4.4 `Paper` (exported as `Panel.tsx` / component file)

A card/panel container. **The component is internally named `Paper`** and there is a `//todo: rename to Panel` comment. Both the export name and the file are `Panel`.

Props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `round` | `'no' \| 'xs' \| 'lg'` | `'no'` | Bottom-left corner radius |
| `outline` | `'50' \| '200' \| '500' \| '700'` | `'500'` | Border color / shadow strength |
| `renderTitle` | `ReactNode` | — | Title block rendered above the panel body |
| `renderActions` | `ReactNode` | — | Action block rendered below `children` inside the panel |
| `panelClassName` | `string` | — | Classes for the inner panel div |
| `className` | `string` | — | Classes for the outer wrapper div |
| `onClick` | handler | — | Wrapped with `event.stopPropagation()` |
| `...rest` | `ComponentPropsWithRef<'div'>` | — | Native div props |

Structure: outer `<div>` → optional title → inner `<div>` (panel styles) → `children` + `renderActions`.

### 4.5 `Text` (Typography)

Polymorphic typography component exported as `Text`. Renders any of `Tags` using `React.createElement`.

Props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'display1' \| 'display2' \| 'header1'…'header6' \| 'body1'…'body5' \| 'button' \| 'caption'` | — | Applies the matching CSS class (see §7.3) |
| `component` | `'p' \| 'span' \| 'h1'…'h6' \| 'label'` | `'p'` | Rendered HTML tag |
| `text` | `string` | — | Shorthand content (falls back to `children`) |
| `children` | `ReactNode` | — | Content |
| `...rest` | `ComponentPropsWithRef<T>` | — | Native props of the chosen tag |

### 4.6 `Horizon`

Pure decorative SVG component that renders a set of horizontal lines whose thickness and spacing decay/grow per line — evokes a receding "horizon" (used on the demo landing pages).

Props (all optional):

| Prop | Type | Default |
| --- | --- | --- |
| `color` | `string` | `'#000'` |
| `numLines` | `number` | `15` |
| `lineThickness` | `number` | `13` |
| `distance` | `number` | `15` |
| `distanceGrowthFactor` | `number` | `1.2` |
| `thicknessDecayFactor` | `number` | `0.9` |
| `className` | `string` | — |
| `height` / `width` | `number` | computed from path bounding box |
| `inverse` | `boolean` | `false` (lines start at top vs bottom) |

It auto-measures the SVG and re-fits on resize and on prop changes.

### 4.7 `FrameConnector`

The signature LCARS-style element: two curved "node" SVGs joined by a straight bridge. Sizes `S` / `M` / `L` map to three hand-drawn SVG paths.

Props:

| Prop | Type | Description |
| --- | --- | --- |
| `size` | `'S' \| 'M' \| 'L'` | Default `'M'`; applies to bridge and to nodes not overridden |
| `vertical` | `boolean` | Render bridge vertically |
| `divider` | `boolean` | Hide both nodes (bridge only) |
| `className` | `string` | — |
| `bridge` | `{ size?, className? }` | Bridge overrides |
| `firstNode` / `secondNode` | `{ fill?, className?, size?, hidden? }` | Node overrides; `fill` defaults to `nbFrameBackgroundPrimary` |

Also exports the standalone `FrameConnectorNode` component (the SVG node shape alone).

### 4.8 `FramePanel`

High-level layout component that assembles a full "LCARS page frame": a header row with connectors + optional header actions, a body with optional side actions + vertical connector, and a footer with connector + footer actions. Reacts to breakpoints (desktop vs mobile) and can be mirrored with `inverse`.

Props:

| Prop | Type | Description |
| --- | --- | --- |
| `title` | `string` | Rendered as `header1` heading (mutually exclusive with `renderTitle`) |
| `renderTitle` | `ReactNode` | Custom title (mutually exclusive with `title`) |
| `renderHeader` | `ReactNode` | Actions on the header row (opposite side from title) |
| `renderSideHeader` | `ReactNode` | Extra header-side element |
| `renderFooter` | `ReactNode` | Actions in the footer |
| `renderSide` | `ReactNode` | Side action stack (hidden on mobile → moved into the top area) |
| `inverse` | `boolean` | Mirrors the whole frame layout |
| `className` / `headerClassName` / `footerClassName` / `verticalFrameConnectorContainerClassName` / `bodyContainerClassName` / `sideClassName` | `string` | Layout class overrides |
| `children` | `ReactNode` | Main body content |

Internal responsive heuristics (dimension thresholds that toggle connector node visibility) differ between desktop and mobile and are keyed off `useBreakpoint` + `useElementDimensions`.

### 4.9 Hooks

- **`useBreakpoint`** (public) — returns `{ current, isDesktop, isMobile, isTablet }`. Breakpoints: `xs <640`, `sm 640–767`, `md 768–1023`, `lg 1024–1279`, `xl 1280–1535`, `2xl ≥1536`. **Note:** `isDesktop`/`isMobile` currently check for breakpoint names (`xxl`, `xxxl`, `xxs`) that are never produced by `getCurrentBreakpoints()` — effectively `isDesktop === (lg | xl)`, `isMobile === (xs | sm)`, and `2xl` matches neither. (`isDesktop` does not include `2xl`.)
- **`useElementDimensions`** (internal) — measures a `ref`-attached element's `getBoundingClientRect()`; refreshes on `resize` and `scroll` (capture). Returns `{ dimensions, ref, refresh }`.
- **`useEventListener`** (internal) — attaches a `window` event listener, runs it once on mount, and cleans up on unmount.

---

## 5. Design Tokens (`nebula-ds-tokens`)

All visual values come from the companion package **`nebula-ds-tokens` `0.2.0`** (separate repo: https://github.com/mattyx96/nebula-ds-tokens). It is a Style Dictionary / Tokens Studio-based pipeline (MVP v0.1.0) that builds:

- **CSS variables** — `build/light-variables.css`, `build/dark-variables.css` (imported by `index.ts` / `main.tsx`)
- **JSON** — `build/light-tokens.json`
- **JS/TS modules** compiled with tsup (`dist/`):
  ```ts
  export * as lightJsTokens from './build/light-variables.js';
  export * as darkJsTokens from './build/dark-variables.js';
  export * as utilities from './scripts/fns.js';
  export * as tw from './scripts/generateTailwindTheme.js';
  ```

### How this library consumes it

- `src/styles/tokens/primitives.css` — theme-invariant tokens (palette, spacing, sizing, fonts, radii) on `:root`.
- `src/styles/themes/light.css` — semantic tokens under `:root, :where([data-nb-theme="light"])` (light is the no-provider default).
- `src/styles/themes/dark.css` — semantic tokens under `:where([data-nb-theme="dark"]), :root[data-nb-theme="dark"]`.
- These files are **generated by `pnpm generate-themes`** (`.scripts/generate-themes.mjs`), which diffs the upstream `light-variables.css` / `dark-variables.css`, partitions identical vars into primitives and differing vars into per-theme semantic blocks, and emits `src/styles/tokens/manifest.json` + the CSS files. The upstream token files remain the source of truth.
- `tailwind.config.mjs` spreads `tw.generateTailwindCompatibleTheme()` into `theme.extend`, turning token values into Tailwind utility names (e.g. `bg-background-primary`, `ring-button-background-primary`, `font-orbitron`).
- Components reference token-driven utilities directly in CVA strings (e.g. `bg-button-background-primary`, `px-button-spacing-md-h-default`, `rounded-button-border-radius-md-lg-default`).
- `src/variants/typography/index.css` maps typography variants to token fonts: `font: var(--nb-display1)`, `var(--nb-header3)`, `var(--nb-body2)`, etc.
- `.storybook/theme.ts` and `FrameConnector` read raw JS tokens via `lightJsTokens.nb*` keys.

`tw.generateTailwindCompatibleTheme()` produces these Tailwind theme keys from `light-tokens.json`: `colors`, `spacing` (sizing + spacing), `fontFamily`, `fontWeight`, `lineHeight`, `fontSize`, `letterSpacing`, `borderWidth`, `ringWidth` (= borderWidth), `borderRadius`, `opacity`, `width`, `height`.

---

## 6. Styling System

1. **Tokens → CSS variables.** Split by theme: primitives on `:root`, semantic tokens scoped under `[data-nb-theme="…"]` (see §5). Two themes ship: light (default) and dark. Setting `data-nb-theme` on a wrapper switches every descendant.
2. **Tokens → Tailwind theme** (via `tw.generateTailwindCompatibleTheme()` in `tailwind.config.mjs`). Note that Tailwind 3 + this config relies on the token class names actually being present in the compiled CSS, which is guaranteed by Tailwind's content scanner (`./index.html`, `./src/**/*.{js,ts,jsx,tsx}`).
3. **CVA variants** per component under `src/variants/<component>/`, producing class strings composed of token-driven utilities.
4. **Hand-written CSS** for things utilities can't express:
   - `src/variants/typography/index.css` — font shorthand + fluid `clamp()` sizing per typography variant.
   - `src/variants/button/button.css` — `translate-*` compensation classes for icon centering on rounded corners.
5. **Class composition** via `clsxMerge()` in `src/common/utils/classNameUtils.ts`.

### 7. (Known) — see next section

---

## 7. Class Merging & `clsxMerge`

`clsxMerge` is the central class-composition helper used by every component. Currently it is a thin `clsx` wrapper — **`tailwind-merge` is intentionally disabled**:

```ts
export const clsxMerge = (...classes: ClassValue[]): string =>
  // twMerge(
  clsx(...classes);
// );
```

A prepared-but-unused `tailwindMergeConfig.ts` exists that extends tailwind-merge with the token-generated theme and a custom `font-size` group (`font-orbitron`, `font-orbitron-3`). Enabling it is on the roadmap (§10). Caution: it currently contains a `window.console.log` at module top level, which is a `no-console` lint violation and would break SSR/Node contexts if imported — it needs cleanup before being wired in.

---

## 8. Build & Packaging

### Build pipeline

`pnpm run build` runs:

1. `tsc` — type-checks and emits declarations to `dist/types` (`emitDeclarationOnly`, `declarationDir: ./dist/types`).
2. `pnpm build-tailwind` — `NODE_ENV=production` Tailwind CLI compiles `src/index.css` → `src/nebula.css` (minified, via postcss + cssnano).
3. `vite build` — bundles library:
   - Entry: `index.ts` (imports token CSS + `./src/nebula.css`).
   - Formats: `es` (`index.es.js`), `cjs`, `umd` (`index.umd.js`). Name: `nebula-ds-react-library`.
   - Externals: `react`, `react-dom`, `react/jsx-runtime`.
   - `vite-plugin-dts` generates `dist/types` (excludes tests/stories), `insertTypesEntry: true`.
   - CSS extracted to `dist/style.css`, sourcemaps on, `copyPublicDir: false`, `emptyOutDir: true`.
4. `rm src/nebula.css` — deletes the generated source CSS after bundling (it lives only to be inlined into the package CSS).

### Published package (from `package.json`)

- `main`: `dist/index.umd.js` · `module`: `dist/index.es.js` · `types`: `./dist/types/index.d.ts`
- `exports`: `.` (import/require/types), `./package.json`, `./style` → `./dist/style.css`
- `files`: `["/dist"]`
- `publishConfig.access: "public"`

Consumers import styling via `import 'nebula-ds-react-library/style';` (documented in the Developer getting-started MDX) or rely on the CSS pulled in through `index.ts`.

### tsconfig notes

- `allowImportingTsExtensions: true` — components import each other with explicit `.tsx`/`.ts` extensions (works because `isolatedModules` + `moduleResolution: bundler`; the exports in `index.ts` are inconsistent, some with extension, some without).
- `include` references a **non-existent `theme.ts`** (dead entry).

---

## 9. Development Workflow

### Scripts (`package.json`)

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Vite dev server (port 3000) — runs the internal demo app (`src/App.tsx`). |
| `pnpm test` | Vitest (watch). |
| `pnpm run build` | Full library build (tsc → tailwind → vite → cleanup). |
| `pnpm run lint` | ESLint over `src` with `--report-unused-disable-directives --max-warnings 0`. |
| `pnpm run lint-fix` | ESLint autofix. |
| `pnpm storybook` | Builds the library first, then starts Storybook dev on 6006. |
| `pnpm build-storybook` | Builds library, then `storybook build` → `storybook-static/`. |
| `pnpm run release` | `.scripts/release.sh`: patch-bump version (no git tag), build, `npm publish --access public`, commit `new release vX.Y.Z`, push `origin main`. |
| `prepare` | `husky install` (pre-commit hook runs lint). |

### Tests

- **Framework**: Vitest, jsdom environment, globals enabled.
- **Setup** (`setupTests.ts`): jest-dom matchers, type augmentation, and a **global `vi.mock` of `useBreakpoint`**.
- **Pattern**: one `*.test.tsx` per component next to snapshots; tests iterate over the exported variant arrays (`buttonVariantVariants`, `buttonSizeVariants`, `buttonRoundedVariants`, …) and snapshot each combination.

### Storybook

- Config: `stories: '../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'`.
- Addons: onboarding, links, essentials, chromatic, interactions.
- Custom theme in `.storybook/theme.ts` (Orbitron/Roboto Mono, Nebula colors, brand image).
- `preview.tsx` imports `../dist/style.css` — so Storybook requires the library to be built first (hence the `build` in the storybook scripts).
- `preview-head.html` enforces Nebula typography/color on docs paragraphs/headings.

### Linting

Flat config (`eslint.config.js`): `@eslint/js` recommended + `typescript-eslint` recommended + React recommended (via `fixupConfigRules`) + prettier plugin + react-refresh. Custom rules: `react-refresh/only-export-components` (warn), `react/react-in-jsx-scope: off`, `no-console: error`. Note: large parts of the config (airbnb presets, `@typescript-eslint/parser`, react-hooks recommended) are present but commented out.

### Demo app pages (`src/pages/`)

Internal showcase pages, switched from `src/App.tsx`: `Buttons`, `Panels`, `Typography`, `Tokens` (reused inside the Tokens MDX story), `FrameConnectorPage`, `HorizonPage`, `FramePanelPage`, `FramePanelFullPage`.

---

## 10. Deployment

`vercel.json` deploys the **Storybook** instance:

- `buildCommand`: `npm run build-storybook`
- `devCommand`: `npm run storybook`
- `installCommand`: `npm install`
- `outputDirectory`: `./storybook-static`
- `framework: null`

Live at https://nebula-ds-react-library.irongalaxy.space

Note the mismatch: scripts use `pnpm`, but Vercel's `installCommand` uses `npm install` (it will use the repo's `package-lock.json` if present, otherwise resolves versions loosely).

---

## 11. Roadmap (from README)

- [x] document tokens
- [x] document typography
- [x] improve typography (adding ad-hoc component)
- [x] theming infrastructure (light/dark CSS scaffolding)
- [ ] improve customization:
  - [ ] add twMerge (and configure it properly)
- [ ] add dark theme + theme provider
- [ ] …

Note: dark is now implemented at the CSS level (semantic tokens under `[data-nb-theme="dark"]`); what remains is the React `<ThemeProvider>` (REWORK-003).

---

## 12. Known Inconsistencies & Quirks (discovered during exploration)

> The README roadmap and TODOs in code were requested to stay out of this doc, but the following are factual observations about the *current* state that are useful for anyone working on the repo.

- `index.ts` exports `Icon`, `Paper`, `Text`, `FrameConnector`, `FramePanel`, `Horizon` with `.tsx` extensions, but `Button`, `IconButton`, and the `useBreakpoint` hook without — inconsistent import style.
- `FramePanel`'s stories live in `__docs___` (three underscores) instead of `__docs__`.
- `Panel.tsx` exports a component named `Paper` with a TODO to rename.
- `useBreakpoint.isDesktop`/`isMobile` reference breakpoint names (`xxl`, `xxxl`, `xxs`) that `getCurrentBreakpoints()` never returns; `2xl` is treated as neither desktop nor mobile.
- `tailwindMergeConfig.ts` logs to the console at import time (violates the `no-console` lint rule) and uses `window` at module scope, making it non-portable.
- `tsconfig.json` includes a `theme.ts` file that does not exist.
- `.storybook/manager.js` exists but its purpose/usage was not confirmed.
- `vercel.json` uses `npm install` while all local tooling uses pnpm.
