import {opaque_basic, opaque_tahoe} from '@phorbas/opaque'
import {phorbas_store, bkc_with_js_map} from '@phorbas/store'

async function main_example(opaque, sync=new Set()) {
  let stg = await phorbas_store(
    bkc_with_js_map(), { opaque, sync })

  console.log('stg.sync:', stg.sync)

  let some_key = await stg.store_utf8('hello PHORBAS!')
  console.log('some_key:', some_key)

  console.log('exists: %o',
    await stg.exists(some_key))

  console.log('stg.sync:',
    stg.sync)

  console.log('round-trip utf8: %o',
    await stg.fetch_utf8(some_key))

  console.log('round-trip binary:',
    await stg.fetch_content(some_key))

  console.log('backend round-trip binary:',
    await stg.bkc_fetch([some_key[0]]))


  let other_key = await stg.store_obj({
    crazy_idea: 'hello PHORBAS!',
    some_key })

  console.log('other_key:', other_key)

  console.log('other_key exists: %o',
    await stg.exists(other_key))

  let rt_obj = await stg.fetch_obj(other_key)
  console.log('round-trip object:', rt_obj)
}


if (0 && 'plain')
  main_example(opaque_basic)
else if (1 && 'crypto')
  main_example(opaque_tahoe)

