export default function FreshSystemSetupPage() { 
 return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-cyan-400 mb-8">
        Fresh System Setup
      </h1>

      <div className="bg-zinc-900 p-8 rounded-xl mb-8">
        <h2 className="text-3xl font-bold mb-4 text-green-400">
          AI Monitor Dashboard Overview
        </h2>

        <p className="text-zinc-300 mb-4">
          AI Monitor Dashboard is a real-time Linux monitoring platform built using
          Next.js and FastAPI. It provides infrastructure monitoring, database
          monitoring and automatic Linux service discovery.
        </p>

        <h3 className="text-2xl text-cyan-400 mt-6 mb-4">Features</h3>

        <ul className="list-disc ml-8 space-y-2 text-zinc-300">
          <li>CPU Monitoring</li>
          <li>RAM Monitoring</li>
          <li>Disk Monitoring</li>
          <li>MySQL Monitoring</li>
          <li>Nginx Monitoring</li>
          <li>Linux Service Monitoring</li>
          <li>Automatic Service Discovery</li>
          <li>Dynamic Installation Script Support</li>
          <li>README Documentation</li>
        </ul>

        <h3 className="text-2xl text-cyan-400 mt-8 mb-4">Architecture</h3>

        <ul className="list-disc ml-8 space-y-2 text-zinc-300">
          <li>Frontend : Next.js</li>
          <li>Backend : FastAPI</li>
          <li>Database : MySQL</li>
          <li>Web Server : Nginx</li>
          <li>Service Manager : systemd</li>
        </ul>

        <h3 className="text-2xl text-cyan-400 mt-8 mb-4">Ports Used</h3>

        <ul className="list-disc ml-8 space-y-2 text-zinc-300">
          <li>Frontend Dashboard : 3000</li>
          <li>Backend API : 8000</li>
          <li>MySQL : 3306</li>
          <li>Nginx : 80</li>
          <li>Jenkins : 8080</li>
          <li>Node Exporter : 9100</li>
        </ul>

        <h3 className="text-2xl text-cyan-400 mt-8 mb-4">
          What This Script Installs
        </h3>

        <ul className="list-disc ml-8 space-y-2 text-zinc-300">
          <li>Git</li>
          <li>Curl</li>
          <li>Python3</li>
          <li>Python3-Pip</li>
          <li>Python3-Venv</li>
          <li>NodeJS</li>
          <li>npm</li>
          <li>MySQL Server</li>
          <li>MySQL Client</li>
          <li>Nginx</li>
          <li>FastAPI</li>
          <li>Uvicorn</li>
          <li>psutil</li>
          <li>mysql-connector-python</li>
          <li>requests</li>
        </ul>

        <h3 className="text-2xl text-cyan-400 mt-8 mb-4">
          Installation Steps
        </h3>

        <ol className="list-decimal ml-8 space-y-2 text-zinc-300">
          <li>Create setup-ai-monitor-dashboard.sh</li>
          <li>Paste the installation script below</li>
          <li>Save the file</li>
          <li>Run chmod +x setup-ai-monitor-dashboard.sh</li>
          <li>Execute ./setup-ai-monitor-dashboard.sh</li>
          <li>Verify services and dashboard access</li>
        </ol>

        <pre className="bg-black text-green-400 p-6 rounded-lg overflow-x-auto whitespace-pre-wrap break-words">
{`nano setup-ai-monitor-dashboard.sh

chmod +x setup-ai-monitor-dashboard.sh

./setup-ai-monitor-dashboard.sh`}
        </pre>
      </div>

      <div className="bg-zinc-900 p-8 rounded-xl mb-8">
  <h2 className="text-3xl font-bold mb-4 text-green-400">
    Installation Script
  </h2>

  <textarea
    readOnly
    className="w-full h-[2500px] bg-black text-green-400 p-6 rounded-lg font-mono text-sm"
    defaultValue={`#!/bin/bash

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
`}
  />
</div>

</div>

);
}
