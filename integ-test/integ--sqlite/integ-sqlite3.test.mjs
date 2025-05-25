import * as test_bdd from 'node:test'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {kbc_with_sqlite3} from '@phorbas/store/esm/sql/sqlite3.js'

import sqlite3 from 'sqlite3'


validate_backend(test_bdd,
  `direct sqlite3(:memory:)`,
  { 
    async kbc_create(ctx) {
      await new Promise((resolve, reject) => 
        ctx.db = new sqlite3.Database(':memory:',
          err => err ? reject(err) : resolve() ) )

      return kbc_with_sqlite3(ctx.db)
    },

    kbc_cleanup: ctx => ctx.db.close(),
  })


validate_backend(test_bdd,
  `direct sqlite3(file)`,
  { 
    async kbc_create(ctx) {
      const base = await mkdtemp(`${tmpdir()}/var-test-knex-sql--`)
      await new Promise((resolve, reject) => 
        ctx.db = new sqlite3.Database(
          `${base}/db.sqlite3`,
          err => err ? reject(err) : resolve() ) )

      return kbc_with_sqlite3(ctx.db)
    },

    kbc_cleanup: ctx => ctx.db.close(),
  })




validate_backend(test_bdd,
  `direct sqlite3(:memory:) (immutable)`,
  { 
    async kbc_create(ctx) {
      await new Promise((resolve, reject) => 
        ctx.db = new sqlite3.Database(':memory:',
          err => err ? reject(err) : resolve() ) )

      return kbc_with_sqlite3(ctx.db, {immutable: true})
    },

    kbc_cleanup: ctx => ctx.db.close(),
  })


validate_backend(test_bdd,
  `direct sqlite3(file) (immutable)`,
  { 
    async kbc_create(ctx) {
      const base = await mkdtemp(`${tmpdir()}/var-test-knex-sql--`)
      await new Promise((resolve, reject) => 
        ctx.db = new sqlite3.Database(
          `${base}/db.sqlite3`,
          err => err ? reject(err) : resolve() ) )

      return kbc_with_sqlite3(ctx.db, {immutable: true})
    },

    kbc_cleanup: ctx => ctx.db.close(),
  })


