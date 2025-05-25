import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {kbc_mongojs} from '@phorbas/store/esm/nosql/mongojs.js'

import {integ_mongo_hosts} from './_integ_mongo_hosts.js'

import { MongoClient } from 'mongodb'


for (const url_mongo of integ_mongo_hosts) {
  let url_conn = new URL('/phorbas-mongo-test', url_mongo)

  validate_backend(test_bdd,
    `mongojs to ${url_conn}`, {
      async kbc_create(ctx) {
        let client = ctx.client = new MongoClient(url_conn.href)
        await client.connect()
        let coll = client.db().collection('phorbas-test')
        return kbc_mongojs(coll)
      },

      kbc_cleanup: ctx => ctx.client.close(),
    })
}

