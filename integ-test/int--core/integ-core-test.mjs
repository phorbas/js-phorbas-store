import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'
import bkc_with_js_map from '@phorbas/store/esm/js_map.mjs'
import bkc_with_level from '@phorbas/store/esm/node/level.mjs'
import bkc_with_keyv from '@phorbas/store/esm/node/keyv.mjs'

const Keyv = require('keyv')

const level_mem = require('level-mem')
const levelup = require('levelup')
const encodingdown = require('encoding-down')
const memdown = require('memdown')


validate_backend('js_map', ()=> bkc_with_js_map())

validate_backend('level with level-mem()', ()=>
  bkc_with_level(
    level_mem()
  ))

validate_backend('level with levelup(encodingdown(memdown()))', ()=>
  bkc_with_level(
    levelup( encodingdown( memdown() ) )
  ))

validate_backend('level with levelup(memdown())', ()=>
  bkc_with_level(
    levelup( memdown() )
  ))

validate_backend('keyv with Map()', ()=>
  bkc_with_keyv(
    new Keyv({ store: new Map() })
  ))

