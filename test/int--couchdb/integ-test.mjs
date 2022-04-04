import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import {bkc_with_couchdb} from '@phorbas/store/esm/node/couchdb.mjs'

const nano_conn = require('nano')

const _host_list = [
  'http://admin:please@some_couchdb_v2:5984',
  'http://admin:please@some_couchdb_v3:5984',
]

for (const host of _host_list) {

  validate_backend(
    `${host} with nano couchdb driver`,
    async ctx =>
      bkc_with_couchdb( nano_conn(host),
        {database: 'phorbas_test'}) )
}

