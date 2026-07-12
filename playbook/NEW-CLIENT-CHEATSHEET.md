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
cp -R starters/html ../NEW-CLIENT-NAME
cd ../NEW-CLIENT-NAME
# Edit css/brand.css (5 colors)
# Edit js/site-config.js (all text)
python3 -m http.server 8080
```

**Wix instead:**

```bash
~/.organized/bin/wix-do status
~/.organized/bin/wix-brief-prepare brief.json --out prepared.json
~/.organized/bin/wix-do create-from-brief prepared.json
```

## 4. Launch

- [ ] [CHECKLIST-LAUNCH.md](CHECKLIST-LAUNCH.md)
- [ ] Test form on phone
- [ ] Send live URL to client

## 5. Handoff

- Explain form emails
- Archive brief + config
- Final invoice

## Help

- Hub: [docs/client-website-system.html](../docs/client-website-system.html)
- Components: [components/](../components/)
- Full process: [PROCESS.md](PROCESS.md)
