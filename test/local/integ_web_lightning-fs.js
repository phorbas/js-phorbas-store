import * as test_bdd from '#test_bdd'
import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {kbc_with_fs} from '@phorbas/store/esm/local/local_fs.js'
import {kbc_with_fsp} from '@phorbas/store/esm/local/local_fsp.js'


// NodeJS doesn't support https:// imports; no worries
try { await import('https://cdn.jsdelivr.net/npm/@isomorphic-git/lightning-fs@4.2.2/dist/lightning-fs.min.js')
} catch (err) { }

if (globalThis.LightningFS) {
  test_bdd.describe('@isomorphic-git/lightning-fs', () => {
    validate_backend(test_bdd,
      'fs with @isomorphic-git/lightning-fs', {
        kbc_create() {
          const lfs = new LightningFS('test-fs', {wipe: true})
          return kbc_with_fs({ base: '/', fs : lfs })
        }})

    validate_backend(test_bdd,
      'fsp with @isomorphic-git/lightning-fs', {
        kbc_create() {
          const lfs = new LightningFS('test-fsp', {wipe: true})
          return kbc_with_fsp({ base: '/', fsp : lfs.promises })
        }})
  })

}
