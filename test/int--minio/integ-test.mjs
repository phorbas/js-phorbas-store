import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_minio from '@phorbas/store/esm/node/minio.mjs'
import bkc_with_level from '@phorbas/store/esm/node/level.mjs'

const Minio = require('minio')

const AWS = require('aws-sdk')
const levelup = require('levelup')
const s3leveldown = require('s3leveldown')
const encodingdown = require('encoding-down')

const accessKeyId = 'AKIAIOSFODNN7EXAMPLE'
const secretAccessKey = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'


validate_backend('minio', async ()=> {
  const minio = new Minio.Client({
      endPoint: 'minio', port: 9000, useSSL: false,
      accessKey: accessKeyId, secretKey: secretAccessKey })

  const bucket = 'phorbas-test'
  if (! await minio.bucketExists(bucket))
    await minio.makeBucket(bucket, 'us-east-1')
  
  return bkc_with_minio(minio, {bucket}) })


validate_backend('s3 with levelup(s3leveldown())', async ()=> {
  const s3_awssdk = new AWS.S3({
    endpoint: 'http://minio:9000',
    s3ForcePathStyle: true,
    accessKeyId, secretAccessKey })

  await s3_awssdk.createBucket({Bucket: 'phorbas-s3leveldown'})
    .promise()
    .catch(err => {
      if (err.statusCode !== 409)
        throw err
    })

  return bkc_with_level(
    levelup(
      s3leveldown('phorbas-s3leveldown', s3_awssdk)))
})


validate_backend('s3 with levelup(encodingdown(s3leveldown()))', async ()=> {
  const s3_awssdk = new AWS.S3({
    endpoint: 'http://minio:9000',
    s3ForcePathStyle: true,
    accessKeyId, secretAccessKey })

  await s3_awssdk.createBucket({Bucket: 'phorbas-encdown-s3leveldown'})
    .promise()
    .catch(err => {
      if (err.statusCode !== 409)
        throw err
    })

  return bkc_with_level(
    levelup(
      encodingdown(
        s3leveldown('phorbas-encdown-s3leveldown', s3_awssdk))))
})

