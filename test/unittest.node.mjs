import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'

import bkc_with_js_map from '@phorbas/store/esm/js_map.mjs'

validate_backend('js_map', ()=> bkc_with_js_map())
