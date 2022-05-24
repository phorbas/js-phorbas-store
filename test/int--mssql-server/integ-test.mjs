import {validate_backend, validate_immutable} from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_knex from '@phorbas/store/esm/node/knex.mjs'
import knex from 'knex'


const mssql_hosts = [
    'mssql_latest',
    'mssql_2019',
    'mssql_2017',
  ]

for (const host of mssql_hosts) {
  validate_backend(
    `${host} with knex`,
    { 
      create: ctx =>
        bkc_with_knex(
          ctx.kdb = knex({
            client: 'mssql',
            connection: {
              host,
              user: 'sa',
              password: 'integ_pass',
            }}) ),

      done: ctx => ctx.kdb.destroy(),
    })

  validate_immutable(
    `${host} with knex (immutable)`,
    { 
      create: ctx =>
        bkc_with_knex(
          ctx.kdb = knex({
            client: 'mssql',
            connection: {
              host,
              user: 'sa',
              password: 'integ_pass',
            }}),
          {immutable: true}),

      done: ctx => ctx.kdb.destroy(),
    })
}

