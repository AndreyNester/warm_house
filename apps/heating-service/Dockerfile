# --- build stage ---
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# --- production stage ---
FROM node:20-alpine AS production

WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

ENV PORT=8081
EXPOSE 8081

CMD ["node", "dist/main.js"]
