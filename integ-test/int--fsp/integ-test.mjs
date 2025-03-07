import {promises, stat, readFile, writeFile} from 'fs'
import {validate_backend, validate_immutable} from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_fs from '@phorbas/store/esm/fs.mjs'
import bkc_with_fsp from '@phorbas/store/esm/fsp.mjs'
import bkc_with_keyv from '@phorbas/store/esm/node/keyv.mjs'

const Keyv = require('keyv')
const {KeyvFile} = require('keyv-file')


const fs = {stat, readFile, writeFile}

validate_backend('fs', ()=>
  bkc_with_fs({ fs,
    base: '/var/phorbas/bkc_fs/' }))

validate_immutable('fs (immutable)', ()=>
  bkc_with_fs({ fs, immutable: true,
    base: '/var/phorbas/bkc_fs/' }))


const fsp = {
  stat: promises.stat,
  readFile: promises.readFile,
  writeFile: promises.writeFile,
}

validate_backend('fsp', ()=>
  bkc_with_fsp({ fsp,
    base: '/var/phorbas/bkc_fsp/' }))

validate_immutable('fsp (immutable)', ()=>
  bkc_with_fsp({ fsp, immutable: true,
    base: '/var/phorbas/bkc_fsp/' }))


validate_backend('keyv with Map()', ()=>
  bkc_with_keyv(
    new Keyv({ store: new Map() })
  ))

validate_backend('keyv with KeyvFile()', ()=>
  bkc_with_keyv(
    new Keyv({
      store: new KeyvFile({
        filename: '/var/phorbas/keyv_file/db.json' })
    })
  ))

