import {builtinModules} from 'module'
import rpi_jsy from 'rollup-plugin-jsy'
import rpi_dgnotify from 'rollup-plugin-dgnotify'
import rpi_resolve from '@rollup/plugin-node-resolve'

const _cfg_ = {
  external: id => builtinModules.includes(id),
  plugins: [
    rpi_dgnotify(),
    rpi_resolve(),
    rpi_jsy(),
  ]}

export default [
  { ..._cfg_, input: `./integ-test.jsy`, output: [
    { file: `esm/integ-test.mjs`, format: 'es', sourcemap: true },
    { file: `cjs/integ-test.cjs`, format: 'cjs', exports: 'named', sourcemap: true },
  ]}
]

