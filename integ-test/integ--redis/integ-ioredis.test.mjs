import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {kbc_ioredis} from '@phorbas/store/esm/nosql/ioredis.js'

import {integ_redis_hosts} from './_integ_redis_hosts.js'

import IORedis from 'ioredis'


for (const host of integ_redis_hosts) {
  validate_backend(test_bdd,
    `${host} with ioredis`, {

      kbc_create: ctx =>
        kbc_ioredis(
          ctx.client = new IORedis({host}) ),

      kbc_cleanup: ctx => ctx.client.disconnect()
    })

  validate_backend(test_bdd,
    `${host} with ioredis (immutable)`, {

      kbc_create: ctx =>
        kbc_ioredis(
          ctx.client = new IORedis({host}),
          {immutable: true}),

      kbc_cleanup: ctx => ctx.client.disconnect()
    })

  validate_backend(test_bdd,
    `${host} with ioredis and path`, {

      kbc_create: ctx =>
        kbc_ioredis(
          ctx.client = new IORedis({host}),
          {path: '/a/b/c'}),

      kbc_cleanup: ctx => ctx.client.disconnect()
    })
}

