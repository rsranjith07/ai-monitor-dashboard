export default function ReadmePage() {
  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-cyan-400 mb-10">
        AI Monitor Dashboard Documentation
      </h1>

      {/* Project Overview */}

      <section className="mb-10 bg-zinc-900 p-8 rounded-2xl border border-cyan-500">

        <h2 className="text-3xl text-cyan-300 mb-6">
          Project Overview
        </h2>

        <p className="text-lg text-zinc-300 leading-8">
          AI Monitor Dashboard is a real-time Linux monitoring and
          DevOps onboarding platform built using FastAPI and Next.js.
        </p>

        <ul className="list-disc ml-8 mt-6 text-zinc-300 space-y-2">
          <li>CPU Monitoring</li>
          <li>RAM Monitoring</li>
          <li>Disk Monitoring</li>
          <li>MySQL Monitoring</li>
          <li>Linux Service Monitoring</li>
          <li>Dynamic Installation Scripts</li>
          <li>User Guidance Support</li>
        </ul>

      </section>

      {/* Prerequisites */}

      <section className="mb-10 bg-zinc-900 p-8 rounded-2xl border border-cyan-500">

        <h2 className="text-3xl text-cyan-300 mb-6">
          Prerequisites
        </h2>

        <pre className="bg-black p-6 rounded-xl text-green-400">

{`Ubuntu 22.04 / 24.04

Git

Python 3

Node.js

npm

MySQL
`}

        </pre>

      </section>

      {/* Backend Setup */}

      <section className="mb-10 bg-zinc-900 p-8 rounded-2xl border border-cyan-500">

        <h2 className="text-3xl text-cyan-300 mb-6">
          Backend Setup
        </h2>

        <pre className="bg-black p-6 rounded-xl text-green-400 overflow-auto">

{`mkdir backend

cd backend

python3 -m venv venv

source venv/bin/activate

pip install fastapi

pip install uvicorn

pip install psutil

pip install mysql-connector-python

pip install requests

uvicorn main:app --reload
`}

        </pre>

      </section>

      {/* Frontend Setup */}

      <section className="mb-10 bg-zinc-900 p-8 rounded-2xl border border-cyan-500">

        <h2 className="text-3xl text-cyan-300 mb-6">
          Frontend Setup
        </h2>

        <pre className="bg-black p-6 rounded-xl text-green-400 overflow-auto">

{`npx create-next-app@latest frontend

cd frontend

npm install

npm install axios

npm install lucide-react

npm run dev
`}

        </pre>

      </section>

      {/* MySQL Setup */}

      <section className="mb-10 bg-zinc-900 p-8 rounded-2xl border border-cyan-500">

        <h2 className="text-3xl text-cyan-300 mb-6">
          MySQL Setup
        </h2>

        <pre className="bg-black p-6 rounded-xl text-green-400 overflow-auto">

{`sudo apt update

sudo apt install mysql-server mysql-client -y

sudo systemctl enable mysql

sudo systemctl start mysql

mysql -u root -p

CREATE USER 'monitor'@'localhost'
IDENTIFIED BY 'monitor123';

GRANT PROCESS,
REPLICATION CLIENT
ON *.*
TO 'monitor'@'localhost';

FLUSH PRIVILEGES;
`}

        </pre>

      </section>

      {/* Backend Service */}

      <section className="mb-10 bg-zinc-900 p-8 rounded-2xl border border-cyan-500">

        <h2 className="text-3xl text-cyan-300 mb-6">
          Backend Systemd Service
        </h2>

        <pre className="bg-black p-6 rounded-xl text-green-400 overflow-auto">

{`sudo nano /etc/systemd/system/ai-dashboard-backend.service

sudo systemctl daemon-reload

sudo systemctl enable ai-dashboard-backend

sudo systemctl restart ai-dashboard-backend
`}

        </pre>

      </section>

      {/* Frontend Service */}

      <section className="mb-10 bg-zinc-900 p-8 rounded-2xl border border-cyan-500">

        <h2 className="text-3xl text-cyan-300 mb-6">
          Frontend Systemd Service
        </h2>

        <pre className="bg-black p-6 rounded-xl text-green-400 overflow-auto">

{`sudo nano /etc/systemd/system/ai-dashboard-frontend.service

sudo systemctl daemon-reload

sudo systemctl enable ai-dashboard-frontend

sudo systemctl restart ai-dashboard-frontend
`}

        </pre>

      </section>

      {/* APIs */}

      <section className="mb-10 bg-zinc-900 p-8 rounded-2xl border border-cyan-500">

        <h2 className="text-3xl text-cyan-300 mb-6">
          API Endpoints
        </h2>

        <pre className="bg-black p-6 rounded-xl text-green-400">

{`http://localhost:8000/metrics

http://localhost:8000/mysql-metrics

http://localhost:8000/services
`}

        </pre>

      </section>

      {/* Dynamic Routes */}

      <section className="mb-10 bg-zinc-900 p-8 rounded-2xl border border-cyan-500">

        <h2 className="text-3xl text-cyan-300 mb-6">
          Dynamic Installation Routes
        </h2>

        <pre className="bg-black p-6 rounded-xl text-green-400">

{`/fresh-system-setup

/docker-installation

/readme
`}

        </pre>

      </section>

      {/* Troubleshooting */}

      <section className="bg-zinc-900 p-8 rounded-2xl border border-red-500">

        <h2 className="text-3xl text-red-400 mb-6">
          Troubleshooting
        </h2>

        <pre className="bg-black p-6 rounded-xl text-yellow-400 overflow-auto">

{`systemctl status ai-dashboard-backend

systemctl status ai-dashboard-frontend

systemctl status mysql

lsof -i :8000

lsof -i :3000

pkill -f uvicorn

sudo systemctl restart ai-dashboard-backend

sudo systemctl restart ai-dashboard-frontend

systemctl list-units --type=service --all
`}

        </pre>

      </section>

    </div>
  );
}
