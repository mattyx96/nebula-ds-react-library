# Nebula cold-start scenarios

Evaluation harness for the consumer skill: an agent is given **only**
`skills/nebula-ds/` (plus a React 19 project with the package installed) and
one task prompt. The rubric stays hidden from the agent under test.

Run: `opencode run "<prompt>"` in a scratch project (this repository's
maintainer host can run them via the OpenCode harness; any agent runtime
works). Score against the criteria, then record pass/fail per scenario.

---

## Scenario 1 — Login page in the frame

**Prompt (shown to the agent):**

> Build a login page using nebula-ds-react-library: email and password
> fields with validation, a "remember me" option, and a sign-in button.
> Put it in a full page frame with the page title "Access console".
> The app should support dark mode.

**Evaluator criteria (hidden):**

- [ ] `FramePanel` used with `title="Access console"` — not hand-rolled divs
- [ ] Exactly one `filled` button (Sign in); Cancel/secondary is `standard`
      if present
- [ ] Footer primary takes a `rounded="R*"` corner; `inverse` layout (if
      chosen) mirrors to `L*`
- [ ] `Input` fields with `label` + `errors` surfaced on failed submit;
      `Checkbox` for remember-me
- [ ] `ThemeProvider` + `useTheme` for dark mode
- [ ] Fonts loaded (Orbitron + Roboto Mono) and
      `import 'nebula-ds-react-library/style'` present
- [ ] **Zero literal colors** in the produced app code
- [ ] `tsc` compiles against the installed package

## Scenario 2 — Destructive confirm with feedback

**Prompt:**

> I have a list of crew members. Add a "Remove" action per row that asks for
> confirmation, then removes the member and tells the user what happened.

**Evaluator criteria:**

- [ ] `Dialog` with `role="alertdialog"` (not `window.confirm`), Cancel +
      confirm row in children
- [ ] Confirm is `filled`, Cancel `standard`
- [ ] On confirm: **both** `flash('success')` and `toast.success({...})`
- [ ] `FlashProvider` + `ToastProvider` mounted (in the right order,
      ThemeProvider outermost if present)
- [ ] Row state removed from the list; empty-state handled when all are gone
- [ ] Zero literal colors; typography via `Text`

## Scenario 3 — Menu on a responsive page

**Prompt:**

> Add an "Actions" menu next to the page title with Edit / Duplicate /
> Download / Delete, with icons. It must work on mobile too.

**Evaluator criteria:**

- [ ] `Menu` (not a hand-rolled `useBreakpoint` Menu/Sheet switch — the
      component does it via `mode="auto"`), with `title` for the sheet
- [ ] Items use 16 px heroicons `leftIcon`s; a `separator` between groups
      is a plus, not required
- [ ] `onSelect` actually handles the value
- [ ] `aria-label`/accessible naming handled (Menu's `ariaLabel` or a
      labelled trigger)

## Scoring

A scenario **passes** when every criterion holds and the code compiles.
Record: date, agent, model, scenario, pass/fail, failing criteria verbatim.
Two consecutive full passes after a skill change = the change is good; a
regression means the owning reference file is missing or stale — fix the
reference, don't loosen the rubric.
