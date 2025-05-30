import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {kbc_with_keyv} from '@phorbas/store/esm/adapter/keyv.js'

import {integ_redis_hosts} from './_integ_redis_hosts.js'

import Keyv from 'keyv'
import KeyvRedis from '@keyv/redis'


for (const host of integ_redis_hosts) {
  validate_backend(test_bdd,
    `${host} with keyv to redis url`,
    () => kbc_with_keyv( new Keyv(`redis://${host}:6379`) )
  )

  validate_backend(test_bdd,
    `${host} with @keyv/redis`, {

      kbc_create: ctx =>
        kbc_with_keyv( new Keyv(
          ctx.store = new KeyvRedis(`redis://${host}:6379`)) ),

      kbc_cleanup: ctx => ctx.store._client.quit(),
  })
}

