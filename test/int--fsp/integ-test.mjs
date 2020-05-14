import {promises, stat, readFile, writeFile} from 'fs'
import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_fs from '@phorbas/store/esm/fs.mjs'
import bkc_with_fsp from '@phorbas/store/esm/fsp.mjs'


const fs = {stat, readFile, writeFile}

validate_backend('fs', ()=>
  bkc_with_fs({ fs,
    base: '/var/phorbas/bkc-fsp/' }))


const fsp = {
  stat: promises.stat,
  readFile: promises.readFile,
  writeFile: promises.writeFile,
}

validate_backend('fsp', ()=>
  bkc_with_fsp({ fsp,
    base: '/var/phorbas/bkc-fsp/' }))

