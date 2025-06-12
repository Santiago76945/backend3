# Dockerfile (build offline)

FROM node:18-alpine
WORKDIR /app

# Copiamos lockfile y módulos ya instalados
COPY package*.json ./
COPY node_modules ./node_modules

# Copiamos el resto de la app
COPY src ./src
COPY .env ./

EXPOSE 8080
CMD ["node", "src/index.js"]
