FROM node AS base
WORKDIR /app

COPY ./package.json /app/package.json
RUN npm install --production

ENV NODE_OPTIONS="--enable-source-maps"
ENTRYPOINT ["npm", "-s", "run"]
CMD ["test:one"]

COPY ./esm-test /app/esm-test

# vim: filetype=dockerfile
