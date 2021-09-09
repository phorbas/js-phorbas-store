import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'
import {bkc_with_dynamodb_direct, bkc_with_dynamodb_batch} from '@phorbas/store/esm/node/dynamodb.mjs'

const AWS = require('aws-sdk')

const ddb_cfg = {
  apiVersion: '2012-08-10',
  endpoint: 'http://dynamodb:8000',
  region: 'us-east-1',
  accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
  secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
}

validate_backend('dynamodb direct local', {
    skip_api: 0,
    skip_sequences: 0,
    max_item_size: 400000,
    create: ()=>
      bkc_with_dynamodb_direct( new AWS.DynamoDB(ddb_cfg) )
  })

validate_backend('dynamodb batch local', {
  max_item_size: 400000,
  create: ()=>
    bkc_with_dynamodb_batch( new AWS.DynamoDB(ddb_cfg) )
  })

