import * as test_bdd from 'node:test'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_better_sqlite} from '@phorbas/store/esm/sql/better_sqlite3.js'

import BetterSQLite3Database from 'better-sqlite3'


validate_backend(test_bdd,
  `direct better-sqlite3(:memory:)`,
  { 
    async bkc_create(ctx) {
      ctx.db = new BetterSQLite3Database(':memory:')
      return bkc_better_sqlite(ctx.db)
    },

    bkc_cleanup: ctx => ctx.db.close(),
  })


validate_backend(test_bdd,
  `direct better-sqlite3(file)`,
  { 
    async bkc_create(ctx) {
      const base = await mkdtemp(`${tmpdir()}/var-test-knex-sql--`)
      ctx.db = new BetterSQLite3Database(`${base}/db.better.sqlite3`)
      return bkc_better_sqlite(ctx.db)
    },

    bkc_cleanup: ctx => ctx.db.close(),
  })




validate_backend(test_bdd,
  `direct better-sqlite3(:memory:) (immutable)`,
  { 
    async bkc_create(ctx) {
      ctx.db = new BetterSQLite3Database(':memory:')
      return bkc_better_sqlite(ctx.db, {immutable: true})
    },

    bkc_cleanup: ctx => ctx.db.close(),
  })


validate_backend(test_bdd,
  `direct better-sqlite3(file) (immutable)`,
  { 
    async bkc_create(ctx) {
      const base = await mkdtemp(`${tmpdir()}/var-test-knex-sql--`)
      ctx.db = new BetterSQLite3Database(`${base}/db.better.sqlite3`)
      return bkc_better_sqlite(ctx.db, {immutable: true})
    },

    bkc_cleanup: ctx => ctx.db.close(),
  })

