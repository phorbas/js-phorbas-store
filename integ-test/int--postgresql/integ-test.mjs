import {validate_backend, validate_immutable} from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_knex from '@phorbas/store/esm/node/knex.mjs'
import knex from 'knex'


/// KeyV does NOT work properly with PostgreSQL and Phorbas's binary use case
// import bkc_with_keyv from '@phorbas/store/esm/node/keyv.mjs'


// List PostgreSQL versions to test -- see ./deps-deploy.yml
let postgres_hosts = [
    'postgres_v14', 'postgres_v13',
    'postgres_v12', 'postgres_v11',
    'postgres_v10', 'postgres_v9',
  ]

// List Cockroach SQL versions to test -- see ./deps-deploy.yml
let cockroach_hosts = [
    'cockroach_v21', 'cockroach_v20',
  ]

for (const host of postgres_hosts) {

  validate_backend(
    `${host} with knex (and pg driver)`,
    {
      create: ctx =>
        bkc_with_knex(
          ctx.kdb = knex({
            client: 'pg',
            connection: {
              host,
              user: 'postgres',
              password: 'integ_pass',
              database: 'phorbas_test'
            }}) ),

      done: ctx => ctx.kdb.destroy(),
    })

  validate_immutable(
    `${host} with knex (and pg driver) (immutable)`,
    {
      create: ctx =>
        bkc_with_knex(
          ctx.kdb = knex({
            client: 'pg',
            connection: {
              host,
              user: 'postgres',
              password: 'integ_pass',
              database: 'phorbas_test'
            }}),
          {immutable: true}),

      done: ctx => ctx.kdb.destroy(),
    })

  //// pg-native does not work with our testsuite. Needs troublshooting.
  // -- add "pg-native": "*" to dependencies of integ-package.json
  // validate_backend.skip(
  //   `${host} with knex (and pg-native driver)`,
  //   {
  //     create: ctx =>
  //       bkc_with_knex(
  //         ctx.kdb = knex({
  //           client: 'pgnative',
  //           connection: {
  //             host,
  //             user: 'postgres',
  //             password: 'integ_pass',
  //             database: 'phorbas_test'
  //           }}) ),
  //
  //     done: ctx => ctx.kdb.destroy(),
  //   })
}


for (const host of cockroach_hosts) {
  validate_backend(
    `${host} with knex (and postgres 9.6 dialect)`,
    {
      create: ctx =>
        bkc_with_knex(
          ctx.kdb = knex({
            client: 'pg',
            version: '9.6',
            connection: `postgresql://root@${host}:26257/defaultdb`,
            searchPath: ['knex','public'],
          }) ),

      done: ctx => ctx.kdb.destroy(),
    })

  validate_backend(
    `${host} with knex (and cockroachdb dialect)`,
    {
      create: ctx =>
        bkc_with_knex(
          ctx.kdb = knex({
            client: 'cockroachdb',
            connection: {
              host, port: 26257,
              user: 'root', password: '',
              database: 'defaultdb'
            },
          }) ),

      done: ctx => ctx.kdb.destroy(),
    })

  validate_immutable(
    `${host} with knex (and postgres 9.6 dialect) (immutable)`,
    {
      create: ctx =>
        bkc_with_knex(
          ctx.kdb = knex({
            client: 'pg',
            version: '9.6',
            connection: `postgresql://root@${host}:26257/defaultdb`,
            searchPath: ['knex','public'],
          }),
          {immutable: true}),

      done: ctx => ctx.kdb.destroy(),
    })

  validate_immutable(
    `${host} with knex (and cockroachdb dialect) (immutable)`,
    {
      create: ctx =>
        bkc_with_knex(
          ctx.kdb = knex({
            client: 'cockroachdb',
            connection: {
              host, port: 26257,
              user: 'root', password: '',
              database: 'defaultdb'
            },
          }),
          {immutable: true}),

      done: ctx => ctx.kdb.destroy(),
    })
}


/*
// Playing with crate.io.
// No SQL BLOB type according to: https://crate.io/docs/crate/reference/en/4.1/general/blobs.html

validate_backend(
  `crate_v4 with knex`,
  {
    create: ctx =>
      bkc_with_knex(
        ctx.kdb = knex({
          client: 'pg', version: '9.6',
          connection: 'postgresql://crate@crate_v4/doc',
          searchPath: ['knex','public'],
        }),
        {key_type:'TEXT'} //, blob_type: '???' no SQL-based BLOB type???
      ),

    done: ctx => ctx.kdb.destroy(),
  })
*/
