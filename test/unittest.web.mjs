import validate_backend from '@phorbas/store/esm/web/validate_backend.mjs'

import {AwsClient} from 'aws4fetch'
import 'https://cdn.jsdelivr.net/npm/@isomorphic-git/lightning-fs@4.2.2/dist/lightning-fs.min.js'

import {bind_validate_phorbas_store} from './unit/phorbas_store.mjs'
import {opaque_basic, opaque_tahoe} from '@phorbas/opaque/esm/web/index.mjs'
import bkc_with_js_map from '@phorbas/store/esm/js_map.mjs'

import bkc_with_fetch from '@phorbas/store/esm/web/fetch.mjs'
import bkc_with_web_db from '@phorbas/store/esm/web/web_db.mjs'
import bkc_with_web_cache from '@phorbas/store/esm/web/web_cache.mjs'
import bkc_with_web_cache_fetch from '@phorbas/store/esm/web/web_cache_fetch.mjs'

import bkc_with_fs from '@phorbas/store/esm/fs.mjs'
import bkc_with_fsp from '@phorbas/store/esm/fsp.mjs'
import {bkc_with_s3_fetch, bkc_with_s3_aws4fetch} from '@phorbas/store/esm/s3_aws4fetch.mjs'

const validate_phorbas_store = bind_validate_phorbas_store(
  validate_backend, {opaque_basic, opaque_tahoe})


validate_backend('js_map', ()=>
  bkc_with_js_map() )

validate_phorbas_store(
  'phorbas_store with js_map',
  () => bkc_with_js_map())


validate_backend('fetch with `node int--core/node-http-store.mjs`',
  () => bkc_with_fetch(new URL('http://127.0.0.1:9099/browser/some/pre/fix/')) )

validate_phorbas_store(
  'phorbas_store with fetch with `node int--core/node-http-store.mjs`',
  () => bkc_with_fetch(new URL('http://127.0.0.1:9099/browser/other/prefix/')) )


validate_backend('web_db',
  ()=>
    bkc_with_web_db({
      db: 'test-phorbas',
      store: 'kv-phorbas',
      wipe: false}) )

validate_phorbas_store(
  'phorbas_store with web_db',
  ()=> bkc_with_web_db({db: 'test-phorbas-store', wipe: false}) )


validate_backend('web_cache', {
  async create() {
    await caches.delete('phorbas-unittest')
    return await bkc_with_web_cache(
      caches.open('phorbas-unittest'),
      new URL('/some/pre/fix/', location),
      {})
  }})

validate_backend('web_cache_fetch with `node int--core/node-http-store.mjs`', {
  async create () {
    await caches.delete('phorbas-unittest-two')
    return await bkc_with_web_cache_fetch(
      caches.open('phorbas-unittest-two'),
      new URL('http://127.0.0.1:9099/some/pre/fix/'),
      {})
  }})

validate_backend('fs with @isomorphic-git/lightning-fs', {
  create() {
    const lfs = new LightningFS('test-fs', {wipe: true})
    return bkc_with_fs({ base: '/', fs : lfs })
  }})

validate_backend('fsp with @isomorphic-git/lightning-fs', {
  create() {
    const lfs = new LightningFS('test-fsp', {wipe: true})
    return bkc_with_fsp({ base: '/', fsp : lfs.promises })
  }})


// demo access secrets for local Minio integration testing
const _creds_s3_integ_test = {
  accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
  secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
}

async function _testclient_aws4fetch(url_bucket) {
  const s3_aws4fetch = new AwsClient({ service: 's3', ... _creds_s3_integ_test })

  try {
    await s3_aws4fetch.fetch(new URL('/', url_bucket))
  } catch (err) {
    console.warn('NOTE: "s3 with s3_aws4fetch" suite requires running int--minio docker dependencies')
    throw new Error(`Unable to connect to int--minio integration test servers`)
  }

  return s3_aws4fetch
}

async function _bkc_minio_s3_aws4fetch() {
  const url_bucket = new URL('http://127.0.0.1:9000/phorbas-s3-aws4fetch/')
  // ensure the Minio server is alive
  const s3_aws4fetch = await _testclient_aws4fetch(url_bucket)

  return bkc_with_s3_aws4fetch(url_bucket, s3_aws4fetch, {autocreate: true})
}

async function _bkc_minio_s3_fetch() {
  const url_bucket = new URL('http://127.0.0.1:9000/phorbas-s3-fetch/')
  // ensure the Minio server is alive
  await _testclient_aws4fetch(url_bucket)

  return bkc_with_s3_fetch(url_bucket, {autocreate: true, ... _creds_s3_integ_test})
}

validate_backend('s3 with s3_aws4fetch', _bkc_minio_s3_aws4fetch)
validate_backend('s3 with s3_fetch', _bkc_minio_s3_fetch)

validate_phorbas_store('phorbas_store with s3_fetch', _bkc_minio_s3_aws4fetch)
validate_phorbas_store('phorbas_store with s3_fetch', _bkc_minio_s3_fetch)
