FROM node:16-stretch-slim as base
WORKDIR /app

COPY ./integ-package.json /app/package.json
RUN npm install

COPY ./cjs/ /app/cjs/

# ENV http_proxy=http://mitmproxy:8080
CMD npm -s test

# vim: filetype=dockerfile
