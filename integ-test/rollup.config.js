import {builtinModules} from 'module'
import rpi_dgnotify from 'rollup-plugin-dgnotify'
import rpi_resolve from '@rollup/plugin-node-resolve'


const _cfg_ = {
  plugins: [
    rpi_dgnotify(),
    rpi_resolve(),
  ]}

const ignores = ['node-domexception']
const cfg_node = { ..._cfg_,
  external: id => /^\w+:/.test(id)
    || builtinModules.includes(id)
    || ignores.includes(id),
}

const cfg_web = { ..._cfg_,
  external: id => /\w+:/.test(id) || ignores.includes(id),
  context: 'window',
}


export default [
  { ... cfg_node, input: {'unittest.node': `./unittest.node.mjs`},
    preserveEntrySignatures: false,
    output: { dir: './cjs/', format: 'cjs', sourcemap: true }},

  { ... cfg_web, input: {'unittest.web': `./unittest.web.mjs`},
    output: { dir: './esm/', format: 'esm', sourcemap: true }},
]
