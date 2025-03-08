FROM node:slim AS base
WORKDIR /app
ENV NODE_OPTIONS="--enable-source-maps"
CMD ["npm", "-s", "test"]

COPY ./integ-package.json /app/package.json
RUN npm install

COPY ./esm-test /app/test/

# vim: filetype=dockerfile
