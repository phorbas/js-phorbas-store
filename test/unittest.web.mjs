import validate_backend from '@phorbas/store/esm/web/validate_backend.mjs'

import bkc_with_js_map from '@phorbas/store/esm/js_map.mjs'
import bkc_with_web_db from '@phorbas/store/esm/web/web_db.mjs'


validate_backend('js_map', ()=> bkc_with_js_map())

validate_backend('web_db', ()=> bkc_with_web_db())

