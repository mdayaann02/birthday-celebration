#!/usr/bin/env bash
# deploy-oracle.sh - One-Command Automated Setup for Oracle Cloud Free Tier
set -e

echo "=========================================================="
echo "✨ Deploying Celebration Studio on Oracle Cloud Free Tier ✨"
echo "=========================================================="

# 1. Update system & install Node.js 20, npm, git, ufw
sudo apt-get update -y
sudo apt-get install -y curl git ufw

if ! command -v node &> /dev/null; then
  echo "Installing Node.js 20 LTS..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# 2. Install PM2 process manager globally
sudo npm install -g pm2

# 3. Configure firewall in Ubuntu to allow HTTP, HTTPS, and Port 3000
echo "Opening firewall ports (80, 443, 3000)..."
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT || true
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT || true
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 3000 -j ACCEPT || true
sudo netfilter-persistent save 2>/dev/null || true

# 4. Install project dependencies & build frontend
echo "Building project..."
npm install
npm run build

# 5. Start / Restart server with PM2
echo "Starting Celebration Studio with PM2..."
pm2 stop celebration-studio 2>/dev/null || true
pm2 start server/index.js --name "celebration-studio" -i max
pm2 save
pm2 startup systemd -u $USER --hp $HOME 2>/dev/null || true

echo "=========================================================="
echo "✅ Celebration Studio is LIVE and running 24/7!"
echo "Server URL: http://$(curl -s ifconfig.me):3000"
echo "=========================================================="
