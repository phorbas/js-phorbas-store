import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_keyv from '@phorbas/store/esm/node/keyv.mjs'
import bkc_with_sqlite3 from '@phorbas/store/esm/node/sqlite3.mjs'
import bkc_with_knex from '@phorbas/store/esm/node/knex.mjs'

const Keyv = require('keyv')
const KeySQLite = require('@keyv/sqlite')

const sqlite3 = require('sqlite3')
const knex = require('knex')


validate_backend(`keyv with Map()`, ()=>
  bkc_with_keyv(
    new Keyv({ store: new Map() })
  ))

validate_backend(`keyv with @keyv/sqlite`, ()=>
  bkc_with_keyv(
    new Keyv(
      `sqlite:///var/phorbas/keyv_sqlite/db.sqlite`,
      {table: 'phorbas_keyv'})
  ))


validate_backend(
  `sqlite(:memory:)`,
  { 
    async create(ctx) {
      await new Promise((resolve, reject) => 
        ctx.db = new sqlite3.Database(':memory:',
          err => err ? reject(err) : resolve() ) )

      return bkc_with_sqlite3(ctx.db)
    },

    done: ctx => ctx.db.close() })


validate_backend(
  `sqlite(file)`,
  { 
    async create(ctx) {
      await new Promise((resolve, reject) => 
        ctx.db = new sqlite3.Database(
          '/var/phorbas/bkc_sqlite/db.sqlite',
          err => err ? reject(err) : resolve() ) )

      return bkc_with_sqlite3(ctx.db)
    },

    done: ctx => ctx.db.close() })


validate_backend(
  `sqlite(:memory:) with knex`,
  { 
    create: ctx =>
      bkc_with_knex(
        ctx.kdb = knex({
          client: 'sqlite3',
          connection: {
            filename: ':memory:',
          },
          useNullAsDefault: true }) ),

    done: ctx => ctx.kdb.destroy(),
  })


validate_backend(
  `sqlite(file) with knex`,
  { 
    create: ctx =>
      bkc_with_knex(
        ctx.kdb = knex({
          client: 'sqlite3',
          connection: {
            filename: '/var/phorbas/bkc_sqlite/knex_db.sqlite',
          },
          useNullAsDefault: true }) ),

    done: ctx => ctx.kdb.destroy(),
  })

