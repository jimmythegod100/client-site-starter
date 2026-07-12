# New client cheat sheet

Print or keep this open. One page.

## 1. Pick kit

| Need | Kit |
|------|-----|
| Business site, you maintain | `starters/html/` |
| Client edits themselves | `starters/wix/` |
| Freelancer portfolio | `starters/portfolio/` |

## 2. Brief

Copy [CLIENT-BRIEF.md](CLIENT-BRIEF.md) → fill → client sign-off

## 3. Build

```bash
# From client-site-starter/
./bin/new-client.sh NEW-CLIENT-NAME                 # HTML kit
./bin/new-client.sh NEW-CLIENT-NAME --kit portfolio
./bin/new-client.sh NEW-CLIENT-NAME --kit wix

cd ../NEW-CLIENT-NAME   # or your --out path
# Edit css/brand.css (5 colors) — HTML kits
# Edit js/site-config.js (all text)
python3 -m http.server 8080
```

**Wix instead (automation):**

```bash
~/.organized/bin/wix-do status
~/.organized/bin/wix-brief-prepare brief.json --out prepared.json
~/.organized/bin/wix-do create-from-brief prepared.json
```

## 4. Launch

- [ ] [CHECKLIST-LAUNCH.md](CHECKLIST-LAUNCH.md)
- [ ] Test form on phone
- [ ] Send live URL to client
- [ ] `seo-do https://LIVE-URL` — fix **high** issues

## 5. Handoff

- Explain form emails
- Archive brief + config
- Final invoice

## Help

- Hub: [docs/client-website-system.html](../docs/client-website-system.html)
- Components: [components/](../components/)
- Full process: [PROCESS.md](PROCESS.md)
- SEO: `~/.organized/docs/SEO-AUDIT.md`
