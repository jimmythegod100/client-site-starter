# GitHub Pages (optional)

Copy this file into a new client repo as `.github/workflows/pages.yml` if you want GitHub to publish the site automatically from the `main` branch root.

```yaml
name: Deploy GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: deployment
        uses: actions/deploy-pages@v4
```

Also in the GitHub repo: **Settings → Pages → Source = GitHub Actions**.

After the first deploy, set `brand.siteUrl` in `js/site-config.js`, update `robots.txt` + `sitemap.xml`, then run:

```bash
~/.organized/bin/seo-do https://YOURUSER.github.io/YOUR-REPO/
```
