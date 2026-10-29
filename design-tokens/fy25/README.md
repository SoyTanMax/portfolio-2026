# FY25 design tokens

The Epicor FY25 Figma variables, built for code.

- `figma-export/` — the three variable collections exported from Figma (primitives, semantic, components), one row per variable with its light and dark values. Aliases are kept as `{path/to/token}`.
- `dist/tokens.json` — the same tokens in the [W3C Design Tokens](https://tr.designtokens.org/format/) format. Dark values live in `$extensions["com.figma"].modes.dark`.
- `dist/tokens.css` — CSS variables. Light on `:root`, dark on `[data-theme="dark"]`.
- `dist/tailwind.preset.cjs` — a Tailwind preset whose utilities read those variables, so classes follow the active mode.

Rebuild with `npm run tokens` (`scripts/build-tokens.mjs`, no dependencies).

## Naming

Variables carry their tier, because the same name can exist in two tiers (`radius/none` is both a primitive and a semantic token):

- `--ref-*` primitives: raw values, such as `--ref-color-petrol-900`.
- `--sys-*` semantic roles, such as `--sys-text-primary`.
- `--comp-*` component tokens, only where a component needs its own value, such as `--comp-chip-general-gray-bg-default`.

Aliases stay aliases: `--sys-text-primary: var(--ref-color-petrol-1000)`. Change a primitive and everything that uses it follows.

## Using it

```js
// tailwind.config.js
module.exports = { presets: [require("./design-tokens/fy25/dist/tailwind.preset.cjs")] };
```

```css
@import "./design-tokens/fy25/dist/tokens.css";
```

```html
<div class="bg-surface-secondary text-text-primary rounded-lg">…</div>
<section data-theme="dark">…same classes, dark values…</section>
```

Gradients are Figma color styles, not variables, so they aren't part of this export.
