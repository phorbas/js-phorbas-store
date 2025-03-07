import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import {bkc_with_ioredis_pipeline, bkc_with_ioredis_direct} from '@phorbas/store/esm/node/ioredis.mjs'
import bkc_with_keyv from '@phorbas/store/esm/node/keyv.mjs'

const IORedis = require('ioredis')

const Keyv = require('keyv')
const KeyvRedis = require('@keyv/redis')


for (const host of ['redis_v5', 'redis_v6']) {
  validate_backend(
    `${host} with ioredis_pipeline`,
    {
      create:
        ctx => bkc_with_ioredis_pipeline(
          ctx.ioredis = new IORedis({host}) ),
      done:
        ctx => ctx.ioredis.disconnect()
    })


  validate_backend(
    `${host} with ioredis_direct`,
    {
      create: 
        ctx => bkc_with_ioredis_direct(
          ctx.ioredis = new IORedis({host}) ),
      done:
        ctx => ctx.ioredis.disconnect()
    })


  validate_backend(
    `${host} with path and ioredis_pipeline`,
    {
      create:
        ctx => bkc_with_ioredis_pipeline(
          ctx.ioredis = new IORedis({host}),
          {path: '/a/b/c'}),
      done:
        ctx => ctx.ioredis.disconnect()
    })


  validate_backend(
    `${host} with path and ioredis_direct`,
    {
      create: 
        ctx => bkc_with_ioredis_direct(
          ctx.ioredis = new IORedis({host}),
          {path: '/a/b/c'}),
      done:
        ctx => ctx.ioredis.disconnect()
    })


  validate_backend(
    `${host} with @keyv/redis`,
    {
      create:
        ctx => bkc_with_keyv(
          ctx.inst = new Keyv(`redis://${host}:6379`)),

      done:
        ctx => ctx.inst.opts.store.redis.disconnect()
    })

}

