import * as test_bdd from 'node:test'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_with_lmdb} from '@phorbas/store/esm/local/lmdb.js'

import lmdb from 'node-lmdb'

test_bdd.describe.only('bkc_with_lmdb Level package', async () => {
  validate_backend(test_bdd, 'standard',
    async () => bkc_with_lmdb(await _lmdb_env(), {}) )

  validate_backend(test_bdd, 'immutable',
    async () => bkc_with_lmdb(await _lmdb_env(), {immutable: true}) )

  async function _lmdb_env() {
    const _lmdb_env = new lmdb.Env()
    _lmdb_env.open({
      path: await mkdtemp(`${tmpdir()}/var-test-bkc_lmdb--`),
      mapSize: 4*1024*1024,
      maxDbs: 3 })
    return _lmdb_env
  }
})
