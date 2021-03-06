import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_knex from '@phorbas/store/esm/node/knex.mjs'
const knex = require('knex')


// KeyV does NOT work properly with MySQL and Phorbas's binary use case
// import bkc_with_keyv from '@phorbas/store/esm/node/keyv.mjs'



for (const host of ['mysql_v5', 'mysql_v8', 'mariadb_v10_5']) {
//for (const host of ['mysql_v5', 'mariadb_v10_5']) {

  validate_backend(
    `${host} with knex and mysql`,
    { 
      create: ctx =>
        bkc_with_knex(
          ctx.kdb = knex({
            client: 'mysql',
            connection: {
              host,
              user: 'root',
              password: 'integ_pass',
              database: 'phorbas_test',
            }}),
          {blob_type: 'MEDIUMBLOB'}),

      done: ctx => ctx.kdb.destroy(),
    })

  validate_backend(
    `${host} with knex and mysql2`,
    { 
      create: ctx =>
        bkc_with_knex(
          ctx.kdb = knex({
            client: 'mysql2',
            connection: {
              host,
              user: 'root',
              password: 'integ_pass',
              database: 'phorbas_test',
            }}),
          {blob_type: 'MEDIUMBLOB'}),

      done: ctx => ctx.kdb.destroy(),
    })
}

