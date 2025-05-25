import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {kbc_rethinkdb} from '@phorbas/store/esm/nosql/rethinkdb.js'

import rethinkdb from 'rethinkdb'


for (const host of ['some_rethink']) {
  validate_backend(test_bdd,
    `${host} with rethinkdb`, {

      kbc_create: async ctx =>
        kbc_rethinkdb(
          ctx.cfg = await init_rethink_test(
            host, 'phorbas_test', 'phorbas_kv_batch')),

      kbc_cleanup: ctx => ctx.cfg.connection.close(),
    })
}


async function init_rethink_test(host_name, db_name, table_name) {
  const connection = await rethinkdb.connect({
      host: host_name, db: db_name })

  await rethinkdb
    .dbCreate(db_name)
    .run(connection)
    .catch(err => null)

  await rethinkdb
    .tableCreate(table_name)
    .run(connection)
    .catch(err => null)

  return {connection, table: rethinkdb.table(table_name)}
}
