# Component index

All exports come from `'nebula-ds-react-library'` (the package barrel).
Route to the family file that owns the component; cross-cutting rules live
in the top-level references, not here.

| Component | Family reference |
| --- | --- |
| `Button`, `IconButton`, `Icon`, `Text` | [Actions & display](actions.md) |
| `Input`, `Select`, `Checkbox`, `RadioGroup` | [Forms](forms.md) |
| `Menu` (auto dropdown→sheet), `Sheet`, `Dialog`, `ToastProvider`, `Toaster`, `useToast`, `createToastStore`, `FlashProvider`, `useFlash` | [Overlays & feedback](overlays.md) |
| `FramePanel`, `Panel` (alias `Paper`), `FrameConnector`, `FrameConnectorNode`, `Horizon` | [Frame & layout](frame-layout.md) |
| `ThemeProvider`, `useTheme`, `themes` | [Theming](../theming.md) |
| `useBreakpoint` | [Composition](../composition.md) |
| `config` (token objects: `lightJsTokens`, `darkJsTokens`, `tw`, `utilities`) | [Theming](../theming.md#reading-token-values-in-js) |

## Choosing between similar components

| Need | Use | Not |
| --- | --- | --- |
| A primary action | `Button variant="filled"` (one per view/panel) | two filled buttons |
| An icon action | `IconButton` + `aria-label` | `Button` with only an icon child |
| One choice from few options | `RadioGroup` | `Select` |
| One choice from many options | `Select` | `RadioGroup` |
| Multiple choices | `Checkbox` / `Select multiple` | `RadioGroup` |
| An action menu | `Menu` (auto sheet on mobile) | hand-rolled `useBreakpoint` switch |
| A custom bottom drawer | `Sheet` | `Menu` |
| A destructive confirm | `Dialog role="alertdialog"` | window.confirm |
| Submit feedback | `flash()` + `toast.*` together | toast alone |
| A page/section | `FramePanel` | hand-drawn frame divs |
| A card/grouping | `Panel` | styled div |

Version note: features land in released versions — check the installed
package before using something you saw on repository `main`.
