import * as test_bdd from 'node:test'

import {validate_backend} from '@phorbas/store/esm/validate_backend.js'
import kbc_with_js_map from '@phorbas/store/esm/js_map.js'

validate_backend(test_bdd, 'js_map', ()=> kbc_with_js_map())

