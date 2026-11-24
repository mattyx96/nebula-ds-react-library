# Accessibility (consumer view)

Nebula's interactive components ship their ARIA plumbing (Zag-powered):
roles, focus management, keyboard operation, portal behaviour. Your job is
to keep it intact while composing.

## Names

- `IconButton` takes `icon` only — **always pass `aria-label`**; an icon has
  no accessible name by itself.
- `Input`/`Select`/`Checkbox`/`RadioGroup` take `label` (or `labelContent`
  for custom label content) — never leave a field unnamed.
- `Dialog` names itself from `title`; for destructive confirms pass
  `role="alertdialog"` and describe the consequence in `description`.
- Decorative `Horizon` bands: pass `aria-hidden="true"`.
- Heroicons in `Button`'s `leftIcon`/`rightIcon` are decorative — the button
  text is the name.

## Focus

Focus rings are the theme contrast token (`--nb-clickable-outline-500`),
visible in both themes — never remove or restyle them. Focus order follows
DOM order, so slot order in a `FramePanel` is also tab order: header →
body → footer.

## Keyboard

Zag components implement the standard keys (Menu/Select: arrows + Enter +
Escape; Dialog: Escape + focus trap + restoration; Checkbox/RadioGroup:
Space/arrows). Do not intercept these globally. The overlays restore focus
to their trigger on close — don't re-mount triggers inside conditionals
that unmount them mid-interaction.

## Forms

- `Input.isRequired` renders the asterisk; pair it with real validation and
  surface failures through `errors` (Input) or `invalid` + an error line
  (Select/RadioGroup/Checkbox).
- Error tone is the error token, not red-by-hand.
- On a failed submit, flash + toast announce the outcome, but the field
  itself must show what to fix — screen readers land on the field errors,
  not the toast.

## Contrast rules that actually bit

- Never light text on the orange fill — `filled` uses the dark text token.
- In dark mode use the `-300` accent tokens for accent **outlines**;
  `-500` for fills.
- Placeholder text has its own token; don't reuse body text color for it.
