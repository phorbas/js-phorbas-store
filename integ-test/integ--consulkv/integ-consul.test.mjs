import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_consulkv} from '@phorbas/store/esm/nosql/consulkv.js'

import Consul from 'consul'

const consul_hosts = [
  'consul_r1_15',
  'consul_r1_14',
]

for (const host of consul_hosts) {
  validate_backend(test_bdd,
    `nosql/consulkv to ${host}`, {
      bkc_create: ctx => {
        const consul = new Consul({ host, promisify: true })
        return bkc_consulkv(consul.kv)
      },
      max_item_size: 512*1024,
    })

  validate_backend(test_bdd,
    `nosql/consulkv to ${host} with path`, {
      bkc_create: ctx => {
        const consul = new Consul({ host, promisify: true })
        return bkc_consulkv(consul.kv, {path: '/a/b/c'})
      },
      max_item_size: 512*1024,
    })

}
