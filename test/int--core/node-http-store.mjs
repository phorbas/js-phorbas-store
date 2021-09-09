import { createServer } from 'http'
import { bkc_with_js_map } from '@phorbas/store'
import { cors_middleware_for_bkc, iso_request_hk } from '@phorbas/store/esm/node/node_server.mjs'

const my_cors_stg =
  cors_middleware_for_bkc(
    await bkc_with_js_map(),
    {
      cors: { origin: '*', max_age: 60 },
      on_error(err, stg_op) { console.error(stg_op, err) },
    })

async function demo_handler(req, res) {
  console.log(`[${req.method}] hk: "${iso_request_hk(req)}"`);

  switch (req.method) {
    case 'HEAD':
      return await my_cors_stg.resp_has(req, res)
    case 'GET':
      return await my_cors_stg.resp_get(req, res)
    case 'PUT': case 'POST':
      return await my_cors_stg.resp_set(req, res)
    case 'OPTIONS':
      return await my_cors_stg.resp_cors(req, res)
    default:
      return await my_cors_stg.resp_500(req, res)
  }
}

let tiny_svr = createServer({})
  .on('listening', () => console.log("READY"))
  .on('request', demo_handler)
  .listen(9099, '0.0.0.0')

export {tiny_svr}
