import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {kbc_memjs} from '@phorbas/store/esm/nosql/memjs.js'
import memjs from 'memjs'

import { memcache_hosts } from './_integ_memcache_hosts.mjs'

for (const host of memcache_hosts) {
  validate_backend(test_bdd,
    `${host} with memjs`, {

      kbc_create: ctx =>
        kbc_memjs(
          ctx.client = memjs.Client.create(host)),

      kbc_cleanup: ctx => ctx.client.close(),

      max_item_size: 64*1024,
    })

  validate_backend(test_bdd,
    `${host} with path and memjs`, {

      kbc_create: ctx =>
        kbc_memjs(
          ctx.client = memjs.Client.create(host),
          {path: '/a/b/c'}),

      kbc_cleanup: ctx => ctx.client.close(),

      max_item_size: 64*1024,
    })
}
