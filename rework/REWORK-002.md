# REWORK-002 — Theming infrastructure in CSS

> **Order:** run **first**. Everything else (001 tailwind removal, 003 provider, 004 responsive) depends on the token CSS restructuring done here.

## Goal

Create a CSS scaffolding that supports multiple themes (currently `light` and `dark`, extendable to more) by separating **theme-invariant primitives** from **theme-specific semantic tokens**, and scoping the latter under a theme selector (`[data-nb-theme="…"]`).

## Current state

- `nebula-ds-tokens` (v0.2.0) ships `build/light-variables.css` and `build/dark-variables.css`.
- Both files declare **every** variable on `:root` (mutually exclusive — only one can be loaded globally at a time).
- `index.ts` imports only `nebula-ds-tokens/build/light-variables.css`, so **only light is ever active**; dark is never loaded.
- `.storybook/theme.ts`, `FrameConnector`, `TokensPage` read raw JS tokens (`lightJsTokens.nb*`) — these keep working regardless.

### Finding from diffing light vs dark (`../nebula-ds-tokens/build`)

The **primitive tokens are byte-identical** between the two themes:

- palette colors: `--nb-gray-*`, `--nb-orange-*`, `--nb-red-*`, `--nb-sienna-*`, `--nb-pastel-gray-*`, `--nb-lighter-orange-*`, `--nb-shamrock-green-*`, `--nb-bice-blue-*`, `--nb-timberwolf-*`, `--nb-black`, `--nb-white`
- spacing / sizing: `--nb-0` … `--nb-10`
- typography: `--nb-font-families-*`, `--nb-font-size-*`, `--nb-font-weight-*`, `--nb-line-heights-*`, `--nb-letter-spacing-*`, and the composite `--nb-display*`, `--nb-header*`, `--nb-body*`, `--nb-button`, `--nb-caption`
- borders/radii/opacity primitives: `--nb-border-*`, `--nb-border-radius-*`, `--nb-button-opacity-disabled`, `--nb-input-opacity-disabled`, `--nb-frame-opacity-primary`

The **semantic tokens differ** between themes:

- `--nb-primary-300/500`, `--nb-secondary-300/500`
- `--nb-background-primary`, `--nb-background-contrast-primary-500/200/50`, `--nb-background-accent-200/500`, `--nb-background-secondary-default`, `--nb-background-contrast-secondary`, `--nb-clickable-outline-500`
- `--nb-paper-background-primary`, `--nb-paper-background-pressed`, `--nb-paper-border-*`
- `--nb-frame-background-primary`
- `--nb-input-border-*`, `--nb-input-label-text-color-secondary/placeholder`, `--nb-input-color-focused`, `--nb-input-background-color-focused`
- `--nb-button-background-pressed`, `--nb-button-text-color-primary/secondary/default`, `--nb-button-border-default`, `--nb-button-border-primary-filled-hover`

## Target

Author split CSS files **inside this repo** (generated token files remain the source-of-truth reference):

```
src/styles/
├── tokens/
│   └── primitives.css      # :root — theme-invariant vars (palette, spacing, sizing, fonts, radii…)
└── themes/
    ├── light.css           # [data-nb-theme="light"] — semantic vars
    └── dark.css            # [data-nb-theme="dark"] — semantic vars
```

Design rules:

- Use `:root` for primitives (loaded once, always).
- Use `:where([data-nb-theme="light"])` / `:where([data-nb-theme="dark"])` for semantic tokens → **zero specificity**, so consumers can override with their own `[data-nb-theme]` rules.
- A default fallback: `:root` aliases the light semantic set (so the library works without an explicit provider), e.g. set `data-nb-theme="light"` on `<html>` in `main.tsx` and let `:where([data-nb-theme="light"])` win. If consumers don't set it, they must set it themselves — decide the exact fallback in step 3 and document it.
- Keep a header comment in each generated-in-repo file pointing to the upstream token files so drift can be caught.

## Steps

1. **Diff & partition.** Programmatically diff the two `build/*-variables.css` files and emit a manifest (e.g. `src/styles/tokens/manifest.json`) listing: `primitives` (var name → value), and `themes.{light,dark}` (var name → value). Keep this manifest in the repo so the split is auditable and regenerable.
2. **Author the CSS files** from the manifest:
   - `src/styles/tokens/primitives.css` (all primitives on `:root`).
   - `src/styles/themes/light.css` and `src/styles/themes/dark.css` (semantic vars under `:where([data-nb-theme=…])`).
3. **Wire imports.**
   - `index.ts`: replace `import 'nebula-ds-tokens/build/light-variables.css'` with imports of `primitives.css` + both theme files.
   - `src/main.tsx`: same, and set `data-nb-theme="light"` on `<html>`/`<body>` (demo app).
   - `.storybook/preview.tsx`: wrap stories in a theme-scoped container (see REWORK-003 for the provider; here ensure the CSS imports resolve).
4. **Verify no component regressions.** Components currently reference token vars via Tailwind utilities (`bg-background-primary`, …). After this change, those utilities still resolve because the Tailwind theme is generated from the same tokens — but REWORK-001 will replace the utilities with plain CSS that reads `var(--nb-*)` directly. Until then, confirm the utilities still compile (Tailwind config reads `tw.generateTailwindCompatibleTheme()` which is unaffected).
5. **Document the contract** in this file's sibling section and in `README.md`: variable naming (`--nb-*`), how semantic vars are scoped, and how to add a third theme (add `themes/<name>.css` + register in the manifest + provider registry per REWORK-003).

## Files touched

- `src/styles/tokens/primitives.css` (new)
- `src/styles/tokens/manifest.json` (new)
- `src/styles/themes/light.css`, `src/styles/themes/dark.css` (new)
- `index.ts`
- `src/main.tsx`
- `.storybook/preview.tsx`
- `README.md` (theming section)

## Acceptance criteria

- Flipping `data-nb-theme` between `light` and `dark` on a wrapper element changes semantic colors across all components.
- Primitives (palette, spacing, fonts, radii) remain identical across themes.
- Light and dark themes are both available **simultaneously** in different subtrees.
- `pnpm build` succeeds; `pnpm test` (component tests that render) still passes.
- The generated token files are untouched; a comment in each split file references the upstream source.

## Dependencies

- Blocked by nothing.
- Unblocks: REWORK-001, REWORK-003, REWORK-004.
