import { createServer } from 'http'
import { opaque_basic, opaque_tahoe } from '@phorbas/opaque'
import { phorbas_store, bkc_with_js_map } from '@phorbas/store'
import { websvr_node_bkc, with_cors } from '@phorbas/store/esm/node/websvr_node_bkc.mjs'
import { websvr_node_opaque, /* with_cors */ } from '@phorbas/store/esm/node/websvr_node_opaque.mjs'


const opaque = 0 ? opaque_basic : opaque_tahoe

const stg = await bkc_with_js_map()
const store_api = await phorbas_store(stg, {opaque})

const common_resp_opts = {
  cors: { origin: '*', max_age: 60 },
  on_error(err, stg_op) { console.error(stg_op, err) },
  extend: [with_cors] }

const my_cors_stg_shared =
  websvr_node_bkc(stg, common_resp_opts)

const my_cors_stg_param =
  websvr_node_bkc(null, common_resp_opts)

const my_cors_opaque_shared =
  websvr_node_opaque(store_api, common_resp_opts)

const my_cors_opaque_param =
  websvr_node_opaque(null, common_resp_opts)


function demo_handler(req, resp) {
  let [, path0, path1] = /^\/(\w+)\/(\w+)/.exec(req.url) || []

  console.log({path0, path1})
  if ('opaque' === path0) {
    if ('shared' === path1) {
      console.log(`OPAQUE [${req.method}, shared] hk: "${my_cors_opaque_shared.hk_for(req)}"`);
      return my_cors_opaque_shared.handle_by_method(req, resp)
    } else {
      console.log(`OPAQUE [${req.method}, param] hk: "${my_cors_opaque_param.hk_for(req)}"`);
      return my_cors_opaque_param.handle_by_method(req, resp, store_api)
    }

  } else {

    if ('shared' === path1) {
      console.log(`STG [${req.method}, shared] hk: "${my_cors_stg_shared.hk_for(req)}"`);
      return my_cors_stg_shared.handle_by_method(req, resp)
    } else {
      console.log(`STG [${req.method}, param] hk: "${my_cors_stg_param.hk_for(req)}"`);
      return my_cors_stg_param.handle_by_method(req, resp, stg)
    }

  }
}

let tiny_svr = createServer({})
  .on('listening', () => console.log("READY"))
  .on('request', demo_handler)
  .listen(9099, '0.0.0.0')

