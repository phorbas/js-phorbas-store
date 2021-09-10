import { createServer } from 'http'
import { opaque_basic, opaque_tahoe } from '@phorbas/opaque'
import { phorbas_store, bkc_with_js_map } from '@phorbas/store'
import { opaque_node_responses, with_cors } from '@phorbas/store/esm/node/opaque_node_resp.mjs'

const opaque = 0 ? opaque_basic : opaque_tahoe

export const store_api = await phorbas_store(bkc_with_js_map(), {opaque})

const my_cors_stg =
  opaque_node_responses(
    await store_api,
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
  .listen(9090, '0.0.0.0')

