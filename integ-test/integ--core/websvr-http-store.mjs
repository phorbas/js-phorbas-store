import { createServer } from 'http'
import { kbc_js_map } from '@phorbas/store'
import { http_kbc } from '@phorbas/store/esm/websvr/http_kbc.js'

const stg = await kbc_js_map()
const example_http = http_kbc({stg})

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

