import { createServer } from 'http'
import { bkc_js_map } from '@phorbas/store'
import { http_bkc } from '@phorbas/store/esm/websvr/http_bkc.js'

const stg = await bkc_js_map()
const example_http = http_bkc({stg})

async function demo_handler(req, resp) {
  req.params ??= {}
  resp.setHeader('Access-Control-Allow-Origin', '*') // only for integ testing

  if ('OPTIONS' === req.method) {
    resp.writeHead( 204, {
      'Allow': 'OPTIONS, HEAD, GET, PUT, POST',
      'Access-Control-Max-Age': 60,
      'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, PUT, POST',
      'Access-Control-Allow-Headers': 'Content-Type, Content-Length, x-hk',
    })
    return resp.end()
  }

  req.params.key = req.url.split('/').at(-1)
  return await example_http(req, resp)
}


export const tiny_http_websvr =
  createServer({})
    .listen( 9099, '0.0.0.0')
    .on('request', demo_handler)
    .on('listening', () => console.log("READY builtin http"))

