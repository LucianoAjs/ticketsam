FROM node:16.14.0-alpine AS base

RUN npm install -g create-react-app

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --force

COPY . .

EXPOSE 3001

CMD [ "npm", "run start:prod"]


