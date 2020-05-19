import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_knex from '@phorbas/store/esm/node/knex.mjs'
const knex = require('knex')


// KeyV does NOT work properly with PostgreSQL and Phorbas's binary use case
// import bkc_with_keyv from '@phorbas/store/esm/node/keyv.mjs'


for (const host of [ 'postgres_v12', 'postgres_v11', 'postgres_v10' ]) {

  validate_backend(
    `${host} with knex`,
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
}


validate_backend(
  `cockroach_v20 with knex`,
  { 
    create: ctx =>
      bkc_with_knex(
        ctx.kdb = knex({
          client: 'pg', version: '9.6',
          connection: 'postgresql://root@cockroach_v20:26257/defaultdb',
          searchPath: ['knex','public'],
        }) ),

    done: ctx => ctx.kdb.destroy(),
  })


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
