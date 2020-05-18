import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'
const Minio = require('minio')

import bkc_with_minio from '@phorbas/store/esm/node/minio.mjs'
import bkc_with_level from '@phorbas/store/esm/node/level.mjs'

const AWS = require('aws-sdk')
const levelup = require('levelup')
const s3leveldown = require('s3leveldown')
const encodingdown = require('encoding-down')



const minio = new Minio.Client({
    endPoint: 'minio', port: 9000, useSSL: false,
    accessKey: 'AKIAIOSFODNN7EXAMPLE',
    secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
})


validate_backend('minio', ()=>
  bkc_with_minio({minio, bucket: 'phorbas-test'}) )


const s3 = new AWS.S3({
  endpoint: 'http://minio:9000',
  accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
  secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',

  apiVersion: '2006-03-01',
  s3ForcePathStyle: true,
  signatureVersion: 'v4', })


validate_backend('s3 with levelup(s3leveldown())', async ()=> {
  await s3.createBucket({Bucket: 'phorbas-s3leveldown'})
    .promise()
    .catch(err => {
      if (err.statusCode !== 409)
        throw err
    })

  return bkc_with_level(
    levelup(
      s3leveldown('phorbas-s3leveldown', s3)))
})


validate_backend('s3 with levelup(encodingdown(s3leveldown()))', async ()=> {
  await s3.createBucket({Bucket: 'phorbas-encdown-s3leveldown'})
    .promise()
    .catch(err => {
      if (err.statusCode !== 409)
        throw err
    })

  return bkc_with_level(
    levelup(
      encodingdown(
        s3leveldown('phorbas-encdown-s3leveldown', s3))))
})
