import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_consulkv from '@phorbas/store/esm/node/consulkv.mjs'

const Consul = require('consul')

const consul = new Consul({
  host: 'consul_dev',
  promisify: true,
})

validate_backend(`consul kv`, {
  create: ()=> bkc_with_consulkv(consul.kv),
  max_item_size: 512*1024,
})

