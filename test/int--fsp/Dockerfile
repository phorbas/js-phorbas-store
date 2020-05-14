FROM node:14-stretch-slim as base
WORKDIR /app
ENV NODE_OPTIONS="--enable-source-maps"

RUN mkdir -p /app \
      /var/phorbas/bkc-fs \
      /var/phorbas/bkc-fsp

RUN echo '{"private": true}' > package.json \
 && npm install mocha

COPY ./cjs/ /app/cjs/
# COPY ./esm/ /app/esm/

CMD npx mocha /app/cjs/integ-test.cjs

# vim: filetype=dockerfile
