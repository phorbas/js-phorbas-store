import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {kbc_with_knex} from '@phorbas/store/esm/sql/knex.js'
import knex from 'knex'

// List MSSQL versions to test -- see ./deps-deploy.yml
// 'mssql' client uses 'tedious' dependency
const all_mssql_clients = ['mssql']
const mssql_hosts = {
    'mssql_latest': all_mssql_clients,
    'mssql_2022': all_mssql_clients,
    'mssql_2019': all_mssql_clients,
    'mssql_2017': all_mssql_clients,
  }

for (const [host, valid_client_list] of Object.entries(mssql_hosts)) {
  for (const client of valid_client_list) {
    validate_backend(test_bdd,
      `knex to ${host}: ${client} client`,
      { 
        async kbc_create(ctx) {
          ctx.kdb = knex({ client,
            connection: {
              host, user: 'sa',
              password: 'int3g_Pass',
            }})
          return kbc_with_knex( ctx.kdb )
        },

        kbc_cleanup: ctx => ctx.kdb.destroy(),
      })

    validate_backend(test_bdd,
      `knex to ${host}, immutable: ${client} client`,
      { 
        async kbc_create(ctx) {
          ctx.kdb = knex({ client,
            connection: {
              host, user: 'sa',
              password: 'int3g_Pass',
            }})
          return kbc_with_knex( ctx.kdb, { immutable: true })
        },

        kbc_cleanup: ctx => ctx.kdb.destroy(),
      })
  }
}

