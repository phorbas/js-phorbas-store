import ky from './unit/ky_uni.mjs'
import {validate_backend, mini_expect} from '@phorbas/store/esm/node/validate_backend.mjs'

import {validate_opaque} from './unit/fetch_opaque.mjs'
import {bind_validate_phorbas_store} from './unit/phorbas_store.mjs'
import {bind_validate_phorbas_kv_store} from './unit/phorbas_kv_store.mjs'
import {opaque_basic, opaque_tahoe} from '@phorbas/opaque/esm/node/index.mjs'
import bkc_with_js_map from '@phorbas/store/esm/js_map.mjs'
import bkc_with_pouchdb from '@phorbas/store/esm/pouchdb.mjs'
import bkc_with_level from '@phorbas/store/esm/node/level.mjs'
import bkc_with_minio from '@phorbas/store/esm/node/minio.mjs'

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-adapter-memory'))

const Minio = require('minio')
const AWS = require('aws-sdk')
const levelup = require('levelup')
const s3leveldown = require('s3leveldown')

const validate_phorbas_store =
  bind_validate_phorbas_store(
    validate_backend, {opaque_basic, opaque_tahoe})

const validate_phorbas_kv_store =
  bind_validate_phorbas_kv_store(validate_backend)

const level_mem = require('level-mem')


validate_backend('js_map',
  ()=> bkc_with_js_map())

validate_backend('pouchdb in-memory',
  ()=> bkc_with_pouchdb(
    new PouchDB('phorbas-pouch', {adapter: 'memory'})))

validate_backend('level with level-mem',
  ()=> bkc_with_level( level_mem() ))

validate_opaque('websvr opaque', {expect: mini_expect, ky})

validate_phorbas_store(
  'phorbas_store with js_map',
  () => bkc_with_js_map())

validate_phorbas_store(
  'phorbas_store with level-mem',
  ()=> bkc_with_level( level_mem() ))


validate_phorbas_kv_store(
  'phorbas_kv_store with js_map',
  () => bkc_with_js_map())

validate_phorbas_kv_store(
  'phorbas_kv_store with level-mem',
  ()=> bkc_with_level( level_mem() ))


if (process.env.PHORBAS_AWS_S3_BUCKET) {
  validate_backend('AWS s3 with levelup(s3leveldown())', {
    create: ()=> setup_s3_env(process.env.PHORBAS_AWS_S3_BUCKET),
    slow: suite => {
      suite.slow(3000)
      suite.timeout(5000)
    }})

  if (process.env.AWS_ENDPOINT)
    validate_backend('AWS s3 with minio', {
      create: async ()=> {
        const bucket = process.env.PHORBAS_AWS_S3_BUCKET
        const ep_url = new URL(process.env.AWS_ENDPOINT)
        const endPoint = ep_url.hostname
        const endPort = ep_url.port

        const cfg = {
          useSSL: ep_url.protocol == 'https:',
          port: +endPort,
          accessKey: process.env.AWS_ACCESS_KEY_ID, 
          secretKey: process.env.AWS_SECRET_ACCESS_KEY }

        if (endPoint) cfg.endPoint = endPoint
        const minio = new Minio.Client(cfg)
        return bkc_with_minio(minio, {bucket})
      },
      slow: suite => {
        suite.slow(3000)
        suite.timeout(5000)
      }})
}

async function setup_s3_env(Bucket) {
  const cfg = { s3ForcePathStyle: true }
  if (process.env.AWS_ENDPOINT) 
    cfg.endpoint = process.env.AWS_ENDPOINT

  const s3_awssdk = new AWS.S3(cfg)

  return bkc_with_level(
    levelup(
      s3leveldown(Bucket, s3_awssdk)))
}
