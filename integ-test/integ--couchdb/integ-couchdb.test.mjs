import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {kbc_couchdb} from '@phorbas/store/esm/nosql/couchdb.js'
import nano_conn from 'nano'

import { couch_hosts } from './_integ_couch_hosts.mjs'

test_bdd.describe('Nano CouchDB with hsots', () => {

  for (const host of couch_hosts) {
    validate_backend(test_bdd,
      `${host} with Nano CouchDB driver`,
      ctx => kbc_couchdb(
          ctx.client = nano_conn(host),
          {database: 'nano_phorbas_test'}) )

    validate_backend(test_bdd,
      `${host} with path and Nano CouchDB driver`,
      ctx => kbc_couchdb(
        ctx.client = nano_conn(host),
        {path:'/a/b/c', database: 'nano_phorbas_test'}) )
  }
})
