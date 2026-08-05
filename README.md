# nebula-ds-react-library

React implementation of Nebula Design System 

Storybook: https://nebula-ds-react-library.irongalaxy.space

Tokens repository: https://github.com/mattyx96/nebula-ds-tokens

### Theming

The library ships two themes, **light** (default) and **dark**, backed by CSS custom properties (`--nb-*`) from `nebula-ds-tokens`.

- **Primitives** (palette, spacing, fonts, radii) are theme-invariant and declared on `:root` in `src/styles/tokens/primitives.css`.
- **Semantic tokens** (backgrounds, paper, frame, button text/borders, inputs, …) are scoped under `[data-nb-theme="light"]` / `[data-nb-theme="dark"]` in `src/styles/themes/*.css`.
- Light is the no-provider default (values also declared on `:root`). To switch themes, set the attribute on an element — everything below it switches:

```html
<div data-nb-theme="dark">
  <!-- all Nebula components inside render in dark theme -->
</div>
```

A React `<ThemeProvider>` that manages this attribute is on the roadmap. Generated token files (light/dark variables) remain the source of truth; the split files are regenerated with `pnpm generate-themes`.

### Roadmap:
- [X] document tokens
- [X] document typography
- [X] improve typography (adding ad-hoc component)
- [X] theming infrastructure (light/dark CSS scaffolding)
- [ ] improve customization:
  - [ ] add twMerge (and configure it properly)
- [ ] add dark theme + theme provider
- ...
