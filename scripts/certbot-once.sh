#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: $(basename "$0") <email> <domain1> [domain2 ...]" >&2
  exit 1
fi

EMAIL=$1
shift
DOMAINS=("$@")

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CERTBOT_CONF_DIR="${PROJECT_ROOT}/docker/certbot/conf"
CERTBOT_WWW_DIR="${PROJECT_ROOT}/docker/certbot/www"

mkdir -p "$CERTBOT_CONF_DIR" "$CERTBOT_WWW_DIR"

DOMAIN_FLAGS=()
for domain in "${DOMAINS[@]}"; do
  DOMAIN_FLAGS+=("-d" "$domain")
done

if [[ ${CERTBOT_STAGING:-0} -eq 1 ]]; then
  DOMAIN_FLAGS+=("--staging")
fi

docker run --rm \
  -v "${CERTBOT_CONF_DIR}:/etc/letsencrypt" \
  -v "${CERTBOT_WWW_DIR}:/var/www/certbot" \
  certbot/certbot:latest certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  "${DOMAIN_FLAGS[@]}"

echo "Certificate request complete. Reloading nginx to pick up new files..."
docker compose exec nginx nginx -s reload
