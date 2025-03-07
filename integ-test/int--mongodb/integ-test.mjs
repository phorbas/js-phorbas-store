import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_mongojs from '@phorbas/store/esm/node/mongojs.mjs'
import bkc_with_keyv from '@phorbas/store/esm/node/keyv.mjs'

const mongojs = require('mongojs')
const Keyv = require('keyv')
const KeyvMongo = require('@keyv/mongo')


for (const host of ['mongo', 'mongo_v42']) {

  validate_backend(
    `${host} with mongojs`,
    {
      create(ctx) {
        ctx.mongo_db = mongojs(`mongodb://${host}:27017/phorbas-mongojs-test`)
        return bkc_with_mongojs(ctx.mongo_db.collection('phorbas-test'))
      },

      done: ctx => ctx.mongo_db.close(),
    })


  validate_backend(
    `${host} with @keyv/mongo`,
    {
      create: ctx => bkc_with_keyv(
        ctx.inst = new Keyv(`mongodb://${host}:27017/phorbas-keyv-test`)),

      done: ctx => ctx.inst.opts.store.db.close(),
    })
}

