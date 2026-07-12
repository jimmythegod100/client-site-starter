# Wix workflow — real commands

These match `~/.organized/docs/WIX-AUTOMATION.md` and `~/.organized/bin/wix-do`. No invented flags.

**Security:** Scripts use your open Chrome session. Never type or store Wix passwords.

---

## Prerequisites

1. **Google Chrome** logged into [manage.wix.com](https://manage.wix.com)
2. **Apple Events** (for tab control):
   ```bash
   ~/.organized/scripts/chrome-enable-automation.sh
   ```
3. **Optional CDP** (iframes, auto-upload, full-page build):
   ```bash
   ~/.organized/scripts/chrome-cdp-start.sh --ensure
   ```

---

## Step 1 — Check status

```bash
~/.organized/bin/wix-do status
```

Confirms Wix tab + login heuristics. If session expired, log in in Chrome and rerun.

---

## Step 2 — Prepare brief JSON

From [CLIENT-BRIEF.md](CLIENT-BRIEF.md), create `brief.json`. Example: [examples/brief.example.json](examples/brief.example.json).

Stage images (resize large files):

```bash
~/.organized/bin/wix-brief-prepare /path/to/brief.json --out /path/to/prepared-brief.json
```

Extra images from chat/downloads:

```bash
~/.organized/bin/wix-brief-prepare brief.json ~/Downloads/photo1.jpg --out prepared.json
```

---

## Step 3 — Create site from brief

```bash
~/.organized/bin/wix-do create-from-brief /path/to/prepared-brief.json
```

Starts site flow, stages images, attempts upload. Read JSON output for `semiManual` steps.

Stdin variant:

```bash
cat brief.json | ~/.organized/bin/wix-do create-from-brief --stdin
```

---

## Step 4 — Open editor (manual navigation)

```bash
~/.organized/bin/wix-do open-editor studio
~/.organized/bin/wix-do open-editor templates
~/.organized/bin/wix-do open-editor adi
~/.organized/bin/wix-do open-editor classic
```

---

## Step 5 — Set header / apply content (CDP)

Requires Wix Studio editor tab open + CDP:

```bash
~/.organized/bin/wix-do set-header "Business Name"
~/.organized/bin/wix-do set-header /path/to/brief.json
```

Apply header and tagline in open editor:

```bash
~/.organized/bin/wix-do apply-content /path/to/prepared-brief.json
```

---

## Step 6 — Images

**Stage only** (prints folder + instructions):

```bash
~/.organized/bin/wix-do stage-images /path/to/prepared-brief.json
```

**Upload** (best with CDP on port 9222):

```bash
~/.organized/bin/wix-do upload-images /path/to/prepared-brief.json
```

---

## Step 7 — Full-page build (Studio + CDP)

Drives open Wix Studio editor: content, Add Elements, pages, images.

```bash
~/.organized/scripts/chrome-cdp-start.sh --status
~/.organized/bin/wix-do status
~/.organized/bin/wix-do build-full-page /path/to/prepared-brief.json
```

Skip media upload during build:

```bash
~/.organized/bin/wix-do build-full-page prepared.json --skip-upload
```

Same as:

```bash
~/.organized/bin/wix-do apply-content --full /path/to/prepared-brief.json
```

Logs and screenshots:

- `~/.organized/logs/wix-build-steps/full-page-NN.png`
- `~/.organized/logs/wix-build-steps/steps.jsonl`

---

## Honest limits

- **Publish, domains, payments** — usually manual in Wix dashboard
- **Theme colors** — Site Styles → Colors (not fully automated)
- **Gallery placement** — after upload, assign in editor
- **ADI wizard** — no reliable API; use Studio + blank template instead

---

## Agent flow (natural language)

User: "Create a Wix site for Joe's Bakery, 3 pages, warm colors."

1. Build `brief.json` from intake; add `images[]` paths
2. `wix-do status`
3. `wix-brief-prepare brief.json --out prepared.json`
4. `wix-do create-from-brief prepared.json`
5. `wix-do build-full-page prepared.json` (if editor open + CDP)
6. Report semi-manual steps; client finishes publish

---

## Related docs

- Full reference: `~/.organized/docs/WIX-AUTOMATION.md`
- Chrome CDP: `~/.organized/docs/CHROME-AUTOMATION.md`
- Web commands: `~/.organized/docs/AGENT-WEB-COMMANDS.md`
