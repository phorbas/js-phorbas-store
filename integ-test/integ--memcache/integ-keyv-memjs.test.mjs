import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {kbc_with_keyv} from '@phorbas/store/esm/adapter/keyv.js'
import {Keyv} from 'keyv'
import {KeyvMemcache} from '@keyv/memcache'

import { memcache_hosts } from './_integ_memcache_hosts.mjs'

for (const host of memcache_hosts) {
  validate_backend(test_bdd,
    `keyv to ${host}, with @keyv/memcache`, {

    kbc_create(ctx) {
      ctx.store = new KeyvMemcache(host)
      return kbc_with_keyv(new Keyv({store: ctx.store}))
    },

    kbc_cleanup: ctx => ctx.store.client.close(),

    max_item_size: 64*1024,
  })
}
