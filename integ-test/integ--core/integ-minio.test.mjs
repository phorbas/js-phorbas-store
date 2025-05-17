import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_minio} from '@phorbas/store/esm/nosql/minio.js'
import * as Minio from 'minio'

import { s3_integ_hosts } from './_integ_hosts.js'


for (let [bucket_url, accessKey, secretKey] of s3_integ_hosts) {
  const useSSL = 'https:' === bucket_url.protocol
  const bucket = bucket_url.pathname.split('/')[1]

  validate_backend(test_bdd,
    `nosql/minio`, {
      async bkc_create(ctx) {
        const minio = new Minio.Client({
            endPoint: bucket_url.hostname,
            port: +bucket_url.port, useSSL,
            accessKey, secretKey})

        if (! await minio.bucketExists(bucket))
          await minio.makeBucket(bucket, 'us-east-1')

        return bkc_minio(minio, {bucket}) 
      },
    })
}
