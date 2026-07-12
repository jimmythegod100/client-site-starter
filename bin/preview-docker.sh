#!/usr/bin/env bash
# preview-docker.sh — serve a client site with nginx via Podman/Docker.
#
# Usage:
#   ./bin/preview-docker.sh [SITE_DIR] [--port N] [--build] [--down]
#
# Default SITE_DIR = current directory (or starters/html if run from repo root).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SITE=""
PORT="${PORT:-8080}"
MODE="preview" # preview | build
ACTION="up"    # up | down

usage() {
  sed -n '2,10p' "$0"
  exit "${1:-0}"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help) usage 0 ;;
    --port) PORT="${2:-}"; shift 2 ;;
    --build) MODE="build"; shift ;;
    --down) ACTION="down"; shift ;;
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

if [[ -z "$SITE" ]]; then
  if [[ -f "./index.html" ]]; then
    SITE="$(pwd)"
  else
    SITE="${ROOT}/starters/html"
  fi
fi
SITE="$(cd "$SITE" && pwd)"

# Ensure docker files exist on the site
if [[ ! -d "$SITE/docker" ]]; then
  mkdir -p "$SITE/docker"
  cp "${ROOT}/docker/nginx.conf" "$SITE/docker/nginx.conf"
  cp "${ROOT}/docker/Dockerfile" "$SITE/docker/Dockerfile"
  cp "${ROOT}/docker/docker-compose.yml" "$SITE/docker-compose.yml"
  cp "${ROOT}/docker/docker-compose.build.yml" "$SITE/docker/docker-compose.build.yml"
  cp "${ROOT}/docker/dockerignore.template" "$SITE/.dockerignore"
fi
[[ -f "$SITE/docker-compose.yml" ]] || cp "${ROOT}/docker/docker-compose.yml" "$SITE/docker-compose.yml"
[[ -f "$SITE/.dockerignore" ]] || cp "${ROOT}/docker/dockerignore.template" "$SITE/.dockerignore"

# Prefer studio ensure-runtime if present, else local probe
if [[ -x /Users/orcus/Projects/vincent-web-portfolio/studio/scripts/ensure-runtime.sh ]]; then
  # shellcheck disable=SC1091
  source /dev/null
  /Users/orcus/Projects/vincent-web-portfolio/studio/scripts/ensure-runtime.sh >/dev/null
  # Re-export DOCKER_HOST from ensure if sock exists
  sock="$(ls /var/folders/*/T/podman/podman-machine-default-api.sock 2>/dev/null | head -1 || true)"
  [[ -n "$sock" ]] && export DOCKER_HOST="unix://${sock}"
elif command -v podman >/dev/null 2>&1; then
  if ! docker info >/dev/null 2>&1; then
    podman machine start podman-machine-default >/dev/null 2>&1 || true
    sleep 2
  fi
  sock="$(ls /var/folders/*/T/podman/podman-machine-default-api.sock 2>/dev/null | head -1 || true)"
  [[ -n "$sock" ]] && export DOCKER_HOST="unix://${sock}"
fi

if ! docker info >/dev/null 2>&1; then
  echo "ERROR: container runtime not ready. Run: podman machine start" >&2
  exit 1
fi

cd "$SITE"
export PORT

COMPOSE_FILE="docker-compose.yml"
if [[ "$MODE" == "build" ]]; then
  COMPOSE_FILE="docker/docker-compose.build.yml"
fi

PROJECT="css-$(basename "$SITE" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g')"

if [[ "$ACTION" == "down" ]]; then
  docker compose -p "$PROJECT" -f "$COMPOSE_FILE" down
  echo "Stopped: $PROJECT"
  exit 0
fi

echo "Site:    $SITE"
echo "Mode:    $MODE"
echo "URL:     http://localhost:${PORT}"
echo "Project: $PROJECT"
docker compose -p "$PROJECT" -f "$COMPOSE_FILE" up --build -d
echo
echo "Preview ready → http://localhost:${PORT}"
echo "Logs:  docker compose -p $PROJECT -f $COMPOSE_FILE logs -f"
echo "Stop:  $0 \"$SITE\" --down"
