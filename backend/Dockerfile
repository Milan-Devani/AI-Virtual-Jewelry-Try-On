FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig*.json ./
RUN npm install

COPY src ./src
COPY tests ./tests
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=10000

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

RUN mkdir -p uploads && chown -R node:node /app

USER node

EXPOSE 10000

CMD ["node", "dist/server.js"]
