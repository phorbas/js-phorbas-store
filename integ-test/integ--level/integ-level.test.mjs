import * as test_bdd from 'node:test'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_with_level} from '@phorbas/store/esm/adapter/level.js'

import {Level} from 'level'

test_bdd.describe('bkc_with_level Level package', async () => {

  validate_backend(test_bdd, 'standard', {
    async bkc_create() {
      let path = await mkdtemp(`${tmpdir()}/var-test-bkc_level--`)
      return bkc_with_level(new Level(path), {})
    }})

  validate_backend(test_bdd, 'immutable', {
    async bkc_create() {
      let path = await mkdtemp(`${tmpdir()}/var-test-bkc_level-immutable--`)
      return bkc_with_level(new Level(path), {immutable: true})
    }})

})
