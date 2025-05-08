# SIT323 – Task 9.1P  
## Adding a Database to Your Microservice Application  

---

## Overview

This project demonstrates how to integrate a **MongoDB database** into a **containerized Node.js microservice application** and deploy it using both **Docker Compose** (for local development) and **Kubernetes** (for production-ready deployment).

---

## Tools Used

| Tool            | Description                                       |
|-----------------|---------------------------------------------------|
| Node.js         | Backend JavaScript runtime                        |
| Express.js      | Web application framework                         |
| MongoDB         | NoSQL database                                    |
| Docker          | Containerization platform                         |
| Docker Compose  | Multi-container orchestration                     |
| Kubernetes      | Cluster orchestration for scalable deployments    |
| kubectl         | CLI tool for managing Kubernetes clusters         |
| Git             | Version control                                   |
| VS Code         | Code editor with Docker and Kubernetes extensions |

---

## Instructions (as per task sheet)

1. **Install MongoDB into the Kubernetes cluster**, either as a standalone instance or a replica set.
2. **Create a MongoDB user** with appropriate permissions for your application.
3. **Configure persistent storage** by creating a Persistent Volume and Persistent Volume Claim.
4. **Create a Kubernetes Secret** to store MongoDB credentials and reference them in the deployment.
5. **Update the Kubernetes deployment manifest** for your application to connect to the database.
6. **Configure the app** using the MongoDB client and use the connection string from the manifest.
7. **Test the deployment** to ensure connection and CRUD operations are working.
8. **Set up backups** and **disaster recovery** strategies (e.g., mongodump).
9. **Monitor MongoDB performance** to ensure efficient and smooth operation.

## NOTE
- If you are wanting to download the repository and use the files within this repository, you will need to
  update the mongodb-secret.yaml to add your specific user, password and URI

