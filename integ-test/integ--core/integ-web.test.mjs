import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_fetch, bkc_fetch_request} from '@phorbas/store/esm/web/fetch.js'

test_bdd.describe('bkc_fetch variants', () => {

  validate_backend(test_bdd,
    'fetch with `http://phorbas_core:9098/use_hono/a/b/c/`',
    () => bkc_fetch(new URL('http://phorbas_core:9098/use_hono/a/b/c/')))

  validate_backend(test_bdd,
    'fetch with `http://phorbas_core:9099/use_http/some/pre/fix/`',
    () => bkc_fetch(new URL('http://phorbas_core:9099/use_http/some/pre/fix/')))

  validate_backend(test_bdd,
    'fetch immutable with `http://phorbas_core:9099/use_http/some/pre/fix/`',
    () => bkc_fetch(new URL('http://phorbas_core:9099/use_http/some/pre/fix/'),
            {immutable: true}))

})
