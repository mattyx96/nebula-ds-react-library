# Examples

Copyable compositions. Each folder is a self-contained file plus a README
with the patterns it demonstrates. In a consuming app, import everything
from `'nebula-ds-react-library'` (these files import the repo barrel
`../../index` instead, since they live inside the library repo).

- [App shell](app-shell/) — **the FramePanel recipe**: a complete page in
  the LCARS frame (header actions, side stack, footer with one primary,
  theme toggle, flash + toast feedback). Run `pnpm dev` → page "AppShell",
  or Storybook → Components → FramePanel → *AppShellComposition*.

Form-level compositions (login, sign-up, settings, confirm-delete, filter
toolbar) live in [`src/recipes/__docs__/`](../src/recipes/__docs__/) and are
rendered under the Storybook **Recipes** section. The app shell is the page
frame they sit inside.

Adding an example: create `examples/<name>/<Name>Example.tsx` + `README.md`,
register a page in `src/App.tsx`, optionally a story, then run
`pnpm generate-llms` to index it.
