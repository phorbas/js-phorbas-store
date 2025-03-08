import rpi_jsy from 'rollup-plugin-jsy'
import rpi_resolve from '@rollup/plugin-node-resolve'

export default {
  plugins: [ rpi_jsy(), rpi_resolve() ],
  external: id => /^\w+:|^#/.test(id),
  output: { dir: `esm-test/`, format: 'es', sourcemap: true },
}
