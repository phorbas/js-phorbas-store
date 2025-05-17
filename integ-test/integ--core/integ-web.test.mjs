import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_fetch, bkc_fetch_request} from '@phorbas/store/esm/web/fetch.js'

describe.skip('fetch', () => {
  validate_backend(test_bdd, 'fetch with param `http://phorbas_core:9099/`',
    () => bkc_fetch(
      new URL('http://phorbas_core:9099/core/param/some/pre/fix/'),
      {fetch}))

  validate_backend(test_bdd, 'fetch with shared `http://phorbas_core:9099/`',
    () => bkc_fetch(
      new URL('http://phorbas_core:9099/core/shared/some/pre/fix/'),
      {fetch}))

  validate_backend(test_bdd, 'fetch_request with param `http://phorbas_core:9099/`',
    () => bkc_fetch_request(
      new URL('http://phorbas_core:9099/core/param/some/pre/fix/'),
      {fetch, Request}))

  validate_backend(test_bdd, 'fetch_request with shared `http://phorbas_core:9099/`',
    () => bkc_fetch_request(
      new URL('http://phorbas_core:9099/core/shared/some/pre/fix/'),
      {fetch, Request}))
})
