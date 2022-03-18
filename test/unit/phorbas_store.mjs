import {phorbas_store} from '@phorbas/store/esm/index.mjs'

async function _use_phorbas_store(stg) {
  stg = await stg

  let tst_msg = 'hello PHORBAS!'
  let some_key = await stg.store_utf8(tst_msg)
  let some_json_key = await stg.store_json({tst_msg})

  await stg.exists(some_key)
  await stg.fetch_content(some_key)
  await stg.bkc_fetch([some_key[0]])

  let rt_msg = await stg.fetch_utf8(some_key)
  if (tst_msg != rt_msg)
    throw new Error('Failed roundtrip rt_msg message')

  let rt_json = await stg.fetch_json(some_json_key)
  if (JSON.stringify({tst_msg}) != JSON.stringify(rt_json))
    throw new Error('Failed roundtrip rt_json message')


  let other_key = await stg.store_obj({
    crazy_idea: tst_msg, answer: 2042, some_key })

  await stg.exists(other_key)
  await stg.fetch_content(other_key)
  await stg.bkc_fetch(other_key)

  let rt_obj = await stg.fetch_obj(other_key)
  if (tst_msg != rt_obj.crazy_idea)
    throw new Error('Failed roundtrip rt_obj message')
  if (2042 != rt_obj.answer)
    throw new Error('Failed roundtrip rt_obj answer')


  let rt_msg_two = await stg.fetch_utf8(rt_obj.some_key)
  if (tst_msg != rt_msg_two)
    throw new Error('Failed roundtrip rt_msg_two message')
}

export function bind_validate_phorbas_store(validate_backend, db_opaque) {
  return function validate_phorbas_store(tst_grp_name, bkc_create, slow) {
    describe(tst_grp_name, function() {
      if (undefined !== slow) slow(this)

      validate_backend(tst_grp_name, {
        create: ()=> phorbas_store(bkc_create()),
        slow})

      describe('using Phorbas Opaque api', function() {
        if (undefined !== slow) slow(this)

        for (let [opaque_name, opaque] of Object.entries(db_opaque)) {
          it(`with ${opaque_name}`,
            ()=> _use_phorbas_store(
              phorbas_store(bkc_create(), {opaque}) ))

          it(`with ${opaque_name} and sync`,
            ()=> _use_phorbas_store(
              phorbas_store(bkc_create(), {opaque, sync: new Set()}) ))
        }
      })
    })
  }
}
