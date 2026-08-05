# REWORK-004 — Responsive rework of FramePanel (and FrameConnector)

> **Order:** run **after REWORK-001** (so the rewrite uses the new plain-CSS + theming pattern). Requires modern browser container-query support (Chrome/Edge 105+, Safari 16+, Firefox 110+ — fine for a component library; document the baseline).

## Goal

Replace the brittle, JS-measurement-driven responsiveness of the large components (`FramePanel`, `FrameConnector`) with a declarative **CSS Grid + container queries** approach. Remove the hardcoded pixel-threshold heuristics and fix the broken `useBreakpoint` semantics.

## Current state (`src/components/framePanel/FramePanel.tsx`)

- Uses `useBreakpoint()` to branch the whole DOM into separate desktop / mobile layouts (several nested conditionals, mirrored `inverse` branches).
- Uses `useElementDimensions()` on 3 refs (header/footer/side connector containers) and then hardcoded px thresholds — **differing per breakpoint** — to toggle `FrameConnector` node visibility:
  - header one-node width: desktop `<=140`, else `<=150`
  - footer hidden-node: desktop `<=240`, else `<=103`
  - side hidden-node: desktop `<=200`, else `<=160`
  - header hidden: desktop `<=70`, else `<=50`
- `useBreakpoint` has a bug: `getCurrentBreakpoints()` returns only `xs|sm|md|lg|xl|2xl`, but `isDesktop`/`isMobile` check for `xxl/xxxl/xxs` that never occur; `2xl` is neither desktop nor mobile (see `docs/PROJECT.md` §4.9).

## Target

- **`FramePanel`** becomes a CSS Grid layout driven by plain CSS:
  - Grid rows: `[header] [body] [footer]`; body row = `[side | main]` columns.
  - `inverse` is handled by a `[data-inverse]` attribute (and/or `direction`/grid ordering) in CSS instead of mirrored JSX branches.
  - The `FrameConnector` nodes in header/footer/side slots collapse (full → single node → hidden) via **container queries** on the slot containers, using `:empty` and width thresholds expressed in CSS with token vars — **no JS measurement**.
  - Side actions move above the body on narrow containers via `@container` (instead of the JS branch that renders them in a different place on mobile).
- **`FrameConnector`** — size variants (`S/M/L`) and vertical mode stay; node fill defaults to the semantic `var(--nb-frame-background-primary)` (theme-aware after REWORK-002) instead of `lightJsTokens.nbFrameBackgroundPrimary`.
- **`useBreakpoint`** fixed and retained only for genuine JS-viewport needs (should be near-zero after this rework):
  - align returned breakpoints to `getCurrentBreakpoints()` output: `xs, sm, md, lg, xl, 2xl`;
  - `isDesktop = lg | xl | 2xl`, `isMobile = xs | sm`, `isTablet = md`;
  - keep a `useMediaQuery`-style primitive if a component genuinely needs JS (add only if required).
- Remove `useElementDimensions` usage from `FramePanel` (decide: delete the hook or keep for other consumers — delete if nothing else uses it).

## Steps

1. **Fix `useBreakpoint` first** (`src/hook/useBreakpoint.ts`) — correct the `isDesktop`/`isMobile`/`isTablet` mapping; add tests if none exist (create `src/hook/__test__/useBreakpoint.test.ts` using `matchMedia` mock).
2. **Rewrite `FrameConnector`** (`src/components/frameConnector/FrameConnector.tsx`) + new `FrameConnector.css`:
   - Keep the DOM/props API (`size`, `vertical`, `divider`, `bridge`, `firstNode`/`secondNode`, `className`).
   - Size (bridge thickness + node SVG scale) via CSS classes (`nb-frame-connector--size-m`, etc.).
   - Node `fill` uses `var(--nb-frame-background-primary)` by default; allow `fill` override as today.
3. **Rewrite `FramePanel`** (`src/components/framePanel/FramePanel.tsx`) + new `FramePanel.css`:
   - Single source-of-truth layout in CSS Grid.
   - Set `container-type: inline-size` on the header/footer/side slot containers so inner `FrameConnector` visibility reacts to the **container**, not the viewport.
   - Implement the collapse thresholds from §Current-state as CSS `@container (max-width: …)` rules instead of JS constants.
   - `inverse` via `[data-inverse]`.
   - Remove `useElementDimensions` + the 4 threshold helpers + the breakpoint-dependent JSX branches.
   - Keep the public prop API unchanged (title/renderTitle/renderHeader/renderFooter/renderSide/renderSideHeader/inverse + class overrides) so consumers are unaffected; class overrides map to CSS hooks.
4. **Update pages & stories** (`src/pages/FramePanelPage.tsx`, `src/pages/FramePanelFullPage.tsx`, `src/components/framePanel/__docs___/*.stories.tsx`, `src/components/frameConnector/__docs__/*.stories.tsx`): replace utility strings with the new classes; add stories demonstrating container resize behavior.
5. **Tests** — update `src/components/framePanel/__test__/FramePanel.test.tsx` and `frameConnector` tests; regenerate snapshots. Add a test that the wrapper sets `data-inverse` (pure render) and that no measurement refs are attached (structural).
6. **Update docs** — note the container-query baseline and the new CSS-driven breakpoints in `docs/PROJECT.md` and `README.md`.

## Files touched

- `src/hook/useBreakpoint.ts`, `src/hook/__test__/useBreakpoint.test.ts` (new)
- `src/hook/useElementDimentions.ts` (delete or deprecate)
- `src/components/framePanel/FramePanel.tsx` + `FramePanel.css` (new)
- `src/components/frameConnector/FrameConnector.tsx` + `FrameConnector.css` (new)
- `src/pages/FramePanelPage.tsx`, `src/pages/FramePanelFullPage.tsx`
- `src/components/framePanel/__docs___/**`, `src/components/framePanel/__test__/**` (+ snapshots)
- `src/components/frameConnector/__docs__/**`, `src/components/frameConnector/__test__/**` (+ snapshots)
- `docs/PROJECT.md`, `README.md`

## Acceptance criteria

- `FramePanel` reflows correctly across desktop / tablet / mobile **when its container is resized** (verify in Storybook by resizing the preview iframe; add a Chromatic/Playwright story with several container sizes if CI permits).
- No `useElementDimensions`/pixel-threshold JS in `FramePanel`; no mirrored desktop/mobile JSX branches.
- `useBreakpoint` returns a consistent, documented mapping (`2xl` counts as desktop).
- `inverse` works through `[data-inverse]` with no DOM duplication.
- `pnpm build`, `pnpm test`, `pnpm lint` pass.

## Dependencies

- Blocked by: REWORK-001 (plain-CSS pattern) and REWORK-002 (semantic token vars for frame fill).
- Independent of: REWORK-003 (no interplay).
