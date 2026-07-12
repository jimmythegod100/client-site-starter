# End-to-end process

From first contact to live site and handoff.

## Phase 1 — Intake (before you build)

1. **Discovery call or form** — what they do, who they serve, what they want visitors to do
2. **Pick a kit** — [DECISION-TREE.md](DECISION-TREE.md)
3. **Fill [CLIENT-BRIEF.md](CLIENT-BRIEF.md)** — get client sign-off on scope
4. **Collect assets** — logo, photos, copy (set a deadline)
5. **Deposit / agreement** (if you use contracts)

## Phase 2 — Build

### HTML or Portfolio path

```bash
cp -R starters/html ../client-acme-site   # or starters/portfolio
cd ../client-acme-site
```

1. Edit `css/brand.css` — 5 color tokens
2. Edit `js/site-config.js` — all text, email, URLs
3. Replace placeholder images
4. Copy extra blocks from [components/](../components/) if needed
5. Preview: `python3 -m http.server 8080`

### Wix path

1. Build `brief.json` from the brief (see [starters/wix/examples/brief.example.json](../starters/wix/examples/brief.example.json))
2. Save client images to `~/My Drive/Website Clients/<Name>/03-Assets/`
3. Run automation (see [starters/wix/WIX-WORKFLOW.md](../starters/wix/WIX-WORKFLOW.md))
4. Finish layout, colors, and publish in Wix editor (semi-manual steps)

## Phase 3 — Review

1. Send client a preview link (GitHub Pages draft URL or Wix preview)
2. One round of revisions included — track requests in brief notes
3. Client approves copy and photos
4. Run kit checklist + [CHECKLIST-LAUNCH.md](CHECKLIST-LAUNCH.md)

## Phase 4 — Launch

### GitHub Pages (HTML / Portfolio)

1. Create repo: `clientname-web` or `clientname-web-portfolio`
2. Push code; enable Pages (branch `main`, folder `/`)
3. Connect custom domain if client bought one (DNS CNAME → `username.github.io`)
4. Test contact form — first submit activates FormSubmit

### Wix

1. Connect domain in Wix dashboard
2. Publish site
3. Test Wix forms and contact methods
4. Hand client editor login (they reset password themselves)

## Phase 5 — Handoff

Send the client:

- Live URL
- How contact form / Wix forms reach their inbox
- **Docker package** (HTML/Portfolio/Studio): zip from `handoff-package.sh` / `make handoff … ZIP=1` with `CLIENT-RUN.md`
- What is included in support (e.g. 30 days of small text fixes)
- How to request paid updates

Archive in your files:

- Final `CLIENT-BRIEF.md`
- Final `site-config.js` or `brief.json`
- Handoff zip under `handoffs/`
- Invoice / completion date

See also: `~/Projects/vincent-web-portfolio/studio/docs/DOCKER-HANDOFF.md`
## Timeline guide (honest)

| Kit | Typical turnaround |
|-----|-------------------|
| HTML starter | 1–3 days (content ready) |
| Portfolio | 1–2 days |
| Wix | 2–5 days (editor + publish) |

Content delays from the client are the usual bottleneck — set deadlines in the brief.
