import * as test_bdd from 'node:test'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_with_fs} from '@phorbas/store/esm/local/local_fs.js'

import {stat, readFile, writeFile} from 'node:fs'

const fs = { stat, readFile, writeFile }

validate_backend(test_bdd, 'bkc_with_fs', async () => {
  const base = await mkdtemp(`${tmpdir()}/var-test-bkc_local_fs--`)
  return bkc_with_fs({fs, base})
})

validate_backend(test_bdd, 'bkc_with_fs immutable', async () => {
  const base = await mkdtemp(`${tmpdir()}/var-test-bkc_local_fs-immutable--`)
  return bkc_with_fs({fs, base, immutable: true})
})

