import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { bkc_with_js_map } from '@phorbas/store'
import { websvr_node_bkc, with_cors } from '@phorbas/store/esm/node/websvr_node_bkc.mjs'

const stg = await bkc_with_js_map()

const common_resp_opts = {
  cors: { origin: '*', max_age: 60 },
  on_error(err, stg_op) { console.error(stg_op, err) },
  extend: [with_cors] }

const my_cors_stg_shared =
  websvr_node_bkc(stg, common_resp_opts)

const my_cors_stg_param =
  websvr_node_bkc(null, common_resp_opts)



function demo_handler(req, resp) {
  let {url} = req
  if (url.startsWith('/stg/shared/')) {
    console.log(`[${req.method}, shared] hk: "${my_cors_stg_shared.hk_for(req)}"`);

    return my_cors_stg_shared
      .handle_by_method(req, resp)
  }

  if (url.startsWith('/stg/')) {
    console.log(`[${req.method}, param] hk: "${my_cors_stg_param.hk_for(req)}"`);

    return my_cors_stg_param
      .handle_by_method(req, resp, stg)
  }

  // otherwise 404
  console.warn({code: 404, url})
  return resp.writeHeader(404).end()
}


export let tiny_svr = await new Promise(ready =>
  createServer({})
    .on('request', demo_handler)
    .on('listening', function() {ready(this)})
    .listen(9091, '127.0.0.1'))

