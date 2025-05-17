import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_dynamodb} from '@phorbas/store/esm/nosql/dynamodb.js'
import AWS from "@aws-sdk/client-dynamodb"

const integ_ddb_common = {
  apiVersion: '2012-08-10',
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
    secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  },
}

const _dynamodb_integ = [
  { endpoint: 'http://dynamodb_latest:8000', ...integ_ddb_common },
  { endpoint: 'http://dynamodb_2_6:8000', ...integ_ddb_common  },
  { endpoint: 'http://dynamodb_1_25:8000', ...integ_ddb_common  },
]

for (const ddb_cfg of _dynamodb_integ) {
  validate_backend(test_bdd,
    `AWS DynamoDB`, {
      bkc_create: ctx => bkc_dynamodb( new AWS.DynamoDB(ddb_cfg) ),

      max_item_size: 400000,
    })
}
