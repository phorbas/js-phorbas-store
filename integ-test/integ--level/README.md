# @phorbas/store integration tests for filesystem backends

## Integration test using Docker

Use `npx zx README.md` to run this integration test.

```javascript
import pkg from './package.json' with {type: 'json'}
import {cli, as_integ_config} from '@phorbas/store/integ-zx-cli'
const cfg = await as_integ_config(pkg.integ_test)

await fs.emptyDir(`./esm-test`)

if (false !== cli.build) {
  await $`npx rollup ${cfg.rollup_args} ${cfg.rollup_files}`
}

if (false !== cli.docker) {
  await $`docker build ${cfg.docker_args} .`
  let _dkr_id_ = await $`docker build ${cfg.docker_args} -q .`
  await $`docker run --rm -t ${_dkr_id_} ${cli._}`
}
```

