# Node.js API CI/CD Demo 🚀

API **Express** + **MongoDB**, packagée avec **Docker Compose** et publiée sur **GHCR** via **GitHub Actions**.

## Lancer en local (Docker Compose)

```bash
docker compose up -d
curl http://localhost:3000/
curl -X POST http://localhost:3000/notes -H "Content-Type: application/json" -d '{"text":"hello"}'
docker compose down

