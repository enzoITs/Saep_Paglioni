FROM node:22-slim
WORKDIR /app

# Dependências do backend
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Dependências do frontend
COPY frontend/package.json frontend/package-lock.json frontend/
RUN npm --prefix frontend ci

# Código e build do Next.js
COPY . .
RUN npm --prefix frontend run build

ENV NODE_ENV=production
CMD ["node", "server.js"]
