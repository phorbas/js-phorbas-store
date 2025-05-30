import 'zx/globals'

if (!$.quiet) $.verbose = true

export const _integ_argv = process.argv.slice(
  1 + process.argv.findIndex(sz => sz.match(/\.md$/)))

export const integ_cli = minimist(_integ_argv)
export {integ_cli as cli}

export async function as_integ_config(...args) {
  let cfg = Object.assign({}, ...args)

  cfg.rollup_files ||= ['*{.,-}test.{mjs,jsy}', 'test{.,-}*.{mjs,jsy}']

  cfg.rollup_files = [].concat(
    await glob(cfg.rollup_files),
    await glob(cfg.rollup_add_files || []))

  cfg.rollup_args ??= ["--config=../rollup.integ-test.config.js"]
  cfg.docker_build_args ??= ["--file=../dkr-node-slim.dockerfile"]
  cfg.docker_run_args ??= []

  return cfg
}

