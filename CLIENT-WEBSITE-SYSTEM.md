# Client Website System

One assembly line for building small client websites. Pick the right kit, fill the brief, build, check the list, launch.

## Quick decision — which kit?

| Client needs… | Use this kit |
|---------------|--------------|
| Simple business site (Home, About, Services, Contact) — you host on GitHub Pages | **[HTML Business Starter](starters/html/)** |
| Client must edit the site themselves (drag-and-drop) | **[Wix Kit](starters/wix/)** |
| Freelancer / personal portfolio (one-page, Calendly, social links) | **[Portfolio Starter](starters/portfolio/)** |
| Reusable pieces (header, hero, form) to copy into any site | **[Component Library](components/)** |
| End-to-end process, brief, checklists | **[Playbook](playbook/)** |

**Not sure?** Open the [HTML hub](docs/client-website-system.html) in your browser for a plain-English walkthrough.

## Folder map

```
client-site-starter/          ← this repo (monorepo)
├── CLIENT-WEBSITE-SYSTEM.md  ← you are here
├── docs/client-website-system.html
├── starters/
│   ├── html/                 ← business brochure sites
│   ├── wix/                  ← no-code Wix path + automation
│   └── portfolio/            ← freelancer one-pagers
├── components/               ← copy-paste HTML + CSS blocks
└── playbook/                 ← brief, checklists, process
```

## New client — 5 steps

1. **Choose kit** — see decision table above or [playbook/DECISION-TREE.md](playbook/DECISION-TREE.md)
2. **Fill brief** — [playbook/CLIENT-BRIEF.md](playbook/CLIENT-BRIEF.md)
3. **Copy starter folder** — one folder per client project
4. **Build** — edit `site-config.js` + brand colors; use [components/](components/) if needed
5. **Launch** — [playbook/CHECKLIST-LAUNCH.md](playbook/CHECKLIST-LAUNCH.md)

## Open locally

```bash
# HTML business starter
cd starters/html && python3 -m http.server 8080

# Portfolio starter
cd starters/portfolio && python3 -m http.server 8081

# Component library demo
cd components && python3 -m http.server 8082

# System hub (HTML)
open docs/client-website-system.html
```

## Wix automation (when client picks Wix)

See [starters/wix/WIX-WORKFLOW.md](starters/wix/WIX-WORKFLOW.md). Uses your logged-in Chrome session — never stores passwords.

```bash
~/.organized/bin/wix-do status
~/.organized/bin/wix-brief-prepare starters/wix/examples/brief.example.json --out /tmp/prepared-brief.json
~/.organized/bin/wix-do create-from-brief /tmp/prepared-brief.json
```

## Related

- Portfolio skill: `~/.cursor/skills/static-portfolio-github-pages/SKILL.md`
- Wix docs: `~/.organized/docs/WIX-AUTOMATION.md`
- Website skills guide: `../docs/website-skills-reference.html` (in nexus workspace)
