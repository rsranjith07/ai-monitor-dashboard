export default function DockerInstallation() {

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-cyan-400 mb-8">

        Docker Installation

      </h1>

      <div className="bg-zinc-900 p-6 rounded-2xl border border-cyan-500">

        <h2 className="text-3xl mb-6 text-cyan-300">

          Docker Setup Steps

        </h2>

        <pre className="whitespace-pre-wrap text-green-400">

{`sudo apt update

sudo apt install docker.io -y

sudo systemctl enable docker

sudo systemctl start docker

docker --version

sudo usermod -aG docker $USER
`}

        </pre>

      </div>

    </div>

  );
}
