import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'

import { kbc_js_map } from '@phorbas/store'
import { hono_kbc } from '@phorbas/store/esm/websvr/hono_kbc.js'

const stg = await kbc_js_map()
const example_hono = hono_kbc({stg})

const app = new Hono()

app.use('/use_hono/*', 
  cors({
    origin: '*',
    maxAge: 60,
    allowMethods: ['OPTIONS', 'HEAD', 'GET', 'PUT', 'POST'],
    allowHeaders: ['Content-Type, Content-Length, x-hk']
  })
)

app.all('/use_hono/a/b/c/:key', example_hono)


export const tiny_hono_websvr =
  serve({fetch: app.fetch, port: 9098})
    .on('listening', () => console.log("READY Hono"))

