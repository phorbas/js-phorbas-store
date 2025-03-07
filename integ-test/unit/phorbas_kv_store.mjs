import {phorbas_kv_store} from '@phorbas/store/esm/index.mjs'

async function _use_phorbas_kv_store(stg) {
  stg = await stg

  let tst_msg = 'hello PHORBAS!'
  let some_key = await stg.store_utf8(tst_msg)
  let some_json_key = await stg.store_json({tst_msg})

  await stg.exists(some_key)
  await stg.fetch_content(some_key)
  await stg.bkc_fetch([some_key])

  let rt_msg = await stg.fetch_utf8(some_key)
  if (tst_msg != rt_msg)
    throw new Error('Failed roundtrip rt_msg message')

  let rt_json = await stg.fetch_json(some_json_key)
  if (JSON.stringify({tst_msg}) != JSON.stringify(rt_json))
    throw new Error('Failed roundtrip rt_json message')


  let another_key = await stg.store_obj({
    crazy_idea: tst_msg, answer: 1942 })

  await stg.exists(another_key)
  await stg.fetch_content(another_key)
  await stg.bkc_fetch([another_key])

  let rt_obj = await stg.fetch_obj(another_key)
  if (tst_msg != rt_obj.crazy_idea)
    throw new Error('Failed roundtrip rt_obj message')
  if (1942 != rt_obj.answer)
    throw new Error('Failed roundtrip rt_obj answer')
}

export function bind_validate_phorbas_kv_store(validate_backend) {
  return function validate_phorbas_kv_store(tst_grp_name, bkc_create, slow) {
    describe(tst_grp_name, function() {
      if (undefined !== slow) slow(this)

      validate_backend(tst_grp_name, {
        create: ()=> phorbas_kv_store(bkc_create()),
        slow})

      it('using PhorbasKV api', () =>
        _use_phorbas_kv_store(
          phorbas_kv_store(bkc_create())))

      it('using PhorbasKV api and sync', () =>
        _use_phorbas_kv_store(
          phorbas_kv_store(bkc_create(), {sync: new Set()}) ))
    })
  }
}
