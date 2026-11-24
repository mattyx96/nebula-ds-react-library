# Nebula Palette

> Color roles and constraints. Values are illustrative for the current token
> build; the CSS variables themselves are the contract — always reference
> `var(--nb-*)`, never a literal.

## Core palette (theme-invariant primitives)

| Token | Value | Name / role |
| --- | --- | --- |
| `--nb-primary-500` | `#E6873E` | Nebula orange — primary actions, structure, focus |
| `--nb-secondary-500` | `#E35A3D` | Nebula red-orange — pressed/emergency accents |
| `--nb-core-3-300` / `--nb-primary-300` | `#e9bf79` / light-theme `300` | Softer orange (dark-theme primary accents) |
| `--nb-core-4-300` / `--nb-secondary-300` | `#d3846c` | Softer red-orange |
| `--nb-core-error-1` | `#FF6700` | Error text and input error borders |
| `--nb-core-success-1` | `#53ab7b` | Success (flash/toast success tone) |
| `--nb-bice-blue-500` | `#22577A` | Cool accent, reserved (rare) |
| `--nb-shamrock-green-500` | `#28965A` | Green accent, reserved (rare) |
| `--nb-core-1-*` | `#E9E9E1` / `#DEDED3` | Bone neutrals — light surfaces |
| `--nb-core-2-*` | `#575757` / `#3E3E3D` | Graphite neutrals — dark surfaces & light-theme text |
| `--nb-gray-*`, `--nb-timberwolf-*` | see `tokens/primitives.css` | Neutral ramps |

## Semantic tokens (what components actually consume)

These swap per theme; **this is what app code should use.**

| Token | Light | Dark | Used by |
| --- | --- | --- | --- |
| `--nb-background-primary` | `#E9E9E1` | `#3E3E3D` | Page/body background |
| `--nb-background-secondary-default` | `#DEDED3` | `#575757` | Raised surfaces |
| `--nb-background-accent-200` / `-500` | `#d0cac4` / `#b0aea7` | `#898989` / `#575757` | Quiet rings, code chips, dividers |
| `--nb-background-contrast-primary-500` | `#3E3E3D` | `#E9E9E1` | Body text, hover rings, `Horizon` lines |
| `--nb-background-contrast-primary-200` | `#575757` | `#898989` | Muted text |
| `--nb-background-contrast-primary-50` | `#e7e6e1` | `#3E3E3D` | Faintest text |
| `--nb-button-background-primary` | `#E6873E` | `#E6873E` | `filled` button background |
| `--nb-button-background-pressed` | `#d0cac4` | `#898989` | Active/pressed fill |
| `--nb-button-text-color-default` | `#3E3E3D` | `#E9E9E1` | Non-filled button text |
| `--nb-frame-background-primary` | `#DEDED3` | `#575757` | FrameConnector node fill |
| `--nb-paper-background-primary` | `#DEDED3` | `#575757` | Panel surface |
| `--nb-paper-border-*` | per `outline` | per `outline` | Panel borders (`50|200|500|700` strength) |
| `--nb-input-border-default` | `2px solid #b0aea7` | `2px solid #575757` | Resting input ring |
| `--nb-input-label-text-color-placeholder` | `#b0aea7` | `#575757` | Placeholder text |
| `--nb-clickable-outline-500` | `#3E3E3D` | `#E9E9E1` | `:focus-visible` outline |

Theme-invariant interaction tokens worth knowing:
`--nb-input-border-focused` (`2px solid #E6873E`),
`--nb-input-border-error` (`2px solid #FF6700`),
`--nb-button-border-hover-primary-filled` (light `3px solid #3E3E3D`, dark
`3px solid #E9E9E1` — the hover ring **grows** 2 px → 3 px and flips to the
contrast color).

## Contrast constraints

- **Orange on bone** (`#E6873E` on `#E9E9E1`) is fine for fills with dark text
  (`--nb-button-text-color-primary`, near-black) — never put light text on the
  orange fill.
- **Dark-mode accents brighten**: the dark theme swaps `--nb-primary-300` →
  `#E6873E` and `--nb-secondary-300` → `#E35A3D` so accent borders stay
  visible on `#3E3E3D`. Use the `-300` tokens for accent *outlines* in dark
  contexts; use `-500` for fills.
- **Placeholder text** uses the dedicated placeholder token — do not reuse
  `contrast-primary-200`, which is too strong for placeholders in light mode
  and too weak in dark.
- **Focus is always the contrast color**, never orange: Nebula's focus ring is
  `--nb-clickable-outline-500` (dark on light, light on dark), so it never
  competes with the primary fill.

## Flash tones

`flash('error')` tints the whole UI toward `--nb-core-error-1`;
`flash('success')` toward `--nb-core-success-1`. Both are brief (2 blinks ×
100 ms by default) and return the UI to its theme.
