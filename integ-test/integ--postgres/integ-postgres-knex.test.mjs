import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_with_knex} from '@phorbas/store/esm/sql/knex.js'
import knex from 'knex'


// List PostgreSQL versions to test -- see ./deps-deploy.yml
let postgres_hosts = [
    'postgres_v17', 'postgres_v16',
    'postgres_v15', 'postgres_v14', 'postgres_v13',
    'postgres_v9',
  ]

for (const host of postgres_hosts) {
  validate_backend(test_bdd,
    `knex to ${host}: pg driver`,
    {
      async bkc_create(ctx) {
        ctx.kdb = knex({
          client: 'pg',
          connection: {
            host,
            user: 'postgres',
            password: 'integ_pass',
            database: 'phorbas_test'
          }})
        return bkc_with_knex(ctx.kdb)
      },

      bkc_cleanup: ctx => ctx.kdb.destroy(),
    })

  validate_backend(test_bdd,
    `knex to ${host}, immutable: pg driver`,
    {
      async bkc_create(ctx) {
        ctx.kdb = knex({
          client: 'pg',
          connection: {
            host,
            user: 'postgres',
            password: 'integ_pass',
            database: 'phorbas_test'
          }})
        return bkc_with_knex(ctx.kdb, {immutable: true})
      },

      bkc_cleanup: ctx => ctx.kdb.destroy(),
    })
}

