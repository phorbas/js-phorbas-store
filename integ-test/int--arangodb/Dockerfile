FROM node:22-bookworm-slim AS base
WORKDIR /app

COPY ./integ-package.json /app/package.json
RUN npm install

COPY ./cjs/ /app/cjs/

CMD npm -s test

# vim: filetype=dockerfile
