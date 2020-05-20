import {builtinModules} from 'module'
import rpi_jsy from 'rollup-plugin-jsy'
import rpi_dgnotify from 'rollup-plugin-dgnotify'
import rpi_resolve from '@rollup/plugin-node-resolve'
//import { terser as rpi_terser } from 'rollup-plugin-terser'


const _cfg_ = {
  external: [],
  plugins: [
    rpi_jsy({defines: {PLAT_ESM: true}}),
    rpi_resolve(),
    rpi_dgnotify(),
  ]}

const cfg_node = {
  external: id => builtinModules.includes(id),
  plugins: [
    rpi_jsy({defines: {PLAT_NODEJS: true}}),
    rpi_resolve(),
    rpi_dgnotify(),
  ]}

const cfg_web = {
  external: [],
  plugins: [
    rpi_jsy({defines: {PLAT_WEB: true}}),
    rpi_resolve(),
    rpi_dgnotify(),
  ]}

const cfg_web_min = 'undefined'===typeof rpi_terser ? null
  : { ... cfg_web, plugins: [ ... cfg_web.plugins, rpi_terser() ]}

const _out_ = { sourcemap: true }


const configs = []
export default configs


add_jsy('index', {all: true})
add_jsy('validate_backend', {plat_node: true, plat_web: true})

add_jsy('js_map')

add_jsy('web_db', {category: 'local/', plat_web: true})
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

add_jsy('sqlite3', {category: 'sql/', plat_node: true})
add_jsy('knex', {category: 'sql/', all: true})
//add_jsy('cassandra', {category: 'sql/', plat_node: true})


function add_jsy(src_name, opt={}) {
  const input = `code/${opt.category || ''}${src_name}${opt.ext || '.jsy'}`

  if (opt.all || opt.plat_esm || !opt.plat_node && !opt.plat_web)
    configs.push({ ... _cfg_, input,
      output: { ..._out_, file: `esm/${src_name}.mjs`, format: 'es' }})

  if (opt.all || opt.plat_node)
    configs.push({ ... cfg_node, input,
      output: { ..._out_, file: `esm/node/${src_name}.mjs`, format: 'es' }})

  if (opt.all || opt.plat_web) {
    configs.push({ ... cfg_web, input,
      output: { ..._out_, file: `esm/web/${src_name}.mjs`, format: 'es' }})

    if (cfg_web_min)
      configs.push({ ... cfg_web_min, input,
        output: { ..._out_, file: `esm/web/${src_name}.min.mjs`, format: 'es' }})
  }
}
