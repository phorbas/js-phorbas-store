import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_pouchdb} from '@phorbas/store/esm/nosql/pouchdb.js'
import PouchDB from 'pouchdb'

import { couch_hosts } from './_integ_couch_hosts.mjs'

for (const host of couch_hosts) {
  validate_backend(test_bdd,
    `${host} with PouchDB`, {

    bkc_create: ctx => bkc_pouchdb(
      ctx.client = new PouchDB(`${host}/pouchdb_phorbas_test`)),

    blah_bkc_cleanup: ctx => ctx.client.close(),
  })

  validate_backend(test_bdd,
    `${host} with path and PouchDB`, {

    bkc_create: ctx => bkc_pouchdb(
      ctx.client = new PouchDB(`${host}/pouchdb_phorbas_test`),
      {path:'/a/b/c'}),

    bkc_cleanup: ctx => ctx.client.close(),
  })

}
