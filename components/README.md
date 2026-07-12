# Component Library

Reusable HTML blocks that match the [HTML business starter](../starters/html/) look. Copy pieces into any client site.

## How to copy a piece into a client site

1. Open **[components.html](components.html)** in your browser (`python3 -m http.server 8082`)
2. Find the section you need (header, hero, form, etc.)
3. **View page source** or open `components.html` in an editor
4. Copy the HTML inside the `<section class="demo-block">` you want
5. Paste into your client's HTML file
6. Copy **`css/shared.css`** link (or merge into their `main.css`)
7. If the block uses config, wire it to their `site-config.js` or hardcode text

## Files

| File | Purpose |
|------|---------|
| [components.html](components.html) | Live demo of all blocks |
| [css/shared.css](css/shared.css) | Shared styles (same brand tokens as starters) |
| [snippets/](snippets/) | Copy-paste HTML only (no wrapper page) |

## Brand alignment

Uses the same 5 tokens as `starters/html/css/brand.css`:

- `--brand-primary`, `--brand-dark`, `--brand-bg`, `--brand-surface`, `--brand-accent`

Change those in the client's `brand.css` and components match automatically.

## Preview

```bash
cd components && python3 -m http.server 8082
# open http://localhost:8082/components.html
```
