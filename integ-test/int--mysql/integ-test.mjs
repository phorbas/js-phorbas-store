import {validate_backend, validate_immutable} from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_knex from '@phorbas/store/esm/node/knex.mjs'
const knex = require('knex')


// KeyV does NOT work properly with MySQL and Phorbas's binary use case
// import bkc_with_keyv from '@phorbas/store/esm/node/keyv.mjs'


const mysql_hosts = [
    'mysql_v5',
    'mysql_v8',
    'mariadb_v10_5',
    'mariadb_v10_6',
    'mariadb_v10_7',
  ]


for (const host of mysql_hosts) {

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

  validate_immutable(
    `${host} with knex and mysql (immutable)`,
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
          {blob_type: 'MEDIUMBLOB', immutable: true}),

      done: ctx => ctx.kdb.destroy(),
    })

  validate_immutable(
    `${host} with knex and mysql2 (immutable)`,
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
          {blob_type: 'MEDIUMBLOB', immutable: true}),

      done: ctx => ctx.kdb.destroy(),
    })
}

