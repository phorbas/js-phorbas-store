import {phorbas_kv_store, bkc_with_js_map} from 'https://cdn.jsdelivr.net/npm/@phorbas/store@0.2.14/esm/index.mjs'

let stg = await phorbas_kv_store(bkc_with_js_map())

let demo_body = {msg: 'hello phorbas kv store', answer: 42}
console.log({demo_body})

let u8_key = await stg.store_obj(demo_body)
console.log({u8_key})

let rt_exists = await stg.exists(u8_key)
console.log({rt_exists})

let rt_obj = await stg.fetch_obj(u8_key)
console.log({rt_obj})

let rt_utf8 = await stg.fetch_utf8(u8_key)
console.log({rt_utf8})

let rt_u8 = await stg.fetch_content(u8_key)
console.log({rt_u8})
