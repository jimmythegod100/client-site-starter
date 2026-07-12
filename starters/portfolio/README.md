# Portfolio Starter

A **one-page portfolio** for freelancers — web designers, photographers, consultants. Hosts free on GitHub Pages.

## When to use this

- Person selling **their own services** (not a brick-and-mortar business)
- Needs: hero, about, work examples, services, contact, optional Calendly
- Honest copy — no fake testimonials or inflated stats

For multi-page **business** sites, use [HTML starter](../html/) instead.

## New client workflow

```bash
cp -R starters/portfolio ../jane-design-portfolio
cd ../jane-design-portfolio
```

1. Fill [playbook CLIENT-BRIEF](../../playbook/CLIENT-BRIEF.md) (portfolio section)
2. Edit **`css/brand.css`** — 5 color tokens
3. Edit **`js/site-config.js`** — name, copy, email, integrations
4. Replace placeholder headshot in `index.html` (search for `hero-photo`)
5. Preview: `python3 -m http.server 8080`
6. Push to GitHub; enable Pages
7. [CHECKLIST.md](CHECKLIST.md)

## Integrations (optional)

Edit `js/site-config.js` → `integrations`:

| Key | When set |
|-----|----------|
| `calendlyUrl` | Shows "Book a call" section |
| `social.*` | Footer + contact social row |
| `payments.*` | Stripe / PayPal / Venmo buttons |

Empty string = hidden. No pre-setup required.

## Naming convention

One repo per client: `clientname-web-portfolio`  
Live URL: `https://YOUR_GITHUB_USERNAME.github.io/clientname-web-portfolio/`

See skill: `~/.cursor/skills/static-portfolio-github-pages/SKILL.md`

## Related

- Canonical brief: [playbook/CLIENT-BRIEF.md](../../playbook/CLIENT-BRIEF.md)
- Components: [components/](../../components/)
