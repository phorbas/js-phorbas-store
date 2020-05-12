FROM node:14-stretch-slim as base
WORKDIR /app

# RUN npm install ...

COPY ./cjs/ /app/cjs/
# COPY ./esm/ /app/esm/

CMD [ "/usr/local/bin/node", "/app/cjs/integ-test.cjs" ]

# vim: filetype=dockerfile
