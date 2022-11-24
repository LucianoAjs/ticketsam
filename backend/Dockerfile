# BASE
FROM node:16.14.0-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

EXPOSE 3001

FROM base AS production

ENV NODE_ENV=production

COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=base /usr/src/app/dist ./dist

RUN npm run build

CMD ["node", "dist/main"]



