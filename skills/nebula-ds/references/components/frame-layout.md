# Frame & layout

The structural family. Composition order in a page: `FramePanel` (the page)
→ `Panel` (cards inside) → `FrameConnector`/`Horizon` for extension and
decoration.

## FramePanel — the page frame

```jsx
<FramePanel
  title="Ship status"                    // XOR with renderTitle
  renderHeader={<ThemeToggle/>}
  renderSide={<IconActions/>}
  renderFooter={<SaveBackRow/>}
>
  {content}
</FramePanel>
```

**Title**: exactly one of `title` (string → Orbitron `header1`) or
`renderTitle` (custom node). Passing both is a type error; neither is too.

**Slot map** (default; `inverse` mirrors every position):

| Slot | Default position | With `inverse` | Mobile |
| --- | --- | --- | --- |
| `title`/`renderTitle` | header left | header right | unchanged |
| `renderHeader` | header right (after connector) | header left | unchanged |
| `renderSideHeader` | header left (before title) | header right | unchanged |
| `renderSide` | body left column | body right column | strip above body |
| `renderFooter` | footer right | footer left | unchanged |

Class hooks: `className`, `headerClassName`, `footerClassName`,
`sideClassName`, `bodyContainerClassName` (outer body container),
`verticalFrameConnectorContainerClassName`.

**Connector collapse is intended**: header connector hides under ~70/50 px,
drops to one node under ~140/150 px; footer node hides under ~240/103 px;
side node under ~200/160 px height. Sizes follow `useBreakpoint()`
(M desktop / S below). Do not "fix" collapsed nodes by disabling the
thresholds.

Full page reference: [`examples/app-shell`](../../../../examples/app-shell)
(header actions, side stack, footer with one primary, lifted form state,
flash+toast).

## Panel — the card

```jsx
<Panel outline="500" round="lg"
       renderTitle={<Text component="h6" variant="header6">Crew</Text>}
       renderActions={<Button variant="filled" rounded="R">Save</Button>}>
  <Text component="p" variant="body1">…</Text>
</Panel>
```

- `outline` `50|200|500|700` = border strength; `round` `no|xs|lg` =
  bottom-left corner.
- The inner surface swallows clicks (`stopPropagation`) so the card acts as
  one unit inside a clickable container; pass `onClick` for the card's own
  action.
- Historical name: `Paper` (deprecated alias, still exported).

## FrameConnector — the structural joint

Two curved nodes + a bridge. `FramePanel` renders it internally; use it
directly only to extend a frame's geometry.

```jsx
<FrameConnector size="M" vertical/>
<FrameConnector divider/>                                   {/* bridge only */}
<FrameConnector firstNode={{hidden: true}} secondNode={{fill: 'var(--nb-frame-background-primary)'}}/>
```

Per node: `hidden`, `fill` (defaults to the theme frame token), `size`,
`className`. Bridge: `size`, `className`. Standalone shape:
`FrameConnectorNode`.

## Horizon — decorative band

Lines that decay in thickness/spacing; theme-aware default color; re-fits
on resize. Pure decoration → `aria-hidden="true"`. `inverse` draws bottom-up.
Tune with `numLines`, `lineThickness`, `distance`, `distanceGrowthFactor`,
`thicknessDecayFactor`, `height`, `width`.
