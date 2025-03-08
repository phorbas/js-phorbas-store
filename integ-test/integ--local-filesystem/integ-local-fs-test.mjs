import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_with_fs} from '@phorbas/store/esm/local/local_fs.js'

import {stat, readFile, writeFile, mkdtempSync} from 'node:fs'

const base = mkdtempSync('var-test-bkc_local_fs')
const fs = { stat, readFile, writeFile }

validate_backend(test_bdd, 'bkc_with_fs',
  ()=> bkc_with_fs({fs, base}))

validate_backend(test_bdd, 'bkc_with_fs immutable',
  ()=> bkc_with_fs({fs, base, immutable: true}))

