import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_minio} from '@phorbas/store/esm/nosql/minio.js'
import * as Minio from 'minio'


if (0) validate_backend(test_bdd,
  `nosql/minio`, {
    async bkc_create(ctx) {
      const bucket = 'phorbas-test'
      const minio = new Minio.Client({
          endPoint: 's3minio2025', port: 9000, useSSL: false,
          accessKey: 'minioadmin', secretKey: 'minioadmin' })

      if (! await minio.bucketExists(bucket))
        await minio.makeBucket(bucket, 'us-east-1')

      return bkc_minio(minio, {bucket}) 
    },
  })
