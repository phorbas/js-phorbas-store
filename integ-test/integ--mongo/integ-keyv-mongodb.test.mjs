import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import {bkc_with_keyv} from '@phorbas/store/esm/adapter/keyv.js'

import {integ_mongo_hosts} from './_integ_mongo_hosts.js'

import Keyv from 'keyv'
import KeyvMongo from '@keyv/mongo'


for (const url_mongo of integ_mongo_hosts) {
  let url_conn = new URL('/phorbas-keyv-test', url_mongo)

  validate_backend(test_bdd,
    `@keyv/mongo to ${url_conn}`,
    () => bkc_with_keyv( new Keyv(url_conn) ))
}

