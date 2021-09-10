import {phorbas_store} from '@phorbas/store/esm/index.mjs'

async function _use_phorbas_store(store) {
  store = await store

  let some_key = await store.store_utf8('hello PHORBAS!')
  await store.exists(some_key)

  await store.fetch_utf8(some_key)

  await store.fetch_content(some_key)

  await store.bkc_fetch([some_key[0]])


  let other_key = await store.store_obj({
    crazy_idea: 'hello PHORBAS!',
    some_key })
  await store.exists(other_key)

  let rt_obj = await store.fetch_obj(other_key)

  await store.bkc_fetch(rt_obj.some_key)
}

export function bind_validate_phorbas_store(validate_backend, db_opaque) {
  return function validate_phorbas_store(tst_grp_name, bkc_create) {
    describe(tst_grp_name, () => {

      validate_backend(tst_grp_name,
        ()=> phorbas_store(bkc_create()))

      describe('using opaque api', () => {
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
