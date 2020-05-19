import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_keyv from '@phorbas/store/esm/node/keyv.mjs'

const Keyv = require('keyv')
const KeyvPG = require('@keyv/postgres')


//for (const host of ['postgres_v12', 'postgres_v11', 'postgres_v10']) {
for (const host of ['postgres_v12']) {

  validate_backend(
    `${host} with @keyv/postgres`,
    {
      async create(ctx) {
        ctx.inst = new Keyv(
          `postgresql://postgres:integ_pass@${host}:5432/phorbas_test`,
          {table: 'phorbas_kv'})
        return bkc_with_keyv(ctx.inst) },

      //done: ctx => ctx.inst.opts.store.db.close(),
    })
}

