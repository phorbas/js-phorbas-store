import { createServer } from 'http'
import { bkc_with_js_map } from '@phorbas/store'
import { node_respondWith_bkc, node_responses_bkc, with_cors } from '@phorbas/store/esm/node/node_resp.mjs'

const _node_alt_bkc = 1 ? node_respondWith_bkc : node_responses_bkc

const my_cors_stg =
  _node_alt_bkc(
    await bkc_with_js_map(),
    {
      cors: { origin: '*', max_age: 60 },
      on_error(err, stg_op) { console.error(stg_op, err) },
      extend: [with_cors],
    })

function demo_handler(req, res) {
  console.log(`[${req.method}] hk: "${my_cors_stg.hk_for(req)}"`);
  return my_cors_stg.handler(req, res)
}

let tiny_svr = createServer({})
  .on('listening', () => console.log("READY"))
  .on('request', demo_handler)
  .listen(9099, '0.0.0.0')

export {tiny_svr}
