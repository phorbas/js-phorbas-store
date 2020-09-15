const db = new Map()
const common_headers = {
  'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
  'Access-Control-Max-Age': '60', // '3600',
}

const get_headers = {
  ... common_headers,
  'Content-Type': 'application/octet-stream' }

const put_headers = { ... common_headers }

const option_headers = {
  ... common_headers,
  'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Content-Length, x-hk',
}


require('http')
  .createServer({})

  .on('request', (req, res) => {
      console.log(`[${req.method}] x-hk: "${req.headers['x-hk'] || '-'}" url: "${req.url}"`);
      let fn = hdl[req.method] || hdl._noop
      fn(req, res)
    })

  .listen(9099)


const key_from_req = req =>
  [... req.url.split('/'), req.headers['x-hk']]
    .filter(Boolean).join('/')

const hdl = {
  OPTIONS(req, res) {
    res.writeHead(200, option_headers)
    res.end()
  },

  _noop(req, res) { res.writeHead(500).end() },

  HEAD(req, res) { hdl._get(req, res) },
  GET(req, res)  { hdl._get(req, res) },
  PUT(req, res)  { hdl._put(req, res) },
  POST(req, res) { hdl._put(req, res) },

  async _get(req, res, is_head) {
    let key = key_from_req(req)
    let buf = db.get(key)
    if ( undefined === buf ) {
      res.writeHead( 404, get_headers )
      res.end()
      return
    }

    buf = await buf
    res.writeHead( 200,
      { ... get_headers,
        'Content-Length': buf.byteLength, })
    res.end( is_head ? void buf : buf )
  },

  _put(req, res) {
    let key = key_from_req(req)
    
    db.set(key, 
      new Promise( async done => {
        let buf = []
        for await (chunk of req)
          buf.push(chunk)
        
        buf = Buffer.concat(buf)
        done(buf)
        res.writeHead( 200, put_headers )
        res.end()
      }))
  },
}
