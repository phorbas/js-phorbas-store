import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_memjs from '@phorbas/store/esm/node/memjs.mjs'
import bkc_with_keyv from '@phorbas/store/esm/node/keyv.mjs'

const memjs = require('memjs')

const Keyv = require('keyv')
const KeyvMemcache = require('keyv-memcache')


for (const host of ['memcache']) {
  validate_backend(
    `${host} with memjs`,
    {
      create:
        ctx => bkc_with_memjs(
          ctx.client = memjs.Client.create(`${host}:11211`)),

      done:
        ctx => ctx.client.close(),

      max_item_size: 64*1024,
    })

  validate_backend(
    `${host} with path and memjs`,
    {
      create:
        ctx => bkc_with_memjs(
          ctx.client = memjs.Client.create(`${host}:11211`),
          {path: '/a/b/c'}),

      done:
        ctx => ctx.client.close(),

      max_item_size: 64*1024,
    })

  validate_backend(
    `${host} with keyv-memcache`,
    {
      create:
        ctx => bkc_with_keyv(
          new Keyv({
            store: ctx.store = new KeyvMemcache(`${host}:11211`)
          }) ),

      done: ctx => ctx.store.client.close(),

      max_item_size: 64*1024,
    })

}
