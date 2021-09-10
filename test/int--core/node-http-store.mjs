import { createServer } from 'http'
import { bkc_with_js_map } from '@phorbas/store'
import { node_responses_bkc, with_cors } from '@phorbas/store/esm/node/node_resp.mjs'

const my_cors_stg =
  node_responses_bkc(
    await bkc_with_js_map(),
    {
      cors: { origin: '*', max_age: 60 },
      on_error(err, stg_op) { console.error(stg_op, err) },
      extend: [with_cors],
    })

function demo_handler(req, resp) {
  console.log(`[${req.method}] hk: "${my_cors_stg.hk_for(req)}"`);
  return my_cors_stg.handler(req, resp)
}

let tiny_svr = createServer({})
  .on('listening', () => console.log("READY"))
  .on('request', demo_handler)
  .listen(9099, '0.0.0.0')

