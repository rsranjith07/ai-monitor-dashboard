#!/bin/bash

echo "===================================="
echo "AI Monitor Dashboard Setup Started"
echo "===================================="

sudo apt update

sudo apt upgrade -y

echo "Installing Git..."
sudo apt install git -y

echo "Installing Curl..."
sudo apt install curl -y

echo "Installing Python..."
sudo apt install python3 python3-pip python3-venv -y

echo "Installing NodeJS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y

echo "Installing MySQL..."
sudo apt install mysql-server mysql-client -y

sudo systemctl enable mysql
sudo systemctl start mysql

echo "Installing Required Packages..."
sudo apt install nginx -y

echo "Cloning Project..."

git clone https://github.com/rsranjith07/ai-monitor-dashboard.git

cd ai-monitor-dashboard

echo "===================================="
echo "Backend Setup"
echo "===================================="

cd backend

python3 -m venv venv

source venv/bin/activate

pip install fastapi
pip install uvicorn
pip install psutil
pip install mysql-connector-python
pip install requests

echo "===================================="
echo "Frontend Setup"
echo "===================================="

cd ../frontend

npm install

echo "===================================="
echo "Creating Backend Service"
echo "===================================="

sudo tee /etc/systemd/system/ai-dashboard-backend.service > /dev/null <<EOF
[Unit]
Description=AI Monitor Backend
After=network.target

[Service]
User=$USER
WorkingDirectory=$HOME/ai-monitor-dashboard/backend
ExecStart=$HOME/ai-monitor-dashboard/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
EOF

echo "===================================="
echo "Creating Frontend Service"
echo "===================================="

sudo tee /etc/systemd/system/ai-dashboard-frontend.service > /dev/null <<EOF
[Unit]
Description=AI Dashboard Frontend
After=network.target

[Service]
User=$USER
WorkingDirectory=$HOME/ai-monitor-dashboard/frontend
ExecStart=/usr/bin/npm run dev
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload

sudo systemctl enable ai-dashboard-backend
sudo systemctl enable ai-dashboard-frontend

sudo systemctl restart ai-dashboard-backend
sudo systemctl restart ai-dashboard-frontend

echo "===================================="
echo "MYSQL MONITOR USER"
echo "===================================="

sudo mysql <<EOF
CREATE USER IF NOT EXISTS 'monitor'@'localhost'
IDENTIFIED BY 'monitor123';

GRANT PROCESS,
REPLICATION CLIENT
ON *.*
TO 'monitor'@'localhost';

FLUSH PRIVILEGES;
EOF

echo "===================================="
echo "Verification"
echo "===================================="

systemctl status ai-dashboard-backend --no-pager

systemctl status ai-dashboard-frontend --no-pager

systemctl status mysql --no-pager

echo ""

echo "Frontend URL:"
echo "http://localhost:3000"

echo ""

echo "Backend URL:"
echo "http://localhost:8000"

echo ""

echo "API Endpoints:"
echo "http://localhost:8000/metrics"
echo "http://localhost:8000/mysql-metrics"
echo "http://localhost:8000/nginx-metrics"
echo "http://localhost:8000/services"

echo ""

echo "Setup Completed Successfully"
