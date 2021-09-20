import ky from './unit/ky_uni.mjs'
import {validate_backend, mini_expect} from '@phorbas/store/esm/node/validate_backend.mjs'

import {validate_opaque} from './unit/fetch_opaque.mjs'
import {bind_validate_phorbas_store} from './unit/phorbas_store.mjs'
import {opaque_basic, opaque_tahoe} from '@phorbas/opaque/esm/node/index.mjs'
import bkc_with_js_map from '@phorbas/store/esm/js_map.mjs'
import bkc_with_level from '@phorbas/store/esm/node/level.mjs'

const AWS = require('aws-sdk')
const levelup = require('levelup')
const s3leveldown = require('s3leveldown')

const validate_phorbas_store = bind_validate_phorbas_store(
  validate_backend, {opaque_basic, opaque_tahoe})

const level_mem = require('level-mem')


validate_backend('js_map',
  ()=> bkc_with_js_map())

validate_backend('level with level-mem',
  ()=> bkc_with_level( level_mem() ))

validate_opaque('websvr opaque', {expect: mini_expect, ky})

validate_phorbas_store(
  'phorbas_store with js_map',
  () => bkc_with_js_map())

validate_phorbas_store(
  'phorbas_store with level-mem',
  ()=> bkc_with_level( level_mem() ))


if (process.env.PHORBAS_AWS_S3_BUCKET)
  validate_backend('AWS s3 with levelup(s3leveldown())', {
    create: ()=> setup_s3_env(process.env.PHORBAS_AWS_S3_BUCKET),
    slow: suite => {
      suite.slow(3000)
      suite.timeout(5000)
    }})


async function setup_s3_env(Bucket) {
  const s3_awssdk = new AWS.S3({
    s3ForcePathStyle: true })

  return bkc_with_level(
    levelup(
      s3leveldown(Bucket, s3_awssdk)))
}
