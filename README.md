# Node.js API CI/CD Demo 🚀

API **Express** + **MongoDB**, packagée avec **Docker Compose** et publiée sur **GHCR** via **GitHub Actions**.

---

## Lancer en local (Docker Compose)

```bash
# démarrer l’API + MongoDB
docker compose up -d

# tester l’API
curl http://localhost:3000/
curl -X POST http://localhost:3000/notes -H "Content-Type: application/json" -d '{"text":"hello"}'

# arrêter les conteneurs
docker compose down

Utiliser l’image publique (depuis GHCR)
# 1) créer un réseau Docker partagé
docker network create demo-net

# 2) lancer MongoDB dans ce réseau
docker run -d --name mongo --network demo-net mongo:6

# 3) lancer l’API depuis l’image GHCR
docker run --rm --name api-ghcr \
  --network demo-net \
  -e MONGO_URI="mongodb://mongo:27017/demo" \
  -p 3000:3000 \
  ghcr.io/gaidaahmed/nodejs-api-cicd-demo:latest

# 4) tester
curl http://localhost:3000/
curl -X POST http://localhost:3000/notes -H "Content-Type: application/json" -d '{"text":"depuis GHCR"}'

# 5) nettoyage
docker rm -f mongo
docker network rm demo-net


Tests (Jest)
# lancer uniquement Mongo
docker compose up -d mongo

# exécuter les tests Jest
MONGO_URI=mongodb://localhost:27017/test npm test

# arrêter les conteneurs
docker compose down


CI/CD
![CI/CD](https://github.com/gaidaahmed/nodejs-api-cicd-demo/actions/workflows/ci-cd.yml/badge.svg)
