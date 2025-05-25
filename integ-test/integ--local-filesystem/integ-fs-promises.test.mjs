import * as test_bdd from 'node:test'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {kbc_with_fsp} from '@phorbas/store/esm/local/local_fsp.js'

import {stat, readFile, writeFile} from 'node:fs/promises'

const fsp = { stat, readFile, writeFile }

validate_backend(test_bdd, 'kbc_with_fsp', async () => {
  const base = await mkdtemp(`${tmpdir()}/var-test-kbc_local_fsp--`)
  return kbc_with_fsp({fsp, base})
})

validate_backend(test_bdd, 'kbc_with_fsp immutable', async () => {
  const base = await mkdtemp(`${tmpdir()}/var-test-kbc_local_fsp-immutable--`)
  return kbc_with_fsp({fsp, base, immutable: true})
})

