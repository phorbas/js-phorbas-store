import validate_backend from '@phorbas/store/esm/web/validate_backend.mjs'

import 'https://cdn.jsdelivr.net/npm/@isomorphic-git/lightning-fs@4.2.2/dist/lightning-fs.min.js'

import {AwsClient} from 'aws4fetch'
import bkc_with_js_map from '@phorbas/store/esm/js_map.mjs'
import bkc_with_web_db from '@phorbas/store/esm/web/web_db.mjs'
import bkc_with_fs from '@phorbas/store/esm/fs.mjs'
import bkc_with_fsp from '@phorbas/store/esm/fsp.mjs'
import bkc_with_s3_aws4fetch from '@phorbas/store/esm/s3_aws4fetch.mjs'


validate_backend('js_map', ()=>
  bkc_with_js_map() )

validate_backend('web_db', ()=>
  bkc_with_web_db({
    db: 'test-phorbas',
    store: 'kv-phorbas',
    wipe: true}) )

validate_backend('fs with @isomorphic-git/lightning-fs', ()=> {
  const lfs = new LightningFS('test-fs', {wipe: true})
  return bkc_with_fs({ base: '/', fs : lfs })
})

validate_backend('fsp with @isomorphic-git/lightning-fs', ()=> {
  const lfs = new LightningFS('test-fsp', {wipe: true})
  return bkc_with_fsp({ base: '/', fsp : lfs.promises })
})

validate_backend('s3 with s3_aws4fetch', async ()=> {
  console.log('Requires int--minio to be up an running')

  const s3_aws4fetch = new AwsClient({
    service: 's3',
    // demo access secrets for local Minio integration testing
    accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
    secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  })

  const bucket = 'phorbas-aws4fetch-test'
  return bkc_with_s3_aws4fetch(s3_aws4fetch, {
    url: 'http://127.0.0.1:9000', bucket})
})

