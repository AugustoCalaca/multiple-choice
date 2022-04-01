FROM node:16.14-alpine as build

WORKDIR /app
COPY yarn.lock .
COPY package.json .
COPY packages/babel-server/package.json packages/babel-server/package.json
COPY packages/graphql/package.json packages/graphql/package.json
COPY packages/server/package.json packages/server/package.json

RUN yarn --frozen-lockfile --ignore-scripts --no-interactive

COPY packages/server ./packages/server
COPY packages/graphql ./packages/graphql
RUN ls -a packages/server

RUN yarn workspace @multiple-choice/graphql build:js
RUN yarn workspace @multiple-choice/server build

FROM node:16.14-alpine

WORKDIR /app
COPY yarn.lock .
COPY package.json .
COPY --from=build packages/graphql/package.json packages/graphql/package.json
COPY --from=build packages/graphql/dist packages/graphql/dist

COPY --from=build packages/server/package.json packages/server/package.json
COPY --from=build packages/server/dist packages/server/dist
COPY --from=build packages/server/schema packages/server/schema
COPY --from=build packages/server/.env.example packages/server/.env.example
COPY --from=build packages/server/.env.local packages/server/.env

RUN ls -a packages/server
RUN yarn --prod --frozen-lockfile --ignore-scripts --no-interactive
EXPOSE 5050

CMD yarn server:start