import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { opaque_basic, opaque_tahoe } from '@phorbas/opaque'
import { phorbas_store, bkc_with_js_map } from '@phorbas/store'
import { websvr_node_opaque, with_cors } from '@phorbas/store/esm/node/websvr_node_opaque.mjs'

const use_tahoe = !!( Date.now() & 0x400 )

const opaque = use_tahoe ? opaque_tahoe : opaque_basic

const store_api = await phorbas_store(bkc_with_js_map(), {opaque})

const common_resp_opts = {
  cors: { origin: '*', max_age: 60 },
  on_error(err, stg_op) { console.error(stg_op, err) },
  extend: [with_cors] }

const my_cors_opaque_shared =
  websvr_node_opaque(store_api, common_resp_opts)

const my_cors_opaque_param =
  websvr_node_opaque(null, common_resp_opts)


function demo_handler(req, resp) {
  let {url} = req
  if (url.startsWith('/opaque/shared/')) {
    console.log(`[${req.method}, shared] hk: "${my_cors_opaque_shared.hk_for(req)}"`);

    return my_cors_opaque_shared
      .handle_by_method(req, resp)
  }

  if (url.startsWith('/opaque/')) {
    console.log(`[${req.method}, param] hk: "${my_cors_opaque_param.hk_for(req)}"`);

    return my_cors_opaque_param
      .handle_by_method(req, resp, store_api)
  }

  if ('/' === url || '/index.html' === url) {
    // simple all-in-one index.html demo page
    resp.writeHeader(200, {'Content-Type': 'text/html'})
    return createReadStream('./index.html').pipe(resp)
  }

  // otherwise 404
  console.warn({code: 404, url})
  return resp.writeHeader(404).end()
}


let tiny_svr = createServer({})
  .on('request', demo_handler)
  .on('listening', () => {
      console.log("READY on http://127.0.0.1:9091/")
    })
  .listen(9091, '127.0.0.1')

