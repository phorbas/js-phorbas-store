export function validate_opaque(grp_name, opts={}) {
  describe(grp_name || 'websvr opaque', () => {
    validate_opaque_with_ky(
      'with shared `node int--core/node-http-store.mjs`',
      'http://127.0.0.1:9099/opaque/shared/', opts)

    validate_opaque_with_ky(
      'with param `node int--core/node-http-store.mjs`',
      'http://127.0.0.1:9099/opaque/param/', opts)
  })
}


export function validate_opaque_with_ky(grp_name, url_dest, {expect, ky}) {
  describe(grp_name, () => {
    let resty = _bind_resty_api(url_dest, ky)

    it('round-trip set/POST', async () => {
      let str = 'example test string'
      let k21 = resty.q_set_text(str)
      k21 = await expect.promise(k21)
      expect.array(k21)
      expect.string(k21[0])
      expect.string(k21[1])

      let res_has = resty.q_has(k21[1])
      res_has = await expect.promise(res_has)

      let res = resty.q_get(k21[1])
      res = await expect.promise(res)
      let rt_str = await res.text()
      expect.ok(str == rt_str)
    })

    it('round-trip set/PUT', async () => {
      let json = {a: 21, b: 42, c: 'works'}
      let k21 = resty.q_put({json})
      k21 = await expect.promise(k21)
      expect.array(k21)
      expect.string(k21[0])
      expect.string(k21[1])

      let res_has = resty.q_has(k21[1])
      res_has = await expect.promise(res_has)

      let res = resty.q_get(k21[1])
      res = await expect.promise(res)
      let rt_json = await res.json()
      expect.ok(json.a == rt_json.a)
      expect.ok(json.b == rt_json.b)
      expect.ok(json.c == rt_json.c)
    })

    it('has/HEAD for non-existant key', async () => {
      let k_dne = '4c3698da4b6aa9355a806cdf5b283a2252a13cf518c7ba3b4b2e7743e145eb42'
      let res = resty.q_has(k_dne)
      try {
        res = await expect.promise(res)
        expect.ok(false, 'Expected an error')
      } catch (err) {
      }
    })
  })
}

function _bind_resty_api(url_dest, ky) {
  return {
    async q_has(hk) {
      hk = await hk
      if (Array.isArray(hk)) hk = hk[1]
      let res = await ky.head(new URL(hk, url_dest))
      return res },

    async q_get(hk) {
      hk = await hk
      if (Array.isArray(hk)) hk = hk[1]
      let res = await ky.get(new URL(hk, url_dest))
      return res },

    async q_set_text(body) {
      return this.q_set({body,
        headers: {'Content-Type': 'text/plain; charset=UTF-8'}}) },

    async q_set(post_arg) {
      let res = await ky.post(url_dest, post_arg)

      let hk2 = res.headers.get('x-hk2')
      let hk1 = res.headers.get('x-hk1')
      return [hk2, hk1] },

    async q_put(post_arg) {
      let res = await ky.post(url_dest, post_arg)

      let hk2 = res.headers.get('x-hk2')
      let hk1 = res.headers.get('x-hk1')
      return [hk2, hk1] },
  }
}
