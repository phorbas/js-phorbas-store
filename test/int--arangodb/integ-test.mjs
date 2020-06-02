import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_arangojs from '@phorbas/store/esm/node/arangojs.mjs'

const arangojs = require('arangojs')


for (const url_conn of ['http://some_arango:8529']) {

  validate_backend(
    `${url_conn} with arangojs`,
    {
      async create(ctx) {
        let coll
        ;[ctx.adb, coll] = await init_arango_test(url_conn, 'phorbas_test', 'phorbas_kv')
        return bkc_with_arangojs(coll)
      },
      done: ctx => ctx.adb.close(),
    })

}


async function init_arango_test(url_conn, db_name, collection_name) {
  const adb = new arangojs.Database(url_conn)

  try {
    await adb.createDatabase(db_name)
  } catch (err) {
    if (409 !== err.code)
      throw err
  }

  await adb.useDatabase(db_name)

  const coll = adb.collection(collection_name)
  if (! await coll.exists()) {
    await coll.create()
  }
  return [adb, coll]
}
