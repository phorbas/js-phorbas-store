FROM node:22-bookworm-slim AS base
WORKDIR /app

### For pg-native installation
## FROM node:16 as base
## ...
## RUN apt-get update
## RUN apt-get install -y postgresql libpq-dev
## RUN apt-get install -y node-gyp

COPY ./integ-package.json /app/package.json
RUN npm install

COPY ./cjs/ /app/cjs/

CMD npm -s test

# vim: filetype=dockerfile
