import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_with_keyv} from '@phorbas/store/esm/adapter/keyv.js'
import {Keyv} from 'keyv'
import {KeyvMemcache} from '@keyv/memcache'

import { memcache_hosts } from './_integ_memcache_hosts.mjs'

for (const host of memcache_hosts) {
  validate_backend(test_bdd,
    `keyv to ${host}, with @keyv/memcache`, {

    bkc_create(ctx) {
      ctx.store = new KeyvMemcache(host)
      return bkc_with_keyv(new Keyv({store: ctx.store}))
    },

    bkc_cleanup: ctx => ctx.store.client.close(),

    max_item_size: 64*1024,
  })
}
