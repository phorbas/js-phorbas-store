import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {kbc_pouchdb} from '@phorbas/store/esm/nosql/pouchdb.js'
import PouchDB from 'pouchdb'
import pouchdb_memory from 'pouchdb-adapter-memory'

import { couch_hosts } from './_integ_couch_hosts.mjs'


test_bdd.describe('PouchDB in-memory', () => {
  PouchDB.plugin(pouchdb_memory)

  validate_backend(test_bdd,
    'pouchdb in-memory', {

    kbc_create: ctx => kbc_pouchdb(
      ctx.client = new PouchDB('phorbas_test', {adapter: 'memory'})),

    kbc_cleanup: ctx => ctx.client.close(),
  })

  validate_backend(test_bdd,
    'pouchdb in-memory (immutable)', {

    kbc_create: ctx => kbc_pouchdb(
      ctx.client = new PouchDB('phorbas_immutable_test', {adapter: 'memory'}),
      {immutable: true}),

    kbc_cleanup: ctx => ctx.client.close(),
  })
})

test_bdd.describe('PouchDB with hosts', () => {
  for (const host of couch_hosts) {
    validate_backend(test_bdd,
      `${host} with PouchDB`, {

      kbc_create: ctx => kbc_pouchdb(
        ctx.client = new PouchDB(`${host}/pouchdb_phorbas_test`)),

      blah_kbc_cleanup: ctx => ctx.client.close(),
    })

    validate_backend(test_bdd,
      `${host} with path and PouchDB`, {

      kbc_create: ctx => kbc_pouchdb(
        ctx.client = new PouchDB(`${host}/pouchdb_phorbas_test`),
        {path:'/a/b/c'}),

      kbc_cleanup: ctx => ctx.client.close(),
    })

  }
})
