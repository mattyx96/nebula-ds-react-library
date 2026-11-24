/**
 * Generates public/llms.txt — the machine-readable index served at the
 * Storybook host root. Plain text on purpose: an agent that can fetch one
 * URL gets the whole map of the design system.
 *
 * Run: pnpm generate-llms (or node .scripts/generate-llms.mjs)
 *
 * Every source path below is verified against the filesystem at generation
 * time, so a renamed component fails the build instead of shipping a dead
 * link. Keep the tables in sync with the repo (see AGENTS.md "Docs
 * ownership").
 */

import {writeFileSync, existsSync, mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public');
const OUT = join(OUT_DIR, 'llms.txt');

const REPO = 'https://github.com/mattyx96/nebula-ds-react-library';
const SB = 'https://nebula-ds-react-library.irongalaxy.space';
const RAW = 'https://raw.githubusercontent.com/mattyx96/nebula-ds-react-library/main';

/** [name, group, source path, one-line description, storybook docs id] */
const COMPONENTS = [
  ['Button', 'actions', 'src/components/button/Button.tsx', 'Action button; variant roles: filled=primary (one per view), standard=secondary, outlined=tertiary, text=inline.', 'components-button--docs'],
  ['IconButton', 'actions', 'src/components/button/IconButton.tsx', 'Icon-only button; requires icon + aria-label.', 'components-iconbutton--docs'],
  ['Icon', 'actions', 'src/components/icon/Icon.tsx', 'Icon sizing wrapper (S/M/L).', null],
  ['Text', 'typography', 'src/components/typography/Typography.tsx', 'Typography: Orbitron display/header roles, Roboto Mono body roles; component tag and visual variant are independent.', 'foundations-typography--docs'],
  ['Input', 'forms', 'src/components/input/Input.tsx', 'Labeled field with helperText and errors list.', 'components-input--docs'],
  ['Select', 'forms', 'src/components/select/Select.tsx', 'Listbox; value is string[] even single-select; multiple supported.', 'components-select--docs'],
  ['Checkbox', 'forms', 'src/components/checkbox/Checkbox.tsx', 'Checkbox incl. "indeterminate"; form participation via name/value.', 'components-checkbox--docs'],
  ['RadioGroup', 'forms', 'src/components/radioGroup/RadioGroup.tsx', 'Single-choice group from items array.', 'components-radiogroup--docs'],
  ['Menu', 'overlays', 'src/components/menu/Menu.tsx', 'Dropdown that becomes a bottom sheet on mobile (mode="auto"); items with icons/separators/disabled.', 'components-menu--docs'],
  ['Sheet', 'overlays', 'src/components/sheet/Sheet.tsx', 'Standalone bottom drawer with the Menu items API.', 'components-sheet--docs'],
  ['Dialog', 'overlays', 'src/components/dialog/Dialog.tsx', 'Modal dialog; role="alertdialog" for destructive confirms.', 'components-dialog--docs'],
  ['ToastProvider / Toaster / useToast / createToastStore', 'feedback', 'src/components/toast/Toast.tsx', 'Toasts via useToast(): .create/.success/.error/.warning/.info/.loading; provider or module-level store.', 'components-toast--docs'],
  ['FlashProvider / useFlash', 'feedback', 'src/components/flash/FlashProvider.tsx', "Whole-UI blink: flash('error'|'success', {repeats, duration}).", 'components-flash--docs'],
  ['FramePanel', 'layout', 'src/components/framePanel/FramePanel.tsx', 'LCARS page frame; title XOR renderTitle; renderHeader/renderSide/renderFooter slots; inverse mirrors; connectors auto-collapse.', 'components-framepanel--docs'],
  ['Panel (alias Paper)', 'layout', 'src/components/panel/Panel.tsx', 'Card: renderTitle above, children, renderActions below; outline 50/200/500/700, round no/xs/lg.', 'components-panel--docs'],
  ['FrameConnector / FrameConnectorNode', 'layout', 'src/components/frameConnector/FrameConnector.tsx', 'Structural node+bridge element; divider, vertical, per-node hidden/fill.', 'components-frameconnector--docs'],
  ['Horizon', 'layout', 'src/components/horizon/Horizon.tsx', 'Decorative decaying line band, theme-aware default color; aria-hidden it.', 'components-horizon--docs'],
  ['ThemeProvider / useTheme / themes', 'theme', 'src/components/themeProvider/ThemeProvider.tsx', 'Scopes data-nb-theme to a subtree; nested providers theme only their subtree.', 'components-themeprovider--docs'],
  ['useBreakpoint', 'hooks', 'src/hook/useBreakpoint.ts', 'Responsive breakpoint state {current, isDesktop, isMobile, isTablet}.', null],
];

/** [title, path, description] */
const DOCS = [
  ['Consumer contract (README)', 'README.md', 'Install (fonts + style import + providers), component map, quick usage, theming, release workflow.'],
  ['Design language', 'docs/DESIGN_LANGUAGE.md', 'CANONICAL visual authority: variant roles, LCARS corner vocabulary, hard rules (no literal colors/sizes), do/don\u0027t examples.'],
  ['Palette', 'docs/PALETTE.md', 'Color roles, semantic tokens light/dark side by side, contrast constraints.'],
  ['Maintainer rules (AGENTS.md)', 'AGENTS.md', 'Rules for agents editing the repo: frozen variant names, zag pin, generated files, docs ownership.'],
  ['App shell example', 'examples/app-shell/README.md', 'THE FramePanel recipe: complete page in the frame with a slot map.'],
  ['Examples index', 'examples/README.md', 'Copyable compositions.'],
  ['Consumer skill', 'skills/nebula-ds/SKILL.md', 'Installable agent skill: workflow, consumer rules, load-by-task routing to references/.'],
  ['Skill: design language', 'skills/nebula-ds/references/design-language.md', 'Consumer view of the visual system.'],
  ['Skill: composition', 'skills/nebula-ds/references/composition.md', 'Providers, page/frame/form patterns, feedback wiring, responsive actions.'],
  ['Skill: theming', 'skills/nebula-ds/references/theming.md', 'Setup order, theme switching, reading token values in JS.'],
  ['Skill: accessibility', 'skills/nebula-ds/references/accessibility.md', 'Names, focus, keyboard, form errors, contrast.'],
  ['Skill: component index', 'skills/nebula-ds/references/components/index.md', 'Routes every export to its family reference; choosing-between table.'],
  ['Cold-start scenarios', 'skills/NEBULA_SCENARIOS.md', 'Prompts + rubric to verify an agent can build on-system UI from the skill alone.'],
  ['Agent-usability plan', 'rework/REWORK-006-agent-usability.md', 'The plan behind this documentation layer.'],
];

// --- verify every referenced path exists -------------------------------
const missing = [];
for (const [, , path] of COMPONENTS) {
  if (!existsSync(join(ROOT, path))) missing.push(path);
}
for (const [, path] of DOCS) {
  if (!existsSync(join(ROOT, path))) missing.push(path);
}
if (missing.length > 0) {
  console.error('llms.txt generation failed — paths no longer exist:');
  for (const path of missing) console.error(`  - ${path}`);
  process.exit(1);
}

// --- emit --------------------------------------------------------------
const lines = [];
lines.push('# Nebula Design System');
lines.push('');
lines.push('> Retro-futuristic React 19 component library (LCARS-inspired, Orbitron + Roboto Mono, token-driven). npm: nebula-ds-react-library. Import the stylesheet once: `import \'nebula-ds-react-library/style\'`. Load Orbitron + Roboto Mono fonts. Wrap in ThemeProvider > FlashProvider > ToastProvider. Never use literal colors — everything is var(--nb-*).');
lines.push('');
lines.push('Storybook (rendered evidence): ' + SB);
lines.push('npm package: https://www.npmjs.com/package/nebula-ds-react-library');
lines.push('');

lines.push('## Docs');
for (const [title, path, description] of DOCS) {
  lines.push(`- [${title}](${RAW}/${path}): ${description}`);
}
lines.push('');

lines.push('## Components');
lines.push('API detail: the source file (linked) carries JSDoc on every prop; Storybook renders each at the docs path. Variants: size S/M/L; rounded Default/R/L/RTop/RBottom/LTop/LBottom; one filled primary per view.');
const byGroup = new Map();
for (const entry of COMPONENTS) {
  const group = entry[1];
  if (!byGroup.has(group)) byGroup.set(group, []);
  byGroup.get(group).push(entry);
}
for (const [group, entries] of byGroup) {
  lines.push('');
  lines.push(`### ${group}`);
  for (const [name, , path, description, docsId] of entries) {
    const storybook = docsId ? ` Storybook: ${SB}/?path=/docs/${docsId}.` : '';
    lines.push(`- [${name}](${RAW}/${path}): ${description}${storybook}`);
  }
}
lines.push('');

lines.push('## Rules agents break most often');
lines.push('1. One `filled` Button per view/panel; the rest standard/outlined/text.');
lines.push('2. `FramePanel` title XOR renderTitle — exactly one, never both, never neither.');
lines.push('3. `Menu` switches to a bottom sheet on mobile by itself (mode="auto") — do not hand-roll a useBreakpoint switch.');
lines.push('4. Feedback = flash() AND toast together on submit results.');
lines.push('5. No literal colors/fonts/sizes/spacings/radii — var(--nb-*) tokens or Text variants only.');
lines.push('');

mkdirSync(OUT_DIR, {recursive: true});
writeFileSync(OUT, `${lines.join('\n')}\n`, 'utf8');
console.log(`public/llms.txt written (${lines.length} lines, ${COMPONENTS.length} components, ${DOCS.length} docs).`);
