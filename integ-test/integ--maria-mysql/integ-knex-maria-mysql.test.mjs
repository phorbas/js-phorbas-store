import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_with_knex} from '@phorbas/store/esm/sql/knex.js'
import knex from 'knex'

// List MySQL & MariaDB versions to test -- see ./deps-deploy.yml
const all_mysql_clients = ['mysql', 'mysql2']
const mysql_hosts = {
    'mysql_v5': all_mysql_clients,
    'mysql_v8': ['mysql2'],

    'mariadb_v10_5': all_mysql_clients,
    'mariadb_v10_6': all_mysql_clients,
    'mariadb_v10_11': all_mysql_clients,

    'mariadb_v11_4': all_mysql_clients,
    'mariadb_v11_7': all_mysql_clients,
  }


for (const [host, valid_client_list] of Object.entries(mysql_hosts)) {
  for (const client of valid_client_list) {
    validate_backend(test_bdd,
      `knex to ${host}: ${client} client`,
      {
        async bkc_create(ctx) {
          ctx.kdb = knex({ client,
            connection: {
              host,
              user: 'root',
              password: 'integ_pass',
              database: 'phorbas_test',
            }})

          return bkc_with_knex( ctx.kdb,
            {blob_type: 'MEDIUMBLOB'})
        },

        bkc_cleanup: ctx => ctx.kdb.destroy(),
      })

    validate_backend(test_bdd,
      `knex to ${host}, immutable: ${client} client`,
      {
        async bkc_create(ctx) {
          ctx.kdb = knex({ client,
            connection: {
              host,
              user: 'root',
              password: 'integ_pass',
              database: 'phorbas_test',
            }})

          return bkc_with_knex( ctx.kdb,
            {blob_type: 'MEDIUMBLOB', immutable: true})
        },

        bkc_cleanup: ctx => ctx.kdb.destroy(),
      })
  }
}
