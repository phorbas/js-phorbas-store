import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'
import bkc_with_level from '@phorbas/store/esm/node/level.mjs'
import bkc_with_lmdb from '@phorbas/store/esm/node/lmdb.mjs'

const level = require('level')
const levelup = require('levelup')
const leveldown = require('leveldown')
const encodingdown = require('encoding-down')
const subleveldown = require('subleveldown')
const rocksdb = require('rocksdb')
const medeadown = require('medeadown')
const lmdb = require('node-lmdb')


console.log('level is', {level})
validate_backend('level with level()', ()=>
  bkc_with_level(
    level('/var/phorbas/test-level')
  ))


validate_backend('level with levelup(leveldown())', ()=>
  bkc_with_level(
    levelup(
      leveldown('/var/phorbas/test-leveldown'))
  ))


validate_backend('level with levelup(encodingdown(leveldown()))', ()=>
  bkc_with_level(
    levelup(
      encodingdown(
        leveldown('/var/phorbas/test-encoding-leveldown')))
  ))


validate_backend('level with subleveldown(level(), "aaa")', ()=>
  bkc_with_level(
    subleveldown(
      levelup(
        leveldown('/var/phorbas/test-sublevel-aaa')),
      "onelevel")
  ))

validate_backend('level with subleveldown(levelup(leveldown()), "bbbb")', ()=>
  bkc_with_level(
    subleveldown(
      levelup(
        leveldown('/var/phorbas/test-sublevel-bbbb')),
      "onelevel")
  ))


validate_backend('level with levelup(encodingdown(rocksdb()))', ()=>
  bkc_with_level(
    levelup(
      encodingdown(
        rocksdb('/var/phorbas/test-rocksdb')))
  ))


validate_backend('level with levelup(encodingdown(medeadown()))', ()=>
  bkc_with_level(
    levelup(
      encodingdown(
        medeadown('/var/phorbas/test-medea')))
  ))


validate_backend('lmdb', ()=> {
    const env = new lmdb.Env()
    env.open({
      path: '/var/phorbas/test-lmdb',
      mapSize: 4*1024*1024,
      maxDbs: 3 })

    return bkc_with_lmdb(env)
  })


