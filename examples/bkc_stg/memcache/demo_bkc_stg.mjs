import memjs from 'memjs'
import bkc_with_memjs from '@phorbas/store/esm/node/memjs.mjs'

let _memjs_client = memjs.Client.create(`127.0.0.1:11211`)
let bkc_stg = await bkc_with_memjs(_memjs_client)


/// Use with `phorbas_kv_store(stg, opt)` api wrapper
import {phorbas_kv_store} from '@phorbas/store'
let kv_stg = await phorbas_kv_store(bkc_stg)

console.group("store utf8:")
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


// memjs keeps the NodeJS event loop active; explicitly quit
_memjs_client.quit()

