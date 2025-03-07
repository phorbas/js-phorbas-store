# vim: filetype=dockerfile
# use node:16 to allow use of Python for npm dependencies
FROM node:16 as base
WORKDIR /app

COPY ./integ-package.json /app/package.json
RUN npm install

RUN mkdir -p \
      /var/phorbas/bkc_sqlite \
      /var/phorbas/keyv_sqlite \
  ;

COPY ./cjs/ /app/cjs/

CMD npm -s test

# vim: filetype=dockerfile
