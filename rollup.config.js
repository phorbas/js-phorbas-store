import rpi_jsy from 'rollup-plugin-jsy'
import rpi_resolve from '@rollup/plugin-node-resolve'

const external = id => /^\w+:|^#/.test(id)

const pkg_phrobas_store_group = (group, kw) => ({
    plugins: [ rpi_jsy(), rpi_resolve() ],
    external,
    output: { dir: group ? `esm/${group}/` : 'esm/', format: 'es', sourcemap: true },
    ...kw,
  })

export const pkg_cfg_core = pkg_phrobas_store_group('', {
  input: [
    'code/index.jsy',
    'code/validate_backend.jsy',
    'code/core.jsy',
    'code/js_map.jsy',
  ]})

export const pkg_abstract = pkg_phrobas_store_group('abstract', {
  input: [
    'code/abstract/abstract.jsy',
    'code/abstract/abstract_single.jsy',
    'code/abstract/abstract_stream.jsy',
  ]})

export const pkg_cfg_xform = pkg_phrobas_store_group('xform', {
  input: [
    'code/xform/index.jsy',
    'code/xform/multi.jsy',
    'code/xform/multi_stream.jsy',
    'code/xform/multi_path.jsy',

    'code/xform/xform.jsy',
    'code/xform/xform_stream.jsy',
    'code/xform/opaque.jsy',

    'code/xform/channel.jsy',
  ]})

export const pkg_cfg_web = pkg_phrobas_store_group('web', {
  input: [
    'code/web/fetch.jsy',

    'code/web/web_db_core.jsy',
    'code/web/web_db.jsy',
    'code/web/web_cache.jsy',
    'code/web/web_cache_fetch.jsy',
    'code/web/web_storage.jsy',
    'code/web/web_dom.jsy',
  ]})

export const pkg_cfg_websvr = pkg_phrobas_store_group('websvr', {
  input: [
    'code/websvr/webstd.jsy',
    'code/websvr/http_kbc.jsy',
    'code/websvr/hono_kbc.jsy',
  ]})

export const pkg_cfg_local = pkg_phrobas_store_group('local', {
  input: [
    'code/local/local_fs.jsy',
    'code/local/local_fsp.jsy',
    'code/local/lmdb.jsy',
  ]})

export const pkg_cfg_adapter = pkg_phrobas_store_group('adapter', {
  input: [
    'code/adapter/level.jsy',
    'code/adapter/keyv.jsy',
  ]})

export const pkg_cfg_nosql = pkg_phrobas_store_group('nosql', {
  input: [
    'code/nosql/memjs.jsy',
    'code/nosql/minio.jsy',
    'code/nosql/s3_aws4fetch.jsy',
    'code/nosql/pouchdb.jsy',
    'code/nosql/couchdb.jsy',
    'code/nosql/arangojs.jsy',
    'code/nosql/consulkv.jsy',
    'code/nosql/dynamodb.jsy',
    'code/nosql/rethinkdb.jsy',
    'code/nosql/ioredis.jsy',
    'code/nosql/mongojs.jsy',
  ]})

export const pkg_cfg_sql = pkg_phrobas_store_group('sql', {
  input: [
    'code/sql/sqlite3.jsy',
    'code/sql/better_sqlite3.jsy',
    'code/sql/knex.jsy',
  ]})

export const pkg_test_cfg = {
  plugins: [ rpi_jsy(), rpi_resolve() ],
  external,
  output: { dir: 'esm-test', format: 'es', sourcemap: true },
  input: {
    'test-core': './test/core/unittest.jsy',
    'test-xform': './test/xform/unittest.jsy',
    'test-web': './test/web/unittest.jsy',
    'test-local': './test/local/unittest.jsy',
    'test-nosql': './test/nosql/unittest.jsy',

    'test-integ-local': './test/local/integtest.js',
    'test-integ-web': './test/web/integtest.js',
    'test-integ-nosql': './test/nosql/integtest.js',
  },
}

export default [
  pkg_cfg_core,
  pkg_abstract,
  pkg_cfg_xform,
  pkg_cfg_web,
  pkg_cfg_websvr,
  pkg_cfg_local,
  pkg_cfg_adapter,
  pkg_cfg_nosql,
  pkg_cfg_sql,

  pkg_test_cfg,
]
