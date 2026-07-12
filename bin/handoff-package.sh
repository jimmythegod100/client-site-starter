#!/usr/bin/env bash
# handoff-package.sh — package a finished static site for client Docker handoff.
#
# Usage:
#   ./bin/handoff-package.sh <SITE_DIR> [--out DIR] [--zip] [--port N]
#
# Creates SITE-handoff-YYYYMMDD/ with site + Docker + CLIENT-RUN.md (+ optional zip).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SITE=""
OUT_BASE="${HANDOFF_OUT:-$ROOT/handoffs}"
MAKE_ZIP=0
PORT="${PORT:-8080}"

usage() {
  sed -n '2,10p' "$0"
  exit "${1:-0}"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help) usage 0 ;;
    --out) OUT_BASE="${2:-}"; shift 2 ;;
    --zip) MAKE_ZIP=1; shift ;;
    --port) PORT="${2:-}"; shift 2 ;;
    -*)
      echo "Unknown flag: $1" >&2
      usage 2
      ;;
    *)
      if [[ -z "$SITE" ]]; then SITE="$1"; else echo "Extra arg: $1" >&2; usage 2; fi
      shift
      ;;
  esac
done

[[ -n "$SITE" ]] || usage 2
SITE="$(cd "$SITE" && pwd)"
[[ -f "$SITE/index.html" ]] || { echo "No index.html in $SITE" >&2; exit 1; }

SLUG="$(basename "$SITE" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-|-$//g')"
TITLE="$(python3 -c "import sys; print(' '.join(w.capitalize() for w in sys.argv[1].split('-')))" "$SLUG")"
STAMP="$(date +%Y%m%d)"
DEST="${OUT_BASE%/}/${SLUG}-handoff-${STAMP}"

rm -rf "$DEST"
mkdir -p "$DEST"

rsync -a \
  --exclude '.git' \
  --exclude '.env' \
  --exclude '.env.*' \
  --exclude '__pycache__' \
  --exclude '.DS_Store' \
  --exclude 'node_modules' \
  --exclude 'handoffs' \
  "$SITE/" "$DEST/"

# Ensure Docker packaging files
mkdir -p "$DEST/docker"
cp "${ROOT}/docker/nginx.conf" "$DEST/docker/nginx.conf"
cp "${ROOT}/docker/Dockerfile" "$DEST/docker/Dockerfile"
cp "${ROOT}/docker/docker-compose.build.yml" "$DEST/docker-compose.yml"
cp "${ROOT}/docker/dockerignore.template" "$DEST/.dockerignore"

# .env for port
cat > "$DEST/.env.example" <<EOF
PORT=${PORT}
EOF
cp "$DEST/.env.example" "$DEST/.env"

cat > "$DEST/CLIENT-RUN.md" <<EOF
# ${TITLE} — how to run your website

This package is a complete copy of your site plus Docker config so it runs the same way on any machine.

## Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) **or** [Podman](https://podman.io/)

## Start

\`\`\`bash
cd $(basename "$DEST")
cp .env.example .env   # if needed
docker compose up --build
\`\`\`

Open **http://localhost:${PORT}**

Stop with \`Ctrl+C\` or \`docker compose down\`.

## Edit content

| Path | What to change |
|------|----------------|
| \`js/site-config.js\` | Business name, phone, email, copy |
| \`css/brand.css\` | Brand colors |
| \`*.html\` | Page structure (advanced) |
| images / assets | Photos and logo |

Rebuild after edits: \`docker compose up --build\`

## Go live (hosting)

Options your developer discussed:

1. **GitHub Pages / Netlify** — upload the site files (HTML/CSS/JS)
2. **VPS** — keep using \`docker compose up -d\` on a small server
3. **Your existing host** — ask them to serve the static files from this folder

## Support

See \`HANDOFF.md\` (if included) for the support window and how to request changes.
EOF

# Handoff checklist for us / client
cat > "$DEST/HANDOFF.md" <<EOF
# Client handoff — ${TITLE}

## Access

| Item | Value |
|------|-------|
| Preview URL | http://localhost:${PORT} (Docker) |
| Production URL | |
| Hosting | |
| Domain registrar | |
| Admin / form inbox | |

## Delivered

- [ ] Agreed pages
- [ ] Contact form working
- [ ] Mobile layout checked
- [ ] SEO basics (titles, meta, robots/sitemap)
- [ ] Docker package runs with \`docker compose up --build\`

## How to edit

See [CLIENT-RUN.md](CLIENT-RUN.md).

## Support window

Revisions included: ___ · After that: hourly / new quote.

## Backups

Who owns backups: client / host / studio.
EOF

# Project README
cat > "$DEST/README.md" <<EOF
# ${TITLE}

Docker handoff package — start with **[CLIENT-RUN.md](CLIENT-RUN.md)**.

\`\`\`bash
docker compose up --build
# → http://localhost:${PORT}
\`\`\`
EOF

if grep -RIlE 'sk-[a-zA-Z0-9]{20,}|ghp_[a-zA-Z0-9]{20,}|AKIA[0-9A-Z]{16}' "$DEST" >/dev/null 2>&1; then
  echo "ERROR: possible secret detected — aborting" >&2
  exit 1
fi

mkdir -p "$OUT_BASE"
echo "Handoff folder: $DEST"

ZIP_PATH=""
if [[ "$MAKE_ZIP" -eq 1 ]]; then
  ZIP_PATH="${DEST}.zip"
  rm -f "$ZIP_PATH"
  if ! command -v zip >/dev/null 2>&1; then
    echo "WARN: zip not installed — folder handoff only (brew install zip)" >&2
    ZIP_PATH=""
  else
    (
      cd "$(dirname "$DEST")"
      unset ZIP
      zip -qr "$(basename "$ZIP_PATH")" "$(basename "$DEST")"
    )
    if [[ -f "$ZIP_PATH" ]]; then
      echo "Handoff zip:    $ZIP_PATH ($(du -h "$ZIP_PATH" | awk '{print $1}'))"
    else
      echo "WARN: zip ran but $ZIP_PATH missing" >&2
      ZIP_PATH=""
    fi
  fi
fi

cat > "$DEST/HANDOFF-MANIFEST.txt" <<EOF
slug=${SLUG}
title=${TITLE}
built=$(date -u +%Y-%m-%dT%H:%M:%SZ)
source=${SITE}
port=${PORT}
zip=${ZIP_PATH:-none}
runtime=docker-compose
EOF

echo
echo "Next:"
echo "  1. Fill HANDOFF.md production URL + support window"
echo "  2. Smoke: cd \"$DEST\" && docker compose up --build"
echo "  3. Send ${ZIP_PATH:-$DEST} to the client"
