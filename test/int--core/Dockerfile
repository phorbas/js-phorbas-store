FROM node:16-stretch-slim as base
WORKDIR /app

COPY ./integ-package.json /app/package.json
RUN npm install

COPY ./cjs/ /app/cjs/
COPY ./esm/ /app/esm/

CMD npm -s test

# vim: filetype=dockerfile
