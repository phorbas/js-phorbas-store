# vim: filetype=dockerfile
# use 16-stretch to allow use of Python for npm dependencies
FROM node:16-stretch as base
WORKDIR /app

COPY ./integ-package.json /app/package.json
RUN npm install

RUN mkdir -p \
      /var/phorbas/ \
      /var/phorbas/test-lmdb \
  ;

COPY ./cjs/ /app/cjs/

CMD npm -s test

# vim: filetype=dockerfile
