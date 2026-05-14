"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";

import {
  Cpu,
  HardDrive,
  MemoryStick,
  Database,
  Activity
} from "lucide-react";

export default function Dashboard() {

  const [metrics, setMetrics] = useState<any>({});
  const [services, setServices] = useState<any[]>([]);
  const [mysql, setMysql] = useState<any>({});
  const [nginx, setNginx] = useState<any>({});

  useEffect(() => {

    const fetchData = async () => {

      try {

        const metricsRes = await API.get("/metrics");
        const servicesRes = await API.get("/services");
        const mysqlRes = await API.get("/mysql-metrics");
        const nginxRes = await API.get("/nginx-metrics");

        setMetrics(metricsRes.data);
        setServices(servicesRes.data);
        setMysql(mysqlRes.data);
        setNginx(nginxRes.data);

      } catch (err) {

        console.log(err);

      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-10 text-cyan-400">
        AI Monitor Dashboard
      </h1>

      {/* SYSTEM METRICS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-zinc-900 rounded-2xl p-6 border border-cyan-500">

          <div className="flex justify-between items-center">

            <h2 className="text-xl">
              CPU Usage
            </h2>

            <Cpu className="text-cyan-400" />

          </div>

          <p className="text-5xl mt-6 text-cyan-400">
            {metrics.cpu || 0}%
          </p>

        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-purple-500">

          <div className="flex justify-between items-center">

            <h2 className="text-xl">
              RAM Usage
            </h2>

            <MemoryStick className="text-purple-400" />

          </div>

          <p className="text-5xl mt-6 text-purple-400">
            {metrics.ram || 0}%
          </p>

        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-green-500">

          <div className="flex justify-between items-center">

            <h2 className="text-xl">
              Disk Usage
            </h2>

            <HardDrive className="text-green-400" />

          </div>

          <p className="text-5xl mt-6 text-green-400">
            {metrics.disk || 0}%
          </p>

        </div>

      </div>

      {/* MYSQL */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <div className="bg-zinc-900 rounded-2xl p-6 border border-yellow-500">

          <div className="flex justify-between items-center">

            <h2 className="text-xl">
              MySQL Connections
            </h2>

            <Database className="text-yellow-400" />

          </div>

          <p className="text-5xl mt-6 text-yellow-400">
            {mysql.connections || 0}
          </p>

        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-red-500">

          <div className="flex justify-between items-center">

            <h2 className="text-xl">
              Slow Queries
            </h2>

            <Database className="text-red-400" />

          </div>

          <p className="text-5xl mt-6 text-red-400">
            {mysql.slow_queries || 0}
          </p>

        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-cyan-500">

          <div className="flex justify-between items-center">

            <h2 className="text-xl">
              Total Queries
            </h2>

            <Database className="text-cyan-400" />

          </div>

          <p className="text-5xl mt-6 text-cyan-400">
            {mysql.total_queries || 0}
          </p>

        </div>

      </div>

      {/* NGINX */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <div className="bg-zinc-900 rounded-2xl p-6 border border-orange-500">

          <div className="flex justify-between items-center">

            <h2 className="text-xl">
              Active Connections
            </h2>

            <Activity className="text-orange-400" />

          </div>

          <p className="text-5xl mt-6 text-orange-400">
            {nginx.active_connections || 0}
          </p>

        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-pink-500">

          <div className="flex justify-between items-center">

            <h2 className="text-xl">
              Total Requests
            </h2>

            <Activity className="text-pink-400" />

          </div>

          <p className="text-5xl mt-6 text-pink-400">
            {nginx.requests || 0}
          </p>

        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-blue-500">

          <div className="flex justify-between items-center">

            <h2 className="text-xl">
              Waiting Connections
            </h2>

            <Activity className="text-blue-400" />

          </div>

          <p className="text-5xl mt-6 text-blue-400">
            {nginx.waiting || 0}
          </p>

        </div>

      </div>

      {/* SERVICES */}

      <div className="mt-10 bg-zinc-900 rounded-2xl p-6 border border-zinc-700">

        <h2 className="text-3xl mb-6 text-cyan-400">
          Services Status
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b border-zinc-700 text-left">

              <th className="pb-4">Service</th>
              <th className="pb-4">Status</th>

            </tr>

          </thead>

          <tbody>

  {services.map((service, index) => (

    <tr
      key={index}
      className="border-b border-zinc-800"
    >

      <td className="py-4">
        {service.name}
      </td>

      <td className="py-4">

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            service.status === "active"

              ? "bg-green-500/20 text-green-400"

              : service.status === "failed"

              ? "bg-red-500/20 text-red-400"

              : service.status === "inactive"

              ? "bg-yellow-500/20 text-yellow-400"

              : "bg-zinc-500/20 text-zinc-300"
          }`}
        >
          {service.status}
        </span>

      </td>

    </tr>

  ))}

          </tbody>
        </table>

      </div>

    </div>
  );
}
