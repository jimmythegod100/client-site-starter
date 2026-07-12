# Client Brief — Wix projects

Start with the **[canonical brief](../../playbook/CLIENT-BRIEF.md)** and fill every section.

This page adds **Wix-specific** fields only.

---

## Wix setup

| Field | Answer |
|-------|--------|
| **Editor** | Studio (default) / Classic / Templates |
| **Template** | blank / template name |
| **Pages** | e.g. Home, About, Services, Contact |
| **Brand colors** (hex) | Primary, secondary |
| **Wix plan** | Who pays? (client account under their email recommended) |

---

## Images for automation

List files for `brief.json` → `images[]`:

| Role | File path | Page |
|------|-----------|------|
| logo | | |
| hero | | Home |
| about | | About |
| gallery | | |

Store copies in: `~/My Drive/Website Clients/<BusinessName>/03-Assets/`

---

## Wix-only features

| Feature | Needed? | Notes |
|---------|---------|-------|
| Wix Forms contact | | |
| Wix Bookings | | |
| Wix Stores | | |
| Blog | | |
| Members / login | | |

---

## After brief is done

1. Create `brief.json` (see [examples/brief.example.json](examples/brief.example.json))
2. Run [WIX-WORKFLOW.md](WIX-WORKFLOW.md)
3. Launch with [CHECKLIST.md](CHECKLIST.md)
