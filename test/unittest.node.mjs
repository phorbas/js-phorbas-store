import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_js_map from '@phorbas/store/esm/js_map.mjs'
import bkc_with_level from '@phorbas/store/esm/node/level.mjs'

const level_mem = require('level-mem')


validate_backend('js_map',
  ()=> bkc_with_js_map())

validate_backend('level with level-mem()',
  ()=> bkc_with_level( level_mem() ))

