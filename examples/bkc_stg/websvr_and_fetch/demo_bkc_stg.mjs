import {bkc_with_fetch} from '@phorbas/store/esm/node/fetch.mjs'
import {bkc_with_fetch_request} from '@phorbas/store/esm/node/fetch.mjs'
import fetch, {Request} from 'node-fetch'

import {tiny_svr} from './server.mjs'

let use_stg_shared = !!( Date.now() & 0x200 )
let use_fetch_request = !!( Date.now() & 0x400 )

let my_stg_url = use_stg_shared
  ? new URL('http://127.0.0.1:9091/stg/unqie/pre/fix/')
  : new URL('http://127.0.0.1:9091/stg/shared/pre/fix/')

let bkc_stg = use_fetch_request
  ? await bkc_with_fetch(my_stg_url, {fetch})
  : await bkc_with_fetch_request(my_stg_url, {fetch, Request})


/// Use with `phorbas_kv_store(stg, opt)` api wrapper
import {phorbas_kv_store} from '@phorbas/store'
let kv_stg = await phorbas_kv_store(bkc_stg)

console.group("store utf8:", {use_stg_shared, use_fetch_request})
let key = await kv_stg.store_utf8('demo_bkc_stg')
console.log({key})
console.log({exists: await kv_stg.exists(key)})
console.log({utf8: await kv_stg.fetch_utf8(key)})
console.groupEnd()



/// Or use with `phorbas_store(stg, opt)` and @phorbas/opaque
import { phorbas_store } from '@phorbas/store'
// import { opaque_basic, opaque_tahoe } from '@phorbas/opaque'
// let opaque_stg = await phorbas_store(bkc_stg, {opaque: opaque_basic})


/// Or use directly or in composition
// await bkc_stg.bkc_store([[u8_key, u8_content]])
// await bkc_stg.bkc_fetch([u8_key])
// await bkc_stg.bkc_exists([u8_key])

tiny_svr.unref()
