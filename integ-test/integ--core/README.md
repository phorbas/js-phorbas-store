# @phorbas/store integration tests for core backends

The `integ--core` package provides backend services for browser-based tests as well.

Includes: `fetch`, `s3_aws4fetch`, `minio`, `pouchdb`, 


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
  await $`docker build ${cfg.docker_build_args} .`
  let _dkr_id_ = await $`docker build ${cfg.docker_build_args} -q .`
  await $`docker run ${cfg.docker_run_args} --rm -t ${_dkr_id_} ${cli._}`
}
```


