import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import {bkc_with_pouchdb} from '@phorbas/store/esm/node/pouchdb.mjs'
import {bkc_with_couchdb} from '@phorbas/store/esm/node/couchdb.mjs'

const PouchDB = require('pouchdb')
const nano_conn = require('nano')

const _host_list = [
  'http://admin:please@some_couchdb_v2:5984',
  'http://admin:please@some_couchdb_v3:5984',
]

for (const host of _host_list) {
  validate_backend(
    `${host} with PouchDB`,
    async ctx =>
      bkc_with_pouchdb(
        new PouchDB(`${host}/pouchdb_phorbas_test`)) )

  validate_backend(
    `${host} with Nano CouchDB driver`,
    async ctx =>
      bkc_with_couchdb(
        nano_conn(host),
        {database: 'nano_phorbas_test'}) )

  validate_backend(
    `${host} with path and PouchDB`,
    async ctx =>
      bkc_with_pouchdb(
        new PouchDB(`${host}/pouchdb_phorbas_test`),
        {path:'/a/b/c'}) )

  validate_backend(
    `${host} with path and Nano CouchDB driver`,
    async ctx =>
      bkc_with_couchdb(
        nano_conn(host),
        {path:'/a/b/c', database: 'nano_phorbas_test'}) )
}

