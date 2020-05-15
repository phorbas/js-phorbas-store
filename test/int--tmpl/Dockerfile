FROM node:14-stretch-slim as base
WORKDIR /app

COPY ./integ-package.json /app/package.json
RUN npm install

RUN mkdir -p \
      /var/phorbas/ \
  ;

COPY ./cjs/ /app/cjs/

CMD npm -s test

# vim: filetype=dockerfile
