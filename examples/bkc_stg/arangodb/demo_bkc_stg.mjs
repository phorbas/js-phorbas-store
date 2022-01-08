import arangojs from 'arangojs'
import bkc_with_arangojs from '@phorbas/store/esm/node/arangojs.mjs'

let adb = new arangojs.Database('http://127.0.0.1:8529')
let bkc_stg = await bkc_with_arangojs(
  await _setup_adb_collection(adb))


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



async function _setup_adb_collection(adb) {
  try {
    await adb.createDatabase('phorbas_demo')
  } catch (err) {
    if (409 !== err.code)
      throw err
  }

  await adb.useDatabase('phorbas_demo')

  const coll = adb.collection('phorbas_kv')
  if (! await coll.exists())
    await coll.create()

  return coll
}

