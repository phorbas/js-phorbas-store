import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import {bkc_with_ioredis_pipeline, bkc_with_ioredis_direct} from '@phorbas/store/esm/node/ioredis.mjs'
import bkc_with_level from '@phorbas/store/esm/node/level.mjs'
import bkc_with_keyv from '@phorbas/store/esm/node/keyv.mjs'

const IORedis = require('ioredis')

const levelup = require('levelup')
const redisdown = require('redisdown')
const encodingdown = require('encoding-down')

const Keyv = require('keyv')
const {KeyvFile} = require('@keyv/redis')


for (const host of ['redis_v5', 'redis_v6']) {
  validate_backend(
    `${host} with ioredis`,
    ctx => bkc_with_ioredis_pipeline(
      ctx.ioredis = new IORedis({host}) ),
    ctx => ctx.ioredis.disconnect() )


  validate_backend(
    `${host} with ioredis`,
    ctx => bkc_with_ioredis_direct(
      ctx.ioredis = new IORedis({host}) ),
    ctx => ctx.ioredis.disconnect() )


  validate_backend(
    `${host} with levelup(redisdown)`,

    ctx => bkc_with_level(
      ctx.lvldb = levelup(
        redisdown('phorbas-test'),
        {host}) ),

    ctx => ctx.lvldb.close() )


  validate_backend(
    `${host} with levelup(encdown(redisdown))`,

    ctx => bkc_with_level(
      ctx.lvldb = levelup(
        encodingdown(redisdown('phorbas-test')),
        {host}) ),

    ctx => ctx.lvldb.close() )


  validate_backend(
    `${host} with @keyv/redis`,
    ctx => bkc_with_keyv(
      ctx.inst = new Keyv(`redis://${host}:6379`)),
    ctx => ctx.inst.opts.store.redis.disconnect() )

}

