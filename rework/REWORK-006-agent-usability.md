# REWORK-006 — Agent-usability of the design system

> **Order:** Phases 0–2 can start immediately. Phase 3 depends on nothing.
> Phases 4–5 depend on 0–2 existing (the skill cites the design language; the
> mirrors cite the README). Phase 6 runs last and then repeats forever.

## Goal

An agent that has never seen Nebula, given **only text** (README + skill +
raw GitHub files), can in one shot:

1. install and theme correctly (fonts, `nebula-ds-react-library/style`, `ThemeProvider`);
2. pick the right component for a task (button vs menu vs sheet; Paper vs FramePanel);
3. compose a full page — `FramePanel` shell with real header/side/footer actions,
   forms, feedback — that is **on-system**: tokens only, correct variant semantics,
   correct provider order;
4. wire `Flash` + `Toast` feedback and overlays without reading the source.

Today that is impossible: the docs are a JS-rendered showcase with empty prop
tables, invisible code, inert controls, and no text mirror anywhere on the web.

## Current state (verified 2026-11-24)

Access layer:

- `https://nebula.irongalaxy.space/` is a Next.js app that bails out to
  client-side rendering — a raw fetch returns an empty shell (~232 chars after JS).
- The Storybook root and every `?path=/docs/…` route return the manager SPA
  shell; documentation exists only after JS renders an iframe.
- `/index.json` on the Storybook host works (142 entries: 27 docs + 115 stories)
  but contains only `id/title/name/importPath/tags` — **no description on any
  entry**. It is a table of contents, not documentation.
- No `llms.txt`, no per-page markdown, no skill, no AGENTS.md.
- This repo is **not** in mcp-dev-bridge's `repos` (only `orbiter`), so no
  semantic search path exists from this host either.

Content layer:

- 9 of 19 component files have **zero prop JSDoc** — exactly the hard ones:
  `Button`, `IconButton`, `Icon`, `Panel (Paper)`, `FramePanel`,
  `FrameConnector`, `Typography`, `Horizon`, `FlashProvider`.
- 6 of 27 docs pages have component prose (Toast + the 5 recipes).
- 61 of 70 stories use `render: () =>` and ignore `args` → **the Controls panel
  is inert**; `FramePanel.stories.tsx:118-136` even overrides the args it
  accepts.
- Code is only visible behind the client-side "Show code" toggle; recipes are
  rendered but their JSX is not exposed as text anywhere.
- Zero full-page compositions of `FramePanel` exist — stories render demo
  content ("Content Here", "Open"); there is no recipe showing a real page in
  the frame. **Confirmed: FramePanel has no recipes.**

API traps (why agents specifically fail on Button and FramePanel):

- `Button` renders **both** `text` and `children` (order: `leftIcon → text →
  children → rightIcon`); the Getting Started MDX teaches `text=`, the recipes
  teach children. Undocumented `type="button"` default (overridable).
- `IconButton` spreads `{...props}` onto the `<button>` (`IconButton.tsx:35`) so
  `icon`/`iconClasses` become invalid DOM attributes; `className` is applied
  twice. It is the only component that doesn't destructure.
- `Icon` is typed `ComponentPropsWithRef<'div'>` but never spreads `...rest` —
  `aria-hidden`, `style`, `title` silently do nothing.
- `FramePanel` has 15 props, zero JSDoc, a `title | renderTitle` **XOR union**,
  slot position that depends on `inverse` (`renderHeader` before/after title)
  and viewport (`renderSide` relocates to a mobile strip), plus internal px
  thresholds that silently hide connector nodes. `bodyContainerClassName` is
  applied twice (lines 137 + 193).
- Variant vocabulary carries no semantics: `filled/standard/outlined/text` and
  `rounded: 'Default'|'R'|'RTop'…` are never glossed.

## The model to adopt

`sherick-ui` (github.com/Sherick16/sherick-ui) is a component library that
agents can use immediately. Its agent surface is a **stack of plain-text
contracts**, each with a single owner:

| Layer | File | Audience |
| --- | --- | --- |
| Consumer contract | `README.md` (full install/theming/exports/versioning text) | any agent/consumer |
| Package entry | `packages/ui/README.md` (concise, anchors) | consumers |
| Design authority | `docs/DESIGN_LANGUAGE.md` ("never invent a visual rule locally") | everyone |
| Named contracts | `docs/PALETTE.md`, `docs/RELEASE.md`, `docs/VERIFICATION.md` | everyone |
| Maintainer rules | `AGENTS.md` (mandatory reading, frozen architecture, do-not-reintroduce list) | agents editing the repo |
| **Consumer skill** | `skills/sherick-ui/SKILL.md` + `references/{design-language,composition,theming,accessibility}.md` + `references/components/*.md`, with a **load-by-task routing table** and revision-pinned grounding | agents *using* the library |
| Copyable apps | `examples/{sidebar,settings,resources,detail}/` each with README + live preview route | everyone |
| Cold-start tests | `skills/COMPONENT_SCENARIOS.md` | proving agents succeed |

Key principles worth copying verbatim: markdown is the source of truth;
the showcase "demonstrates and never explains"; every rule has one owning
file; progressive disclosure (load only the reference your task needs);
revision-pinned provenance; and an explicit list of things agents must never
do.

## Target

Nebula keeps its identity (LCARS, Orbitron/Roboto Mono, orange primary,
`--nb-*` tokens) and gains the same text-first contract stack. Storybook
remains the interactive/visual evidence and links to the contracts; it stops
being the only documentation.

```
README.md                     consumer contract (rewritten, sherick-style)
AGENTS.md                     maintainer rules for agents editing this repo
docs/DESIGN_LANGUAGE.md       canonical visual authority (LCARS, roles, corners, do/don't)
docs/PALETTE.md               color roles + contrast constraints
docs/VERIFICATION.md          lint/test/build/storybook gates
examples/
  app-shell/                  ★ the missing FramePanel recipe (full page in the frame)
  dashboard/                  FramePanel + Paper grid + Menu/Toasts
  form-page/                  FramePanel wrapping the existing LoginForm recipe
  settings/                   lifted from src/recipes (Select/RadioGroup/Checkbox)
  README.md                   index with live dev-app routes
skills/
  nebula-ds/SKILL.md          installable consumer skill (frontmatter + routing table)
  nebula-ds/references/design-language.md | theming.md | composition.md | accessibility.md
  nebula-ds/references/components/{actions,forms,overlays,frame-layout,feedback}.md
  NEBULA_SCENARIOS.md         cold-start evaluation scenarios
  README.md                   skill packaging + provenance rules
public/llms.txt               generated: index of everything (served at site root)
src/components/**/__docs__/   stories keep rendering examples, now with prose + honest args
```

### Decision: single source of truth

Authored markdown (`docs/`, `skills/`, `examples/`) owns the contracts.
JSDoc in component files owns the prop tables (autodocs picks it up for free).
Storybook owns rendered evidence. `llms.txt` and the npm-tarball skill are
**generated/copied at build**, never hand-maintained twice.

## Phases

### Phase 0 — Name the design language (0.5 d)

Write `docs/DESIGN_LANGUAGE.md` and `docs/PALETTE.md`. This is the
"keep the colors, the style, the guidelines" requirement made explicit:

- LCARS principles: one heavy corner per element, frames as structure,
  orange reserved for primary actions.
- Roles: `filled` = primary action (one per view), `standard` = secondary,
  `outlined` = tertiary/toolbar, `text` = inline/quiet. Stated in prose so a
  text reader no longer has to *see* the buttons.
- Corner vocabulary with ASCII diagrams: `Default`, `R`, `L`, `RTop`,
  `RBottom`, `LTop`, `LBottom` — which corner is fully rounded and when
  (e.g. `rounded="R"` pairs with a panel edge).
- Typography: which `Text` variant for which job; Orbitron = display,
  Roboto Mono = code/numeric.
- Hard rules for agents: **no literal hex/px in app code — always
  `var(--nb-*)` or `lightJsTokens`/`darkJsTokens`**; spacing only from the
  `--nb-N` scale; never restyle a component when a variant exists.
- Do/don't pairs with JSX.

### Phase 1 — Remove the API traps (1 d)

- `Button`: pick `children` as the documented path; keep `text` as a
  documented alias (deprecate at 1.0). Document the `type="button"` default
  and form-submit usage (`type="submit"`), and the "wrap in `<a>` for links"
  rule.
- `IconButton`: destructure like `Button`; remove dead `iconClasses`; never
  spread non-DOM props onto the element.
- `Icon`: spread `...rest`; document `aria-hidden` usage for heroicons.
- `Panel`: finish the `Paper` → `Panel` rename (todo at `Panel.tsx:20`),
  0.x allows the breaking rename; keep `Paper` as a deprecated alias until 1.0.
- `FramePanel`: fix the double `bodyContainerClassName`; keep the API but
  publish the **slot matrix** (prop → default position → `inverse` position →
  mobile behaviour) and the collapse thresholds (140/150, 240/103, 200/160,
  70/50 px) in JSDoc + `examples/app-shell/README.md`.
- Stories: convert to `render: (args)` where the prop is driveable, else set
  `control: false`. No story may accept args it ignores.

### Phase 2 — Fill the documentation content (1 d)

- JSDoc every prop of the 9 undocumented components (Button, IconButton,
  Icon, Panel, FramePanel, FrameConnector, Typography, Horizon, Flash).
  Autodocs then fills its Description column automatically.
- Add `parameters.docs.description.component` (opening sentence + variant
  semantics + one copy-paste snippet) to all 21 story files — today only 6
  have it.
- Document the providers and hooks that autodocs can't (meta points at
  `ToastProvider`, so `useToast`, `Toaster`, `createToastStore`, `useFlash`,
  `useTheme` need explicit MDX/README sections with code).
- Rewrite `README.md` sherick-style: install **including the two Google Font
  links** (they are required and only documented in an MDX today), CSS import,
  theming contract with copy-paste snippets, RTL/none, **export list grouped
  by role**, versioned "what's new", and a "what not to do" section.
- Write root `AGENTS.md` for maintainer agents: pin `@zag-js/*` at 1.43.0,
  `restoreNativeFocus()` is load-bearing (Storybook breaks `focus`), never
  edit `src/styles/themes/*.css` by hand (`pnpm generate-themes`), `!dev` tag
  convention, lint gates, release workflow.

### Phase 3 — Recipes → examples, including the missing FramePanel ones (1 d)

- Lift the 5 recipes from `src/recipes/__docs__/` into `examples/` as real
  source files (stories keep rendering them from there). Each example gets a
  README: what it demonstrates, the imports it needs, the live dev-app route.
- Add the compositions that don't exist:
  1. `examples/app-shell/` — **the FramePanel recipe**: title + `renderHeader`
     (buttons + IconButton), `renderSide` (vertical IconButton stack),
     `renderFooter`, `inverse` mirrored variant, and a note on the responsive
     collapse behaviour.
  2. `examples/dashboard/` — FramePanel page containing a Paper grid with
     Menu, Toast on actions, Horizon decorative band.
  3. `examples/form-page/` — FramePanel wrapping the existing LoginForm
     recipe (frame + form + Flash/Toast provider order).
- Rename titles to intents, not nouns: "App shell", "Form in a frame",
  "Dashboard" — searchable by the problems they solve.

### Phase 4 — The consumer skill (1 d)

`skills/nebula-ds/` following the Agent Skills spec (as sherick-ui does):

- `SKILL.md` frontmatter `name: nebula-ds`, `description:` triggers on
  "building/changing React UI with nebula-ds-react-library".
- Workflow: check the installed package version first; load only the
  reference the task needs; reuse the app's established compositions; run
  type/build checks; report what wasn't verified.
- Consumer rules (the anti-drift core): never literal colors/spacing;
  typography via `Text`; icon slots wrap in `Icon` sizing; provider order
  `ThemeProvider > FlashProvider > ToastProvider`; one `filled` button per
  view; don't touch `nb-*` classes from app code.
- **Load-by-task routing table** (the sherick pattern):
  design-language / composition / theming / accessibility / per-family
  component references — `frame-layout.md` owns FramePanel, FrameConnector,
  Paper, Horizon and the slot matrix.
- `skills/NEBULA_SCENARIOS.md` — cold-start scenarios (see Phase 6).
- Ground at a commit SHA; state the minimum package version per feature.
- Register on this host: copy/symlink into `~/skills-lab/skills/` so every
  future session on the Pi knows Nebula (HANDOVER §8 skills dir).
- Ship the folder in the npm tarball (`files: ["/dist", "/skills", "/docs"]`)
  so any agent with `node_modules` access finds
  `node_modules/nebula-ds-react-library/skills/nebula-ds/SKILL.md`.

### Phase 5 — Machine-readable distribution (0.5 d)

- Build step emits `public/llms.txt` (+ optionally `public/agent-docs/*.md`
  mirrors) from the authored markdown; Vercel serves it at
  `https://nebula.irongalaxy.space/llms.txt` and the Storybook host root.
- Landing page: add a static "For AI agents" section (llms.txt, skill path,
  Storybook link) and stop shipping an empty CSR shell as the only entry —
  either SSR the marketing page or emit a static fallback.
- Add this repo to mcp-dev-bridge `repos` so semantic search works from the
  Pi.

### Phase 6 — Prove it, then keep proving it (0.5 d + recurring)

- Cold-start scenarios (run with `opencode run` on this host, before and
  after):
  1. "Build a login page inside the LCARS frame with a dark theme" — expect
     FramePanel + Input + Checkbox + Button `type="submit"` + providers,
     zero literal colors.
  2. "Add a destructive delete with confirmation and feedback" — expect
     Dialog `alertdialog` + Flash + Toast.
  3. "Add a primary and secondary action to this card" — expect one `filled`
     + one `standard`, correct corners.
- Score: compiles (`tsc`), zero `#[0-9a-f]{6}` literals in produced app code,
  correct provider nesting, component choice matches the index.
- In Storybook: add `@storybook/addon-a11y` and 2–3 `play` functions on the
  new examples; wire `@chromatic-com/storybook` to CI (already a dependency,
  currently inert).

## Files touched

New: `AGENTS.md`, `docs/DESIGN_LANGUAGE.md`, `docs/PALETTE.md`,
`docs/VERIFICATION.md`, `examples/**` (4 examples + README),
`skills/nebula-ds/**`, `skills/NEBULA_SCENARIOS.md`, `skills/README.md`,
`public/llms.txt` (generated).
Rewritten: `README.md`, `HANDOVER.md` (stale: wrong branch, "recipes deleted").
Edited: the 9 undocumented component files (JSDoc; Button/IconButton/Icon/
Panel/FramePanel also behavioural fixes), all 21 story files (prose + honest
args), `package.json` (`files`), `.storybook/main.ts` (a11y addon),
`vite.config.ts`/build script (llms.txt emission), `~/projects/mcp-dev-bridge/config.json`.

## Acceptance criteria

1. `curl https://nebula.irongalaxy.space/llms.txt` → 200, indexing every
   component, example and doc with one-line descriptions.
2. A no-repo-access agent given only README + skill passes ≥2 of 3 cold-start
   scenarios on the first attempt, with zero literal colors in output.
3. Every public export has JSDoc, story prose and a copy-paste snippet;
   autodocs shows no empty Description column; no inert Controls.
4. FramePanel has ≥3 full-page compositions with a slot matrix published.
5. `pnpm lint && pnpm test && pnpm build && pnpm build-storybook` pass;
   a11y addon runs on all stories.
6. The skill is present in `~/skills-lab/skills/` on this host and inside the
   published npm tarball.

## Dependencies

- Independent of REWORK-001..005 (all merged/verified).
- Phase 3's `examples/app-shell` benefits from Phase 1's FramePanel fixes but
  can be built against the current API.
- **Decisions (owner, 2026-11-24):**
  1. **Variant names stay.** No rename, no 1.0 vocabulary break — semantics
     are documented instead (`filled` = the one primary, `standard` =
     secondary, …) in the design language, stories and skill.
  2. **The skill ships** in the npm tarball (`files: ["/dist", "/skills",
     "/docs"]`), so any agent with `node_modules` access finds it.
  3. "storyblok" was a typo for **Storybook** — it stays the rendered
     evidence surface; markdown contracts + `llms.txt` are the agent
     surface. The landing page (a separate repo) keeps its two buttons
     and should link `llms.txt`.

## Status (branch `feat/agent-usability`)

| Phase | State |
| --- | --- |
| 0 — design language + palette | done (`docs/DESIGN_LANGUAGE.md`, `docs/PALETTE.md`) |
| 1 — API traps | done (Button/IconButton DOM-attr leaks, Icon rest spread, Paper→Panel rename + alias, FramePanel double className + slot JSDoc; inert-controls story sweep still pending) |
| 2 — content | done (JSDoc on all previously undocumented components, component prose on all 16 component stories, README contract, root `AGENTS.md`) |
| 3 — examples | `examples/app-shell` (the FramePanel recipe) done; `dashboard` and `form-page` follow-ups |
| 4 — skill | done (`skills/nebula-ds/**`, registered in `~/skills-lab/skills/engineering/` on the maintainer host, shipped in the tarball) |
| 5 — llms.txt | generator + `public/llms.txt` done (served at the Storybook host root once deployed); landing-page link is in the other repo; mcp-dev-bridge registration pending |
| 6 — scenarios | prompts + rubric written (`skills/NEBULA_SCENARIOS.md`); first measured runs pending |

Known pre-existing (not this branch): 2 Toast dismissal tests fail on
`main` under jsdom (animation/`--remove-delay` timing), reproduced on a
clean checkout before any of these changes.
