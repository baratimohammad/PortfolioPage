#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CERTBOT_CONF_DIR="${PROJECT_ROOT}/docker/certbot/conf"
CERTBOT_WWW_DIR="${PROJECT_ROOT}/docker/certbot/www"

mkdir -p "$CERTBOT_CONF_DIR" "$CERTBOT_WWW_DIR"

# Ensure nginx is up so HTTP-01 challenges can be served during renewals
# without touching app containers.
docker compose up -d --no-deps nginx

docker run --rm \
  -v "${CERTBOT_CONF_DIR}:/etc/letsencrypt" \
  -v "${CERTBOT_WWW_DIR}:/var/www/certbot" \
  certbot/certbot:latest renew \
  --webroot \
  --webroot-path=/var/www/certbot

echo "Renewal check complete. Reloading nginx to pick up any updated certificates..."
docker compose exec nginx nginx -s reload
