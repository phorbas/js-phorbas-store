import {phorbas_kv_store, bkc_with_js_map} from '@phorbas/store'
import {u8_cbor_codec, cbor_decode} from 'cbor-codec'

let stg = await phorbas_kv_store(bkc_with_js_map(), {codec: u8_cbor_codec})

let demo_body = {msg: 'hello phorbas kv store', answer: 42}
console.log({demo_body})

let u8_key = await stg.store_obj(demo_body)
console.log({u8_key})

let rt_exists = await stg.exists(u8_key)
console.log({rt_exists})

let rt_obj = await stg.fetch_obj(u8_key)
console.log({rt_obj})

let rt_u8 = await stg.fetch_content(u8_key)
console.log({rt_u8, decoded_obj: cbor_decode(rt_u8)})
