import {cbor_encode, cbor_decode} from 'cbor-codec'
import {opaque_basic, opaque_tahoe, init_opaque_shared_codec} from '@phorbas/opaque'
import {phorbas_store, bkc_with_js_map} from '@phorbas/store'

init_opaque_shared_codec({
  encode: cbor_encode,
  decode: cbor_decode,
})

async function main_example(opaque, sync=new Set()) {
  let store = await phorbas_store(
    bkc_with_js_map(), { opaque, sync })

  console.log('store.sync:', store.sync)

  let some_key = await store.store_utf8('hello PHORBAS!')
  console.log('some_key:', some_key)

  console.log('exists: %o',
    await store.exists(some_key))

  console.log('store.sync:',
    store.sync)

  console.log('round-trip utf8: %o',
    await store.fetch_utf8(some_key))

  console.log('round-trip binary:',
    await store.fetch_content(some_key))

  console.log('backend round-trip binary:',
    await store.bkc_fetch([some_key[0]]))
}


if (0 && 'plain')
  main_example(opaque_basic)
else if (1 && 'crypto')
  main_example(opaque_tahoe)

