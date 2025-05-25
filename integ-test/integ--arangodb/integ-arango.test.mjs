import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {kbc_arangojs} from '@phorbas/store/esm/nosql/arangojs.js'

import * as arangojs from 'arangojs'


for (const url_conn of ['http://some_arango:8529']) {
  validate_backend(test_bdd,
    `${url_conn} with arangojs`, {
      async kbc_create(ctx) {
        const db_name = 'phorbas_test', collection_name = 'phorbas_kv'
        const adb = ctx.adb = new arangojs.Database(url_conn)
        try {
          await adb.createDatabase(db_name)
        } catch (err) {
          if (409 !== err.code)
            throw err
        }

        //await adb.useDatabase(db_name)

        const coll = adb.collection(collection_name)
        if (! await coll.exists())
          await coll.create()

        return kbc_arangojs(coll)
      },
      kbc_cleanup: ctx => ctx.adb.close(),
    })
}

