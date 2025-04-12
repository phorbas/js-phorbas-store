import * as test_bdd from 'node:test'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_with_knex} from '@phorbas/store/esm/sql/knex.js'
import knex from 'knex'


_describe_knex_sqlite_using('sqlite3')
_describe_knex_sqlite_using('better-sqlite3')

function _describe_knex_sqlite_using(client) {
  test_bdd.describe(`knex sqlite using "${client}" client`, () => {

    validate_backend(test_bdd,
      `knex ${client}(:memory:) with knex`,
      { 
        async bkc_create(ctx) {
          ctx.kdb = knex({ client,
            connection: { filename: ':memory:' },
            useNullAsDefault: true })
          return bkc_with_knex(ctx.kdb)
        },

        bkc_cleanup: ctx => ctx.kdb.destroy(),
      })


    validate_backend(test_bdd,
      `knex ${client}(file) with knex`,
      { 
        async bkc_create(ctx) {
          const base = await mkdtemp(`${tmpdir()}/var-test-knex-sql--`)
          ctx.kdb = knex({ client,
            connection: { filename: `${base}/knex_db.${client}.db`, },
            useNullAsDefault: true })
          return bkc_with_knex(ctx.kdb)
        },

        bkc_cleanup: ctx => ctx.kdb.destroy(),
      })

    validate_backend(test_bdd,
      `knex ${client}(:memory:) with knex (immutable)`,
      { 
        async bkc_create(ctx) {
          ctx.kdb = knex({ client,
            connection: { filename: ':memory:' },
            useNullAsDefault: true })
          return bkc_with_knex(ctx.kdb, {immutable: true})
        },

        bkc_cleanup: ctx => ctx.kdb.destroy(),
      })


    validate_backend(test_bdd,
      `knex ${client}(file) with knex (immutable)`,
      { 
        async bkc_create(ctx) {
          const base = await mkdtemp(`${tmpdir()}/var-test-knex-sql--`)
          ctx.kdb = knex({ client,
            connection: { filename: `${base}/knex_immutable.${client}.db`, },
            useNullAsDefault: true })
          return bkc_with_knex(ctx.kdb, {immutable: true})
        },

        bkc_cleanup: ctx => ctx.kdb.destroy(),
      })
  })
}
