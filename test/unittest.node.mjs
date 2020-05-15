import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_js_map from '@phorbas/store/esm/js_map.mjs'
import bkc_with_level from '@phorbas/store/esm/node/level.mjs'

const level_mem = require('level-mem')
const levelup = require('levelup')
const encodingdown = require('encoding-down')
const memdown = require('memdown')

validate_backend('js_map', ()=> bkc_with_js_map())

validate_backend('level with level-mem()', ()=>
  bkc_with_level(
    level_mem()
  ))

validate_backend('level with levelup @ encodingdown @ memdown()', ()=>
  bkc_with_level(
    levelup( encodingdown( memdown() ) )
  ))

validate_backend('level with levelup @ encodingdown @ memdown()', ()=>
  bkc_with_level(
    levelup( memdown() )
  ))

