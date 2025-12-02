# Deployment Guide (Ubuntu 22.04)

This document captures the exact commands needed to provision and operate the portfolio stack (Next.js + nginx reverse proxy + certbot) on a fresh Ubuntu 22.04 host.

## 1. Install Docker Engine + Compose Plugin

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg lsb-release
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
# Optional: allow the current user to run Docker without sudo (log out/in afterwards)
sudo usermod -aG docker "$USER"
```

## 2. Clone the Repository

```bash
cd /opt
sudo git clone https://github.com/maxbarati/max-portfolio.git
sudo chown -R "$USER":"$USER" max-portfolio
cd max-portfolio
```

## 3. Create the `.env`

All runtime secrets live in `.env` (same directory as `docker-compose.yml`). Update the values before saving.

```bash
cat <<'EOF' > .env
NEXT_PUBLIC_SITE_URL=https://barati.tech
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=apikey-or-username
SMTP_PASS=super-secret-password
SMTP_FROM="Max Portfolio <hello@example.com>"
SMTP_TO=hello@example.com
# Optional Grafana admin bootstrap
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=super-secret
EOF
```

> Add any additional environment variables your deployment requires to this file.

## 4. Build and Start the Stack

```bash
docker compose pull      # optional, grabs newer base images
docker compose up -d --build
```

Services:
- `web`: Next.js app on internal port 3000
- `grafana`: Grafana on internal port 3000
- `nginx`: reverse-proxy entrypoint on host ports 80/443

## 5. Open the Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable    # skip if already enabled
sudo ufw status
```

## 6. Issue TLS Certificates with Certbot

The repo includes `scripts/certbot-once.sh`, which runs certbot in a disposable container and reloads nginx afterward. Replace the email + domains with your own (add both apex and `www` if used).

```bash
cd /opt/max-portfolio
./scripts/certbot-once.sh you@example.com barati.tech www.barati.tech grafana.barati.tech
# Use CERTBOT_STAGING=1 ./scripts/certbot-once.sh ... while testing to avoid rate limits
```

If you issue certificates manually, reload nginx when finished:

```bash
docker compose exec nginx nginx -s reload
```

## 7. Routine Updates

```bash
cd /opt/max-portfolio
git pull
docker compose build --no-cache
docker compose up -d
```

Run these commands whenever you deploy new code or want the latest base images.

## 8. Optional systemd Unit

Create a simple unit if you want the stack to start at boot:

```bash
sudo tee /etc/systemd/system/max-portfolio.service > /dev/null <<'EOF'
[Unit]
Description=Max Portfolio (Docker Compose)
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/max-portfolio
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now max-portfolio.service
```

With this unit in place, Docker (and therefore your stack) will restart automatically after host reboots.
