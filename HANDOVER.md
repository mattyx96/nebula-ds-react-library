# Session Handover — nebula-ds-react-library

> Written for a follow-up agent/session. Branch: `feat/agent-usability`
> (from `main` @ `b61b535`, v0.2.0). **Read `AGENTS.md` and
> `rework/REWORK-006-agent-usability.md` before working here.**

## Current state

This branch executes REWORK-006 (agent-usability). Landed so far, verified
with `tsc --noEmit`, ESLint (`--max-warnings 0`) and the Vitest suite:

1. **Text-first docs layer** (why: the live Storybook is a JS SPA — a raw
   fetch returns an empty shell, so agents got nothing):
   - `docs/DESIGN_LANGUAGE.md` + `docs/PALETTE.md` — canonical visual
     authority (variant roles in prose, corner vocabulary, tokens-only
     rules, contrast constraints).
   - `README.md` — full consumer contract (fonts, style import, provider
     order, grouped export map, feedback wiring).
   - `AGENTS.md` — maintainer rules (frozen variant names per owner
     decision, `@zag-js` 1.43.0 pin, `restoreNativeFocus`, generated files).
   - `skills/nebula-ds/**` — installable consumer skill (progressive
     disclosure, load-by-task routing). Registered on this host at
     `~/skills-lab/skills/engineering/nebula-ds/` and **shipped in the npm
     tarball** (`files: ["/dist", "/skills", "/docs"]`).
   - `public/llms.txt` + `.scripts/generate-llms.mjs` (`pnpm generate-llms`)
     — machine index served at the Storybook host root once deployed; the
     generator fails if any referenced path disappears.
2. **API trap fixes**: Button/IconButton no longer leak `size`/`variant`/
   `rounded`/`icon` onto the DOM (snapshots contained
   `icon="[object Object]"`); `Icon` spreads `...rest`; `Paper` renamed to
   `Panel` (alias kept until 1.0); FramePanel's double
   `bodyContainerClassName` fixed; JSDoc on every prop of the previously
   undocumented components; component prose on all 16 story files.
3. **`examples/app-shell`** — the missing FramePanel recipe (full page:
   header actions, side stack, footer with one primary, lifted form state,
   flash+toast). Dev-app page "AppShell" + FramePanel story
   `AppShellComposition`.

## Facts that will bite

- **2 Toast tests fail on `main` already** (`dismisses all toasts`,
  `removes a toast via its close trigger`) — jsdom/animation timing, NOT
  this branch. Reproduced on a clean stash. Don't "fix" them blindly here.
- 222 snapshots were regenerated for the removed DOM attributes — if you
  see snapshot diffs, run `vitest run -u` once, never hand-edit them.
- `Menu` switches to a bottom **sheet by itself** (`mode="auto"`) — don't
  document or write a `useBreakpoint` Menu/Sheet switch; that was a wrong
  claim caught during this work and corrected in the story + skill.
- The custom label slot is `labelContent` on Input/Checkbox/RadioGroup —
  not `renderLabel`.
- Verification on this Pi: `./node_modules/.bin/tsc --noEmit`, `.../eslint
  src examples -c eslint.config.js --max-warnings 0`, `CI=1
  ./node_modules/.bin/vitest run` (node_modules installed; Node 22 works
  for checks, 24 is the contract).

## Next actions for a new agent

1. Pending from REWORK-006: inert-controls story sweep (stories that accept
   args their `render` ignores), `examples/dashboard` + `examples/form-page`,
   `@storybook/addon-a11y`, first measured run of
   `skills/NEBULA_SCENARIOS.md`, add the repo to mcp-dev-bridge `repos`.
2. Landing page (separate repo, https://nebula.irongalaxy.space): add a
   "For AI agents" link to `llms.txt` + the skill path.
3. When a component/example/doc is added: run `pnpm generate-llms` and
   update the owning `skills/nebula-ds/references/**` file in the same
   change (AGENTS.md "Docs ownership").
