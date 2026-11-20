# Dens-UI style guide

How to build screens that look and behave like Dens-UI. You can read every value here in [`src/styles/dens-ui.css`](../src/styles/dens-ui.css). The live version is at https://dendense.github.io/dens-ui/#/docs/theming.

## 1. Where the palette comes from

The palette comes from the "Mars Green" colour study: one Mars Green block on near-black, paired with a soft colour and a strong one. Dens-UI ships the **Mint + Hermès orange** pairing as its theme. The other sheets become supporting roles:

| Sheet colour | Hex | Dens-UI role |
| --- | --- | --- |
| Mars Green | `#008C8D` | `brand`, `primary` (tuned to `#00797A` for AA text), `ring`, `chart-1` |
| Hermès orange | `#FF8A00` | `highlight`, `chart-2` |
| Mint | `#C0EBD7` | `soft`, `success` |
| Champagne | `#EBE3A5` | `warning` |
| Klein blue | `#0B3289` | `info`, `chart-3` |
| Periwinkle | `#53589A` | `chart-4` |
| Cartier red | `#A42423` | `destructive` (light) |
| Pomegranate | `#F74835` | `destructive` (dark), `chart-5` |
| Near-black | `#0C0B0B` | dark `background` |

## 2. Tokens

Every token is a CSS variable, and `@theme inline` exposes it to Tailwind, so each one works as a utility (`bg-*`, `text-*`, `ring-*`, `border-*`, `fill-*`, with opacity modifiers such as `bg-highlight/10`).

**Surfaces, from back to front**

| Layer | Class | Notes |
| --- | --- | --- |
| Ground | `bg-background` | Soft green-grey `#EDF0EF` in light, near-black in dark |
| Well | `bg-surface` | Recessed areas inside a panel: chart wells, list rows, code |
| Panel | `bg-card` | White panels. Pair with `shadow-panel` and `ring-1 ring-border/60` |
| Floating | `bg-popover` | Menus, selects, dialogs, with `shadow-raised` |

**Text**: `text-foreground` for primary text and `text-muted-foreground` for secondary text. Both pass WCAG AA on every surface in both modes. On a coloured fill, use that fill's `-foreground` pair: `bg-highlight text-highlight-foreground`.

**Shadcn compatibility**: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, `chart-1…5` and `sidebar-*` use shadcn/ui's names and meanings. Dens-UI adds `surface`, `brand`, `highlight`, `soft`, `success`, `warning` and `info`.

## 3. Colour rules

1. **Mars Green carries the interface.** Use it for the primary action, links, focus rings, checked controls, selection and the first data series.
2. **Hermès orange marks what is waiting on the reader.** Use it for a pending approval, a slowdown, an unread count or a "waiting on you" badge. If two orange things compete on one screen, one of them is wrong.
3. **One `brand` panel per screen.** `<Card variant="brand">` and the palette-sheet blocks are statements, so don't tile them.
4. **Status uses fills, not side stripes.** Alerts and badges get their tone from a tinted fill and a ring. Never add a coloured `border-left`.
5. **Ink is a colour.** `variant="ink"` (foreground on background) is the confirm button: Approve, Pause, New. It keeps the green for navigation and primary flows.

## 4. Shape

| Element | Radius | Class |
| --- | --- | --- |
| Buttons, badges, segmented tabs, small selects | pill | `rounded-full` |
| Inputs, selects, menu items | 14px / 10px | `rounded-lg` / `rounded-md` |
| Inner wells, list items | 18px | `rounded-xl` / `rounded-2xl` |
| Cards, panels | 22px | `rounded-2xl` |
| Dialogs, sidebars, app frames | 28px | `rounded-3xl` |

Base radius is `--radius: 0.875rem`. Change it once and the whole scale follows.

**Nested corners:** when an element sits close to its container's corner, outer radius = inner radius + padding. For example, a Sidebar is 28 = item 18 + padding 10, and a menu is 18 = item 14 + padding 4. Check this rule whenever you place something in a corner.

**The palette sheet:** every curve is a circular arc. Facing arcs are concentric, with radii that differ by the gap, so the gap stays exactly 16 units through the bends. See `src/site/parts/sheet-geometry.ts`, and run `npm run check:geometry` to measure it.

## 5. Depth

Two elevations, both with a real offset and a soft blur:

- `shadow-panel` for cards resting on the ground.
- `shadow-raised` for menus, dialogs, tooltips and the one item in a list that needs action (see the first approval in the dashboard block).

Avoid hard offset shadows, glows and glass.

## 6. Type

- **Figtree** (variable) for interface and reading text. Headings are bold with tight tracking (`tracking-[-0.035em]`). Body text in docs runs at about 15.5px with a measure of about 68ch.
- **JetBrains Mono** for code, IDs (`AR-214`), timestamps, hex values, axis labels and table column heads. Don't use mono for headings or running text.
- Numbers in tables and stats use `tabular-nums`.

## 7. Components at a glance

| Need | Use |
| --- | --- |
| Range switch (Today / 7 days / 30 days) | `Tabs` + `TabsList` (pill) |
| List filter with counts (Active 18) | `TabsList variant="line"` + `TabsCount` |
| Health state | `Badge variant="soft"` + `StatusDot` |
| Something needs the user | `Badge variant="highlight"`, `SidebarCount tone="highlight"` |
| Primary action | `Button` |
| Confirm / approve | `Button variant="ink"` |
| Keyboard hint | `Kbd`, also inside `InputGroup end` or a button |
| Navigation | `Sidebar`, `SidebarSection`, `SidebarItem`, `collapsed` for the icon rail |

## 8. Dark mode

Add `class="dark"` to `<html>`. The tokens switch to the palette sheet's near-black ground, `#161918` panels and a lighter teal (`#19A3A4`) primary with dark text on it. Pomegranate replaces Cartier red for destructive, because it reads better on black. Avoid hard-coded colours in components so both modes keep working; the palette-sheet illustration is the one deliberate exception.

## 9. Accessibility

- Radix primitives provide keyboard behaviour and ARIA for Checkbox, Switch, Radio Group, Select, Tabs, Dialog, Dropdown Menu, Tooltip and Avatar.
- Every focusable element shows a 2px `ring` focus indicator.
- Icon-only buttons need an `aria-label`. Progress needs `aria-label` or a visible label.
- `prefers-reduced-motion` shortens every animation and transition to 1ms.
