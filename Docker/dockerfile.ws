FROM oven/bun:latest

WORKDIR /usr/src/app

COPY turbo.json ./turbo.json

COPY bun.lock ./bun.lock

COPY packages ./packages

COPY package.json ./package.json

COPY apps/ws/package.json ./apps/ws/package.json

RUN bun install

COPY apps/ws ./apps/ws

RUN bun run generate:db

EXPOSE 8081

CMD ["bun" , "run" , "start:ws"]