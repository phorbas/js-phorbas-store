import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_knex from '@phorbas/store/esm/node/knex.mjs'
const knex = require('knex')



/*
// KeyV does NOT work properly with PostgreSQL and Phorbas's binary use case

import bkc_with_keyv from '@phorbas/store/esm/node/keyv.mjs'
const Keyv = require('keyv')
const KeyvPG = require('@keyv/postgres')

validate_backend.skip(
  `${host} with @keyv/postgres`,
  {
    async create(ctx) {
      ctx.inst = new Keyv(
        `postgresql://postgres:integ_pass@${host}:5432/phorbas_test`,
        {table: 'phorbas_kv'})
      return bkc_with_keyv(ctx.inst) },

    //done: ctx => ctx.inst.opts.store.db.close(),
  })
*/



for (const host of ['postgres_v12', 'postgres_v11', 'postgres_v10']) {

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
              database: 'phorbas_test',
            }}) ),

      done: ctx => ctx.kdb.destroy(),
    })
}

