import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {kbc_with_knex} from '@phorbas/store/esm/sql/knex.js'
import knex from 'knex'


// List Cockroach SQL versions to test -- see ./deps-deploy.yml
let cockroach_hosts = [
    'cockroach_v23', 'cockroach_v22',
  ]

for (const host of cockroach_hosts) {
  validate_backend(test_bdd,
    `knex to ${host}: cockroachdb dialect`,
    {
      async kbc_create(ctx) {
        ctx.kdb = knex({
          client: 'cockroachdb',
          connection: {
            host, port: 26257,
            user: 'root', password: '',
            database: 'defaultdb'
          } })
        return kbc_with_knex(ctx.kdb)
      },

      kbc_cleanup: ctx => ctx.kdb.destroy(),
    })

  validate_backend(test_bdd,
    `knex to ${host}, immutable: cockroachdb dialect`,
    {
      async kbc_create(ctx) {
        ctx.kdb = knex({
          client: 'cockroachdb',
          connection: {
            host, port: 26257,
            user: 'root', password: '',
            database: 'defaultdb'
          } })
          
        return kbc_with_knex(ctx.kdb, {immutable: true})
      },

      kbc_cleanup: ctx => ctx.kdb.destroy(),
    })
}
