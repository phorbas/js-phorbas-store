import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import {bkc_with_rethinkdb_direct, bkc_with_rethinkdb_batch} from '@phorbas/store/esm/node/rethinkdb.mjs'

const rethinkdb = require('rethinkdb')


for (const host of ['some_rethink']) {

  validate_backend(
    `${host} with rethinkdb batch`,
    {
      create: async ctx =>
        bkc_with_rethinkdb_batch(
          ctx.cfg = await init_rethink_test(
            host, 'phorbas_test', 'phorbas_kv_batch')),
      done: ctx => ctx.cfg.connection.close(),
    })

  validate_backend(
    `${host} with rethinkdb direct`,
    {
      create: async ctx =>
        bkc_with_rethinkdb_direct(
          ctx.cfg = await init_rethink_test(
            host, 'phorbas_test', 'phorbas_kv_direct')),
      done: ctx => ctx.cfg.connection.close(),
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
