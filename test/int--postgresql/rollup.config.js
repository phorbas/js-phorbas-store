import {builtinModules} from 'module'
import rpi_dgnotify from 'rollup-plugin-dgnotify'
import rpi_resolve from '@rollup/plugin-node-resolve'

import pkg from './integ-package.json' with {type: 'json'}
pkg.dependencies ||= {} // ensure a dependencies dict

const _cfg_ = {
  external: id => (
       /^\w+:/.test(id)
    || builtinModules.includes(id)
    || !! pkg.dependencies[id]
    ),
  plugins: [
    rpi_dgnotify(),
    rpi_resolve(),
  ]}

export default { ..._cfg_,
  input: `./integ-test.mjs`,
  output: { file: `cjs/integ-test.cjs`, format: 'cjs', exports: 'named', sourcemap: true },
}

