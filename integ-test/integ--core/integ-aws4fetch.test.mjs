import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {kbc_s3_aws4fetch} from '@phorbas/store/esm/nosql/s3_aws4fetch.js'
import { AwsClient } from 'aws4fetch'

import { s3_integ_hosts } from './_integ_hosts.js'


for (let [bucket_url, accessKeyId, secretAccessKey] of s3_integ_hosts) {
  validate_backend(test_bdd,
    `nosql/s3_aws4fetch kbc_s3_aws4fetch`, {
      async kbc_create(ctx) {
        const s3_client = new AwsClient({
          service: 's3', accessKeyId, secretAccessKey})

        return kbc_s3_aws4fetch(bucket_url, s3_client, {autocreate: true})
      },
    })
}
