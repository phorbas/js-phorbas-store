import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'
import {bkc_with_fetch, bkc_with_fetch_request} from '@phorbas/store/esm/node/fetch.mjs'

const {default: fetch, Request} = require('node-fetch') // node-fetch version 2.x


validate_backend('fetch with param `http://phorbas_core:9099/`', {
  async create () {
    return await bkc_with_fetch(
      new URL('http://phorbas_core:9099/core/param/some/pre/fix/'),
      {fetch})
  }})

validate_backend('fetch with shared `http://phorbas_core:9099/`', {
  async create () {
    return await bkc_with_fetch(
      new URL('http://phorbas_core:9099/core/shared/some/pre/fix/'),
      {fetch})
  }})

validate_backend('fetch_request with param `http://phorbas_core:9099/`', {
  async create () {
    return await bkc_with_fetch_request(
      new URL('http://phorbas_core:9099/core/param/some/pre/fix/'),
      {fetch, Request})
  }})

validate_backend('fetch_request with shared `http://phorbas_core:9099/`', {
  async create () {
    return await bkc_with_fetch_request(
      new URL('http://phorbas_core:9099/core/shared/some/pre/fix/'),
      {fetch, Request})
  }})

