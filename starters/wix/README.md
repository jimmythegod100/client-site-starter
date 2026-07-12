# Wix Client Kit

Use this when the **client needs to edit the site themselves** — drag-and-drop pages, update hours, swap photos without calling you.

## Wix vs HTML starter

| | HTML starter | Wix kit |
|---|--------------|---------|
| **Who edits later?** | You (or client edits one config file) | Client in Wix editor |
| **Hosting cost** | Free (GitHub Pages) | Wix plan (client pays) |
| **Best for** | Brochure sites you maintain | Restaurants, salons, shops |
| **Build speed** | Fast if you know the template | Fast with automation + editor finish |
| **Your automation** | Git push | `wix-do` + Chrome login |

**Rule of thumb:** If the client says "I want to change it myself," use Wix. If they say "just make it look professional," use [HTML starter](../html/).

## What's in this folder

| File | Purpose |
|------|---------|
| [CLIENT-BRIEF.md](CLIENT-BRIEF.md) | Same fields as master brief + Wix notes |
| [CHECKLIST.md](CHECKLIST.md) | Wix-specific launch steps |
| [WIX-WORKFLOW.md](WIX-WORKFLOW.md) | Automation commands (real flags only) |
| [examples/brief.example.json](examples/brief.example.json) | Sample brief for `wix-brief-prepare` |

Master brief: [playbook/CLIENT-BRIEF.md](../playbook/CLIENT-BRIEF.md)

## Quick start

1. Fill brief → build `brief.json`
2. `~/.organized/bin/wix-do status` — Chrome logged into Wix
3. `~/.organized/bin/wix-brief-prepare brief.json --out prepared.json`
4. `~/.organized/bin/wix-do create-from-brief prepared.json`
5. Finish in editor → publish → [CHECKLIST.md](CHECKLIST.md)

Full command reference: [WIX-WORKFLOW.md](WIX-WORKFLOW.md)
