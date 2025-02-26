import {builtinModules} from 'module'
import rpi_jsy from 'rollup-plugin-jsy'
import rpi_dgnotify from 'rollup-plugin-dgnotify'
import rpi_resolve from '@rollup/plugin-node-resolve'
//import { terser as rpi_terser } from 'rollup-plugin-terser'


const _rpis_ = (defines, ...args) => [
  rpi_jsy({defines}),
  rpi_resolve(),
  ...args,
  rpi_dgnotify()]

const external = id => /^\w+:/.test(id) || builtinModules.includes(id)

const _cfg_ = { external, plugins: _rpis_({PLAT_ESM: true}) }

const cfg_node = { external, plugins: _rpis_({PLAT_NODEJS: true}) }

const cfg_web = { external, plugins: _rpis_({PLAT_WEB: true}) }

const cfg_web_min = 'undefined'===typeof rpi_terser ? null
  : { ... cfg_web, plugins: [ ... cfg_web.plugins, rpi_terser() ]}

const _out_ = { sourcemap: true }


const configs = []
export default configs


add_jsy('index', {all: true})
add_jsy('validate_backend', {plat_node: true, plat_web: true})

add_jsy('js_map')
add_jsy('js_delegate')

add_jsy('fetch', {category: 'web/', plat_node: true, plat_web: true})
add_jsy('web_db', {category: 'web/', plat_web: true})
add_jsy('web_cache', {category: 'web/', plat_web: true})
add_jsy('web_cache_fetch', {category: 'web/', plat_web: true})
add_jsy('web_storage', {category: 'web/', plat_web: true})
add_jsy('web_dom', {category: 'web/', plat_web: true})

add_jsy('websvr_core_bkc', {category: 'websvr/', all: true})
add_jsy('websvr_core_opaque', {category: 'websvr/', all: true})
add_jsy('websvr_node_bkc', {category: 'websvr/', plat_node: true})
add_jsy('websvr_node_opaque', {category: 'websvr/', plat_node: true})

add_jsy('fs', {category: 'local/'})
add_jsy('fsp', {category: 'local/'})
add_jsy('lmdb', {category: 'local/', plat_node: true})

add_jsy('level', {category: 'adapter/', plat_node: true})
add_jsy('keyv', {category: 'adapter/', plat_node: true})

add_jsy('minio', {category: 'nosql/', plat_node: true})
add_jsy('s3_aws4fetch', {category: 'nosql/', all: true})
add_jsy('ioredis', {category: 'nosql/', plat_node: true})
add_jsy('memjs', {category: 'nosql/', plat_node: true})
add_jsy('mongojs', {category: 'nosql/', plat_node: true})
add_jsy('rethinkdb', {category: 'nosql/', plat_node: true})
add_jsy('arangojs', {category: 'nosql/', plat_node: true, plat_web: true})
add_jsy('dynamodb', {category: 'nosql/', plat_node: true, plat_web: true})
add_jsy('consulkv', {category: 'nosql/', plat_node: true})
add_jsy('pouchdb', {category: 'nosql/', all: true})
add_jsy('couchdb', {category: 'nosql/', plat_node: true})

add_jsy('sqlite3', {category: 'sql/', plat_node: true})
add_jsy('knex', {category: 'sql/', all: true})
//add_jsy('cassandra', {category: 'sql/', plat_node: true})


function add_jsy(src_name, opt={}) {
  const input = `code/${opt.category || ''}${src_name}${opt.ext || '.jsy'}`

  if (opt.all || opt.plat_esm || !opt.plat_node && !opt.plat_web)
    configs.push({ ... _cfg_, input,
      output: [
        { ..._out_, file: `esm/${src_name}.js`, format: 'es' },
        { ..._out_, file: `esm/${src_name}.mjs`, format: 'es' },
      ]})

  if (opt.all || opt.plat_node)
    configs.push({ ... cfg_node, input,
      output: [
        { ..._out_, file: `esm/node/${src_name}.js`, format: 'es' },
        { ..._out_, file: `esm/node/${src_name}.mjs`, format: 'es' },
      ]})

  if (opt.all || opt.plat_web) {
    configs.push({ ... cfg_web, input,
      output: [
        { ..._out_, file: `esm/web/${src_name}.js`, format: 'es' },
        { ..._out_, file: `esm/web/${src_name}.mjs`, format: 'es' },
      ]})

    if (cfg_web_min)
      configs.push({ ... cfg_web_min, input,
        output: [
          { ..._out_, file: `esm/web/${src_name}.min.js`, format: 'es' },
          { ..._out_, file: `esm/web/${src_name}.min.mjs`, format: 'es' },
        ]})
  }
}
