from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil
import subprocess
import requests
import mysql.connector

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_mysql_metrics():

    try:

        connection = mysql.connector.connect(
            host="127.0.0.1",
            user="monitor",
            password="monitor123",
            port=3306
        )

        cursor = connection.cursor()

        cursor.execute(
            "SHOW STATUS LIKE 'Threads_connected';"
        )

        connections = cursor.fetchone()[1]

        cursor.execute(
            "SHOW STATUS LIKE 'Slow_queries';"
        )

        slow_queries = cursor.fetchone()[1]

        cursor.execute(
            "SHOW STATUS LIKE 'Queries';"
        )

        total_queries = cursor.fetchone()[1]

        return {
            "connections": connections,
            "slow_queries": slow_queries,
            "total_queries": total_queries
        }

    except Exception as e:

        return {
            "connections": 0,
            "slow_queries": 0,
            "total_queries": 0,
            "error": str(e)
        }


def get_nginx_metrics():

    try:

        response = requests.get(
            "http://127.0.0.1/nginx_status"
        )

        data = response.text.splitlines()

        active_connections = data[0].split()[-1]

        requests_count = data[2].split()[-1]

        rw = data[3].split()

        reading = rw[1]
        writing = rw[3]
        waiting = rw[5]

        return {

            "active_connections": active_connections,
            "requests": requests_count,
            "reading": reading,
            "writing": writing,
            "waiting": waiting

        }

    except Exception as e:

        return {

            "active_connections": 0,
            "requests": 0,
            "reading": 0,
            "writing": 0,
            "waiting": 0,
            "error": str(e)

        }


@app.get("/metrics")
def get_metrics():

    return {

        "cpu": psutil.cpu_percent(),
        "ram": psutil.virtual_memory().percent,
        "disk": psutil.disk_usage("/").percent

    }


@app.get("/mysql-metrics")
def mysql_metrics():

    return get_mysql_metrics()


@app.get("/nginx-metrics")
def nginx_metrics():

    return get_nginx_metrics()


@app.get("/services")
def get_services():

    result = []

    try:

        output = subprocess.check_output(
            [
                "systemctl",
                "list-units",
                "--type=service",
                "--all",
                "--no-pager",
                "--no-legend"
            ]
        ).decode()

        lines = output.splitlines()

        for line in lines:

            parts = line.split()

            if len(parts) >= 4:

                result.append({

                    "name": parts[0],
                    "status": parts[2]

                })

    except Exception as e:

        return {
            "error": str(e)
        }

    return result
