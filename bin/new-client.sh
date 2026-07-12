#!/usr/bin/env bash
# new-client.sh — copy a starter kit into a new client project folder.
#
# Usage:
#   ./bin/new-client.sh <slug> [--kit html|portfolio|wix] [--out DIR]
#
# Examples:
#   ./bin/new-client.sh acme-plumbing
#   ./bin/new-client.sh alex-rivera --kit portfolio
#   ./bin/new-client.sh bob-bakery --kit html --out ~/projects/client-sites
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
KIT="html"
OUT_BASE="${CLIENT_SITES_DIR:-$(dirname "$ROOT")}"
SLUG=""

usage() {
  sed -n '2,12p' "$0"
  exit "${1:-0}"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help) usage 0 ;;
    --kit) KIT="${2:-}"; shift 2 ;;
    --out) OUT_BASE="${2:-}"; shift 2 ;;
    -*)
      echo "Unknown flag: $1" >&2
      usage 2
      ;;
    *)
      if [[ -z "$SLUG" ]]; then SLUG="$1"; else echo "Extra arg: $1" >&2; usage 2; fi
      shift
      ;;
  esac
done

[[ -n "$SLUG" ]] || usage 2

SLUG="$(printf '%s' "$SLUG" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-|-$//g')"
[[ -n "$SLUG" ]] || { echo "Invalid slug" >&2; exit 2; }

case "$KIT" in
  html|business) KIT=html; SRC="${ROOT}/starters/html" ;;
  portfolio|folio) KIT=portfolio; SRC="${ROOT}/starters/portfolio" ;;
  wix) KIT=wix; SRC="${ROOT}/starters/wix" ;;
  *) echo "Unknown kit: $KIT (use html|portfolio|wix)" >&2; exit 2 ;;
esac

[[ -d "$SRC" ]] || { echo "Missing starter: $SRC" >&2; exit 1; }

DEST="${OUT_BASE%/}/${SLUG}"
if [[ -e "$DEST" ]]; then
  echo "Destination already exists: $DEST" >&2
  exit 1
fi

mkdir -p "$(dirname "$DEST")"
cp -R "$SRC" "$DEST"

# Drop kit-local docs that duplicate the playbook when useful
if [[ -f "${ROOT}/playbook/CLIENT-BRIEF.md" && ! -f "${DEST}/CLIENT-BRIEF.md" ]]; then
  cp "${ROOT}/playbook/CLIENT-BRIEF.md" "${DEST}/CLIENT-BRIEF.md"
fi

# Seed a README for the new project
{
  echo "# ${SLUG}"
  echo
  echo "Scaffolded from **client-site-starter** kit \`${KIT}\` on $(date +%Y-%m-%d)."
  echo
  echo "## Next steps"
  echo
  echo "1. Fill \`CLIENT-BRIEF.md\`"
  echo "2. Edit \`js/site-config.js\` (and \`css/brand.css\` for HTML kits)"
  echo "3. Preview: \`python3 -m http.server 8080\`"
  echo "4. Launch checklist: \`CHECKLIST.md\`"
  echo "5. After go-live: \`~/.organized/bin/seo-do https://YOUR-LIVE-URL\`"
} > "${DEST}/PROJECT.md"

echo "Created: $DEST"
echo "Kit:     $KIT"
echo "Preview: cd \"$DEST\" && python3 -m http.server 8080"
if [[ "$KIT" == "wix" ]]; then
  echo "Wix:     see WIX-WORKFLOW.md — ~/.organized/bin/wix-do status"
fi
