import * as test_bdd from 'node:test'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {kbc_with_keyv} from '@phorbas/store/esm/adapter/keyv.js'
import Keyv from 'keyv'
import KeyvSqlite from '@keyv/sqlite'

validate_backend(test_bdd, `keyv with Map()`, ()=>
  kbc_with_keyv(
    new Keyv({ store: new Map() })
  ))

validate_backend(test_bdd, `keyv with @keyv/sqlite`, {
  async kbc_create() {
    const base = await mkdtemp(`${tmpdir()}/var-test-keyv-sql--`)
    return kbc_with_keyv(
      new Keyv(
        new KeyvSqlite(
          `sqlite://${base}/keyv-db.sqlite`,
          {table: 'phorbas_keyv'})))
  },
})


