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
# Pick a kit, copy for a new client
cp -R starters/html ../acme-plumbing-site

# Preview
cd ../acme-plumbing-site && python3 -m http.server 8080
```

Fill [playbook/CLIENT-BRIEF.md](playbook/CLIENT-BRIEF.md) first, then customize the starter.
