ARG NODE_IMAGE=node:lts-slim

FROM $NODE_IMAGE AS base
RUN apt update
RUN apt upgrade
RUN npm install -g pnpm
RUN mkdir /app

COPY . /tmp/app
WORKDIR /tmp/app
RUN pnpm install
RUN pnpm build
RUN mv build/* /app

COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml
COPY .env /app/.env

WORKDIR /app
RUN pnpm install --prod
RUN rm -rf /tmp/app

CMD [ "node", "/app/src/server.js" ]