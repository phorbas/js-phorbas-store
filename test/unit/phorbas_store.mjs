import {phorbas_store} from '@phorbas/store/esm/index.mjs'

async function _use_phorbas_store(stg) {
  stg = await stg

  let some_key = await stg.store_utf8('hello PHORBAS!')
  await stg.exists(some_key)

  await stg.fetch_utf8(some_key)

  await stg.fetch_content(some_key)

  await stg.bkc_fetch([some_key[0]])


  let other_key = await stg.store_obj({
    crazy_idea: 'hello PHORBAS!',
    some_key })
  await stg.exists(other_key)

  let rt_obj = await stg.fetch_obj(other_key)

  await stg.bkc_fetch(rt_obj.some_key)
}

export function bind_validate_phorbas_store(validate_backend, db_opaque) {
  return function validate_phorbas_store(tst_grp_name, bkc_create, slow) {
    describe(tst_grp_name, function() {
      if (undefined !== slow) slow(this)

      validate_backend(tst_grp_name, {
        create: ()=> phorbas_store(bkc_create()),
        slow})

      describe('using opaque api', function() {
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
