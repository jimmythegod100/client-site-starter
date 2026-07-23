# Client Website System

A complete toolkit for building small client websites — HTML business sites, Wix no-code path, freelancer portfolios, reusable components, and a step-by-step playbook.

**Start here:** [CLIENT-WEBSITE-SYSTEM.md](CLIENT-WEBSITE-SYSTEM.md)  
**Visual hub:** [docs/client-website-system.html](docs/client-website-system.html)

## Kits at a glance

| Folder | Best for |
|--------|----------|
| [starters/html/](starters/html/) | Local business brochure sites on GitHub Pages |
| [starters/wix/](starters/wix/) | Clients who need to edit the site themselves |
| [starters/portfolio/](starters/portfolio/) | Freelancer / personal portfolio one-pagers |
| [components/](components/) | Reusable header, hero, form blocks |
| [playbook/](playbook/) | Brief, checklists, full process |

## Quick start

```bash
# New client from a kit (recommended)
./bin/new-client.sh acme-plumbing                 # HTML business kit
./bin/new-client.sh alex-rivera --kit portfolio
./bin/new-client.sh bob-bakery --kit wix --out ~/projects/client-sites

# Or copy manually
cp -R starters/html ../acme-plumbing-site

# Preview
cd ../acme-plumbing-site && python3 -m http.server 8080
```

Fill [playbook/CLIENT-BRIEF.md](playbook/CLIENT-BRIEF.md) first, then customize the starter.

After go-live: `~/.organized/bin/seo-do https://LIVE-URL` (or Jenny: “SEO audit this page”).

## Nexus workspace entry

From the Nexus root (preferred):

```bash
../bin/new-client-site.sh your-business-slug
```

Default output: `../client-sites/<slug>`.
