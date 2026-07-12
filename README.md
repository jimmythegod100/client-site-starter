# Client Website Starter Kit

A **copy-and-customize template** for small business client sites. Think of it like a pre-built house frame: walls, rooms, and plumbing are already there — you paint, furnish, and add the client's name.

## When to use this

- Client wants a simple brochure site (Home, About, Services, Contact)
- You host on **GitHub Pages**, Netlify, or any static host
- You want fast turnaround without rebuilding from scratch every time

## New client workflow (about 30–60 minutes)

### Step 1 — Copy the folder

```bash
cp -R client-site-starter ../acme-plumbing-site
cd ../acme-plumbing-site
```

Or duplicate in Finder. One folder = one client project.

### Step 2 — Fill the brief

Open `CLIENT-BRIEF.md` and fill in business details with the client (or from their intake form). This is your source of truth before you touch code.

### Step 3 — Change brand colors (5 tokens)

Edit **`css/brand.css`** — only the five `--brand-*` lines at the top. Example: swap teal for the client's navy.

### Step 4 — Edit client content (one file)

Open **`js/site-config.js`** and update:

- Business name, email, phone, address
- Hero headline and images
- About text and services list
- Contact form email (`formAction`) and live site URL (`siteUrl`)

Most pages pull from this file automatically.

### Step 5 — Preview locally

```bash
cd /path/to/client-folder
python3 -m http.server 8080
```

Open http://localhost:8080 in your browser. Click every page. Submit a test form (use your own email first).

### Step 6 — Launch

Follow **`CHECKLIST.md`**. Push to GitHub, turn on Pages, connect domain if they bought one.

## What's in the box

| File / folder | Purpose |
|---------------|---------|
| `CLIENT-BRIEF.md` | Intake template — fill with client before building |
| `CHECKLIST.md` | Launch checklist so nothing gets forgotten |
| `css/brand.css` | **Brand colors** — the 5 swaps non-devs can edit |
| `css/main.css` | Layout and styling (usually leave alone) |
| `js/site-config.js` | **All client text and settings** |
| `js/layout.js` | Shared header/footer (usually leave alone) |
| `*.html` | Pages: Home, About, Services, Contact, Thank-you |

## Contact form

Uses [FormSubmit](https://formsubmit.co) (free, no backend needed):

1. Set `contact.formAction` to `https://formsubmit.co/CLIENT@EMAIL.com`
2. Set `brand.siteUrl` to the live URL (for redirect after submit)
3. First real submission activates delivery — client clicks the confirmation email once

## Related tools you already have

- **Portfolio workflow:** `~/.cursor/skills/static-portfolio-github-pages/SKILL.md` — similar pattern for freelancer portfolios
- **Wix automation:** `~/.organized/docs/WIX-AUTOMATION.md` — when client insists on Wix instead of code
- **Bootstrap script:** `vincent-web-portfolio/scripts/bootstrap-new-client.sh` for portfolio repos

## Tips

- Replace Unsplash placeholder images with client photos before launch
- Keep copy honest — no fake testimonials or inflated stats
- Test on your phone before handoff
- One Git repo per client keeps projects clean
