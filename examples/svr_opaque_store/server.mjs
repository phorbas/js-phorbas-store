import { createServer } from 'http'
import { opaque_basic, opaque_tahoe } from '@phorbas/opaque'
import { phorbas_store, bkc_with_js_map } from '@phorbas/store'
import { opaque_node_responses, with_cors } from '@phorbas/store/esm/node/opaque_node_resp.mjs'

const opaque = 0 ? opaque_basic : opaque_tahoe

const store_api = await phorbas_store(bkc_with_js_map(), {opaque})

const common_resp_opts = {
  cors: { origin: '*', max_age: 60 },
  on_error(err, stg_op) { console.error(stg_op, err) },
  extend: [with_cors] }

const my_cors_opaque_shared =
  opaque_node_responses(store_api, common_resp_opts)

const my_cors_opaque_param =
  opaque_node_responses(null, common_resp_opts)


function demo_handler(req, resp) {
  if (req.url.startsWith('/opaque/shared/')) {
    console.log(`[${req.method}, shared] hk: "${my_cors_opaque_shared.hk_for(req)}"`);

    return my_cors_opaque_shared
      .handle_by_method(req, resp)

  } else if (req.url.startsWith('/opaque/')) {
    console.log(`[${req.method}, param] hk: "${my_cors_opaque_param.hk_for(req)}"`);

    return my_cors_opaque_param
      .handle_by_method(req, resp, store_api)
  }

  // otherwise 404
  return resp.writeHeader(404).end()
}


let tiny_svr = createServer({})
  .on('listening', () => console.log("READY"))
  .on('request', demo_handler)
  .listen(9091, '127.0.0.1')

