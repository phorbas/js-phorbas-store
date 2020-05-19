import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_keyv from '@phorbas/store/esm/node/keyv.mjs'

const Keyv = require('keyv')
const KeyvMySQL = require('@keyv/mysql')


//for (const host of ['mysql_v5', 'mysql_v8', 'mariadb_v10_5']) {
for (const host of ['mysql_v5', 'mariadb_v10_5']) {

  validate_backend(
    `${host} with @keyv/mysql`,
    {
      async create(ctx) {
        ctx.inst = new Keyv(
          `mysql://root:integ_pass@${host}:3306/phorbas_test`,
          {table: 'phorbas_kv'})
        return bkc_with_keyv(ctx.inst) },

      //done: ctx => ctx.inst.opts.store.db.close(),
    })
}

