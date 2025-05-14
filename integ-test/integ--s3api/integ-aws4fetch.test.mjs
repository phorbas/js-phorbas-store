import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_s3_aws4fetch} from '@phorbas/store/esm/nosql/s3_aws4fetch.js'
import { AwsClient } from 'aws4fetch'


validate_backend(test_bdd,
  `nosql/aws4fetch`, {
    async bkc_create(ctx) {
      const s3_client = new AwsClient({ service: 's3' ,
        accessKeyId: 'minioadmin', secretAccessKey: 'minioadmin' }) // using minio for integ server

      return bkc_s3_aws4fetch(
        'http://s3minio2025:9000/phorbas-aws4fetch/',
        s3_client, {autocreate: true}) 
    },
  })
