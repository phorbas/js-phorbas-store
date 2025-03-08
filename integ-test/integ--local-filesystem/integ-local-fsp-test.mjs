import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_with_fsp} from '@phorbas/store/esm/local/local_fsp.js'

import {stat, readFile, writeFile, mkdtemp} from 'node:fs/promises'

const base = await mkdtemp('var-test-bkc_local_fsp')
const fsp = { stat, readFile, writeFile }

validate_backend(test_bdd, 'bkc_with_fsp',
  ()=> bkc_with_fsp({fsp, base}))

validate_backend(test_bdd, 'bkc_with_fsp immutable',
  ()=> bkc_with_fsp({fsp, base, immutable: true}))

