# ============================================================
# Galeri Ikan Cupang - Dockerfile multi-stage
# Tahap 1 membangun React, tahap 2 menyiapkan dependency Node,
# tahap 3 adalah image akhir yang ramping untuk dijalankan.
# ============================================================

# ---- Tahap 1: build frontend React ----
FROM node:22-alpine AS client-build
WORKDIR /client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# ---- Tahap 2: install dependency produksi server ----
FROM node:22-alpine AS server-deps
WORKDIR /server
COPY server/package*.json ./
RUN npm ci --omit=dev

# ---- Tahap 3: image runtime ----
FROM node:22-alpine
ARG APP_VERSION=dev
ENV NODE_ENV=production \
    PORT=3000 \
    APP_VERSION=${APP_VERSION} \
    DATA_FILE=/data/ikan.json \
    PUBLIC_DIR=/app/public

WORKDIR /app
COPY --from=server-deps /server/node_modules ./node_modules
COPY server/package.json ./
COPY server/src ./src
COPY --from=client-build /client/dist ./public

# Jalankan sebagai user non-root bawaan image node
RUN mkdir -p /data && chown node:node /data
USER node

EXPOSE 3000
VOLUME ["/data"]
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1
CMD ["node", "src/index.js"]
