FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM base AS final
COPY src ./src
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "src/index.js"]
