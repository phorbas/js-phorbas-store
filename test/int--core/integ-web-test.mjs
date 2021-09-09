import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'
import {bkc_with_web_fetch, bkc_with_fetch} from '@phorbas/store/esm/node/web_fetch.mjs'

const {default: fetch, Request} = require('node-fetch') // node-fetch version 2.x


validate_backend('web_fetch with `http://phorbas_core:9099/`', {
  async create () {
    return await bkc_with_web_fetch(
      new URL('http://phorbas_core:9099/some/pre/fix/'),
      {}, {fetch, Request})
  }})

validate_backend('fetch with `http://phorbas_core:9099/`', {
  async create () {
    return await bkc_with_fetch(fetch,
      new URL('http://phorbas_core:9099/some/pre/fix/'))
  }})

