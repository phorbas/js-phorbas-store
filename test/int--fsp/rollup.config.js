import {builtinModules} from 'module'
import rpi_dgnotify from 'rollup-plugin-dgnotify'
import rpi_resolve from '@rollup/plugin-node-resolve'

const _cfg_ = {
  external: id => builtinModules.includes(id),
  plugins: [
    rpi_dgnotify(),
    rpi_resolve(),
  ]}

export default { ..._cfg_,
  input: `./integ-test.mjs`,
  output: [
    { file: `esm/integ-test.mjs`, format: 'es', sourcemap: true },
    { file: `cjs/integ-test.cjs`, format: 'cjs', exports: 'named', sourcemap: true },
]}

