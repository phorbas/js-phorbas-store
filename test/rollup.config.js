import {builtinModules} from 'module'
import rpi_dgnotify from 'rollup-plugin-dgnotify'
import rpi_resolve from '@rollup/plugin-node-resolve'
//import rpi_commonjs from '@rollup/plugin-commonjs'


const _cfg_ = {
  plugins: [
    rpi_dgnotify(),
    rpi_resolve(),
    //rpi_commonjs(),
  ]}

const cfg_node = { ..._cfg_,
  external: id => builtinModules.includes(id),
}

const cfg_web = { ..._cfg_,
  external: id => /https?:/.test(id),
  context: 'window',
}


export default [
  { ... cfg_node, input: `./unittest.node.mjs`,
    output: { file: './__unittest.node.cjs', format: 'cjs', sourcemap: true }},

  { ... cfg_web, input: `./unittest.web.mjs`,
    output: { file: './__unittest.web.mjs', format: 'esm', sourcemap: true }},
]
