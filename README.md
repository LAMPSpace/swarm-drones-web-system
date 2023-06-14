# **Swarm Drone Websystem**
[![CI/CD](https://github.com/LAMPSpace/swarm-drones-web-system/actions/workflows/pineline.yaml/badge.svg?branch=master)](https://github.com/LAMPSpace/swarm-drones-web-system/actions/workflows/pineline.yaml)

**Web system for controlling swarm drones and monitoring their status.**

**[Swarm Drone Websystem](http://drones.svute.com)**

## **Getting Started**
### **Prerequisites**
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### **Installation**
1. Clone the repo
    ```sh
    git clone https://github.com/LAMPSpace/swarm-drones-web-system.git
    ```
2. WSL2: Get host IP address
    ```sh
    ip addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}'
    ```
3. WSL2: Add host IP address to Windows hosts file
    ```sh
    Example:
    172.23.221.7 drones.svute.test
    172.23.221.7 api-drones.svute.test
    ```
4. Copy .env.example to .env
    ```sh
    cp api/.env.example api/.env
    cp frontend/.env.example frontend/.env
    cp nginx/nginx.conf.example nginx/nginx.conf
    ```
5. Run docker-compose
    ```sh
    docker-compose up -d
    ```