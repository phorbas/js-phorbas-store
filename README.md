# PHORBAS Store

A PHORBAS store is an associative 1:1 key to binary content data storage abstraction.
Key must be a string, although often hex encoded from cryptographic hashing via [PHORBAS Opaque][].
Content is binary (`ArrayBuffer`), direclty supporting encrypted content.
The store handles the principles of **Persistent**, **Binary content**, **Addressable**, and **Store**.

- [PHORBAS Opaque][] handles the principle of **Hashed**, **Opaque**, and **Addressable**.
- [PHORBAS HAMT][] handles the principle of **Replicable**.

 [PHORBAS Opaque]: https://github.com/phorbas/js-phorbas-opaque
 [PHORBAS HAMT]: https://github.com/phorbas/js-phorbas-hamt


## API & Use

```javascript
import {kbc_js_map} from '@phorbas/store'

// use one of the many backend storage adapters
let stg = kbc_js_map()

// keys are opaque strings; some backend adapters may route based on parts of keys
let some_key = `some_key_${Date.now().toString(36)}`

await stg.bkc_exists(some_key) // 0

// store binary content addressed by key
let binary_body = crypto.getRandomValues(new Uint32Array(1024))
await stg.bkc_store(some_key, binary_body)


// key now exists
await stg.bkc_exists(some_key) // 1

// and we can fetch the binary content, returned in an ArrayBuffer
let body_result = await stg.bkc_fetch(some_key)

```

The backend storage API is fundamentally asynchronous, designed for use with `@phorbas/opaque`.
The `kbc` prefix is for "keyed binary content".

- `async kbc_exists(key)` returns `1` if exists, otherwise `0`
- `async kbc_fetch(key)` returns `ArrayBuffer` if exists, otherwise `null|undefined`
- `async kbc_store(key, body)` returns `error | null`, where error is `null` upon success.

- `async * kbc_stream_exists(key_aiter, {signal})` is an async iterable streaming version of `kbc_stream_exists`
- `async * kbc_stream_fetch(key_aiter, {signal})` is an async iterable streaming version of `kbc_stream_fetch`
- `async * kbc_stream_store(key_body_aiter, {signal})` is an async iterable streaming version of `kbc_store`


## Storage Implementations

#### JavaScript, Browser, and WinterCG

| Unit Test | Integ Test | Technology / Library | Implementation |
|-----------|------------|----------------------|----------------|
| ✅ | ✅ | JS [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) <br/> `new Map()` | impl: [code/js_map.jsy](code/js_map.jsy) <br/> [test_js_map.jsy](test/core/test_js_map.jsy) <br/> [integ--core/integ-core.test.mjs](integ-test/integ--core/integ-core.test.mjs)
| ✅ | ✅ | JS [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) <br/> `globalThis.fetch()` | impl: [code/web/fetch.jsy](code/web/web_fetch.jsy) <br/> [integ_fetch.jsy](test/web/integ_fetch.jsy) <br/> [integ--core/integ-web.test.mjs](integ-test/integ--core/integ-web.test.mjs)
| ✅ |    | Browser [DOM Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage) <br/> `globalThis.localStorage` or `globalThis.sessionStorage` | impl: [code/web/web_storage.jsy](code/web/web_storage.jsy) <br/> [test_web_storage.jsy](test/web/test_web_storage.jsy)
| ✅ |    | Browser [DOM Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) <br/> `document.createElement()` | impl: [code/web/web_dom.jsy](code/web/web_dom.jsy) <br/> [test_web_dom.jsy](test/web/test_web_dom.jsy)
| ✅ |    | Browser [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) <br/> `globalThis.indexedDB.open()` | impl: [code/web/web_db.jsy](code/web/web_db.jsy) <br/> [test_web_db.jsy](test/web/test_web_db.jsy)
| ✅ | ✅ | Browser [Service Worker Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) <br/> `globalThis.caches.open()` | impl: [code/web/web_cache.jsy](code/web/web_cache.jsy) <br/> [test_web_cache.jsy](test/web/test_web_cache.jsy) <br/> [integ_web_cache_fetch.jsy](test/web/integ_web_cache_fetch.jsy)


#### Local

| Unit Test | Integ Test | Technology / Library | Implementation |
|-----------|------------|----------------------|----------------|
|    | ✅ | [LMDB](https://symas.com/lmdb/) <br/> [node-lmdb](https://github.com/Venemo/node-lmdb#readme) | impl: [code/local/lmdb.jsy](code/local/lmdb.jsy) <br/> [integ--level/integ-lmdb.test.mjs](integ-test/integ--level/integ-lmdb.test.mjs)
|    | ✅ | [LevelDB](https://github.com/google/leveldb) <br/> [Level ecosystem](https://github.com/Level/level) | impl: [code/adapter/level.jsy](code/adapter/level.jsy) <br/> [integ--level/integ-level.test.mjs](integ-test/integ--level/integ-level.test.mjs)
| ✅ | ✅ | Node [FS Promises API](https://nodejs.org/api/fs.html#fs_fs_promises_api) <br/> `import * as fsp from 'node:fs/promises'` | impl: [code/local/fsp.jsy](code/local/fsp.jsy) <br/> [test_local_fsp.jsy](test/local/test_local_fsp.jsy) <br/> [integ--local/integ-fs-promises.test.mjs](integ-test/integ--local/integ-fs-promises.test.mjs)
| ✅ | ✅ | Node [FS API](https://nodejs.org/api/fs.html) <br/> `import * as fs from 'node:fs'` | impl: [code/local/fs.jsy](code/local/fs.jsy) <br/> [test_local_fs.jsy](test/local/test_local_fs.jsy) <br/> [integ--local/integ-fs.test.mjs](integ-test/integ--local/integ-fs.test.mjs)
| ✅ | ✅ | Web FS & FS Promises via [lightning-fs](https://github.com/isomorphic-git/lightning-fs#readme) from [isomorphic-git](https://isomorphic-git.org/) | impl: [code/local/fsp.jsy](code/local/fsp.jsy) <br/> [integ_web_lightning-fs.js](test/local/integ_web_lightning-fs.js)


#### NoSQL

| Integ Test | Technology / Library | Implementation |
|------------|------------|----------------------|----------------|
| ⚠️ | [ArangoDB](https://www.arangodb.com) <br/> [arangojs](https://github.com/arangodb/arangojs) | impl: [code/nosql/arangojs.jsy](code/nosql/arangojs.jsy) <br/> [integ--arangodb/integ-arango.test.mjs](integ-test/integ--arangodb/integ-arango.test.mjs) <br/> **note:** Binary values encode in base64
| ✅ | [CouchDB](http://couchdb.apache.org) <br/> [nano](https://www.npmjs.com/package/nano) | impl: [code/nosql/couchdb.jsy](code/nosql/couchdb.jsy) <br/> [integ--couchdb/integ-couchdb.test.mjs](integ-test/integ--couchdb/integ-couchdb.test.mjs)
| ✅ | [PouchDB](https://pouchdb.com) <br/> [pouchdb](https://www.npmjs.com/package/pouchdb) | impl: [code/nosql/pouchdb.jsy](code/nosql/pouchdb.jsy) <br/> [test/nosql/integ_pouchdb.jsy](test/nosql/integ_pouchdb.jsy) <br/> [integ--couchdb/integ-pouchdb.test.mjs](integ-test/integ--couchdb/integ-pouchdb.test.mjs)
| ✅ | [Consul KV](https://www.consul.io/docs/dynamic-app-config/kv) <br/> [node-consul](https://www.npmjs.com/package/consul) | impl: [code/nosql/consulkv.jsy](code/nosql/consulkv.jsy) <br/> [integ--consulkv/integ-consul.test.mjs](integ-test/integ--consulkv/integ-consul.test.mjs)
| ✅ | [AWS DynamoDB](https://aws.amazon.com/dynamodb/) <br/> [aws-sdk](https://www.npmjs.com/package/aws-sdk) | impl: [code/nosql/dynamodb.jsy](code/nosql/dynamodb.jsy) <br/> [integ--dynamodb/integ-dynamodb.test.mjs](integ-test/integ--dynamodb/integ-dynamodb.test.mjs)
| ✅ | [Memcache](https://memcached.org/) <br/> [memjs](http://github.com/memcachier/memjs#readme) | impl: [code/nosql/memjs.jsy](code/nosql/memjs.jsy) <br/> [integ--memcache/integ-memjs.test.mjs](integ-test/integ--memcache/integ-memjs.test.mjs)
| ✅ | [MongoDB](https://www.mongodb.com/) <br/> [mongojs](https://github.com/mongo-js/mongojs#readme) | impl: [code/nosql/mongojs.jsy](code/nosql/mongojs.jsy) <br/> [integ--mongodb/integ-mongodb.test.mjs](integ-test/integ--mongodb/integ-mongodb.test.mjs)
| ✅ | [FerretDB](https://www.ferretdb.com) <br/> [mongojs](https://github.com/mongo-js/mongojs#readme) | impl: [code/nosql/mongojs.jsy](code/nosql/mongojs.jsy) <br/> [integ--mongodb/integ-mongodb.test.mjs](integ-test/integ--mongodb/integ-mongodb.test.mjs)
| ✅ | [Redis](https://redis.io/) <br/> [ioredis](https://github.com/luin/ioredis#readme) | impl: [code/nosql/ioredis.jsy](code/nosql/ioredis.jsy) <br/> [integ--redis/integ-ioredis.test.mjs](test/integ--redis/integ-ioredis.test.mjs)
| ✅ | [Valkey](https://valkey.io) <br/> [ioredis](https://github.com/luin/ioredis#readme) | impl: [code/nosql/ioredis.jsy](code/nosql/ioredis.jsy) <br/> [integ--redis/integ-ioredis.test.mjs](test/integ--redis/integ-ioredis.test.mjs) 
| ✅ | [RethinkDB](https://rethinkdb.com) <br/> [rethinkdb](https://www.npmjs.com/package/rethinkdb) | impl: [code/nosql/rethinkdb.jsy](code/nosql/rethinkdb.jsy) <br/> [integ--rethinkdb/integ-rethinkdb.test.mjs](integ-test/integ--rethinkdb/integ-rethinkdb.test.mjs)


##### S3 NoSQL

| Integ Test | Technology / Library | Implementation |
|------------|----------------------|----------------|
| ✅ | [MinIO](https://min.io/) <br/> [minio](https://github.com/minio/minio-js#readme) | impl: [code/nosql/minio.jsy](code/nosql/minio.jsy) <br/> [integ--core/integ-minio.test.mjs](integ-test/integ--core/integ-minio.test.mjs)
| ✅ | [AWS S3](https://aws.amazon.com/s3/) or compatible <br/> [aws4fetch](https://github.com/mhart/aws4fetch) | impl: [code/nosql/s3_aws4fetch.jsy](code/nosql/s3_aws4fetch.jsy) <br/> [test/unittest.web.mjs](test/unittest.web.mjs) <br/> [integ--core/integ-aws4fetch.test.mjs](integ-test/integ--core/integ-aws4fetch.test.mjs)



#### SQL and [Knex][knex] adapter
 [knex]: https://knexjs.org/

| Integ Test | Technology / Library | Implementation |
|------------|----------------------|----------------|
| ✅ | [SQLite](https://www.sqlite.org/index.html) <br/> [`import {DatabaseSync} from 'node:sqlite'`](https://nodejs.org/api/sqlite.html) | impl: [code/sql/better_sqlite3.jsy](code/sql/better_sqlite3.jsy) <br/> [integ--sqlite/integ-sqlite-nodejs.test.mjs](integ-test/integ--sqlite3/integ-sqlite-nodejs.test.mjs)
| ✅ | [SQLite](https://www.sqlite.org/index.html) <br/> [better-sqlite3](http://github.com/WiseLibs/better-sqlite3) | impl: [code/sql/better_sqlite3.jsy](code/sql/better_sqlite3.jsy) <br/> [integ--sqlite/integ-better-sqlite3.test.mjs](integ-test/integ--sqlite3/integ-better-sqlite3.test.mjs)
| ✅ | [SQLite](https://www.sqlite.org/index.html) <br/> [node-sqlite3](https://github.com/mapbox/node-sqlite3) | impl: [code/sql/sqlite.jsy](code/sql/sqlite.jsy) <br/> [integ--sqlite/integ-sqlite3.test.mjs](integ-test/integ--sqlite3/integ-sqlite3.test.mjs)
| ✅ | [SQLite](https://www.sqlite.org/index.html) <br/> [knex.js][knex] | impl: [code/sql/knex.jsy](code/sql/knex.jsy) <br/> [integ--sqlite3/integ-knex-sqlite.test.mjs](integ-test/integ--sqlite3/integ-knex-sqlite.test.mjs)
| ✅ | [PostgreSQL](https://www.postgresql.org/) <br/> [knex.js][knex] | impl: [code/sql/knex.jsy](code/sql/knex.jsy) <br/> [integ--postgres/integ-postgres-knex.test.mjs](integ-test/integ--postgres/integ-postgres-knex.test.mjs)
| ✅ | [CockroachDB](https://www.cockroachlabs.com/) <br/> [knex.js][knex] | impl: [code/sql/knex.jsy](code/sql/knex.jsy) <br/> [integ--postgres/integ-cockroach-knex.test.mjs](integ-test/integ--postgres/integ-cockroach-knex.test.mjs)
| ❌ | [CrateDB](https://crate.io/) <br/> [knex.js][knex] | impl: [code/sql/knex.jsy](code/sql/knex.jsy) <br/> **note:** Crate SQL lacks BLOB in-table support
| ✅ | [MariaDB](https://mariadb.org/) <br/> [knex.js][knex] | impl: [code/sql/knex.jsy](code/sql/knex.jsy) <br/> [integ--maria-mysql/integ-knex-maria-mysql.test.mjs](integ-test/integ--maria-mysql/integ-knex-maria-mysql.test.mjs) <br/> **note:** Uses MEDIUMBLOB
| ✅ | [MySQL](https://www.mysql.com/) <br/> [knex.js][knex] | impl: [code/sql/knex.jsy](code/sql/knex.jsy) <br/> [integ--maria-mysql/integ-knex-maria-mysql.test.mjs](integ-test/integ--maria-mysql/integ-knex-maria-mysql.test.mjs) <br/> **note:** Uses MEDIUMBLOB
| ✅ | [Microsoft SQL Server](https://github.com/Microsoft/mssql-docker) <br/> [knex.js][knex] | impl: [code/sql/knex.jsy](code/sql/knex.jsy) <br/> [integ--mssql-server/integ-mssql.test.mjs](integ-test/integ--mssql-server/integ-mssql.test.mjs)



#### [Keyv][keyv] adapter
 [keyv]: https://github.com/lukechilds/keyv#readme

| Integ Test | Technology / Library | Implementation |
|------------|----------------------|----------------|
| ✅ | JavaScript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) <br/> [keyv][keyv] and `new Map()` | impl: [code/adapter/keyv.jsy](code/adapter/keyv.jsy) <br/> [integ--local-filesystem/integ-keyv-map.test.jsy](integ-test/integ--local-filesystem/integ-keyv-map.test.jsy)
| ⚠️ | One file <br/> [keyv][keyv] and [keyv-file]() | impl: [code/adapter/keyv.jsy](code/adapter/keyv.jsy) <br/> [integ--local-filesystem/integ-keyv-file.test.jsy](integ-test/integ--local-filesystem/integ-keyv-file.test.jsy) <br/> Stored in a single JSON file with binary values encode in base64
| ✅ | [Memcache](https://memcached.org/) <br/> [keyv][keyv] and [keyv-memcache](https://github.com/jaredwray/keyv-memcache) | impl: [code/adapter/keyv.jsy](code/adapter/keyv.jsy) <br/> [integ--memcache/integ-keyv-memjs.test.mjs](integ-test/integ--memcache/integ-keyv-memjs.test.mjs)
| ✅ | [MongoDB](https://www.mongodb.com/) <br/> [keyv][keyv] and [@keyv/mongo](https://github.com/lukechilds/keyv-mongo) | impl: [code/adapter/keyv.jsy](code/adapter/keyv.jsy) <br/> [integ--mongodb/integ-keyv-mongodb.test.mjs](integ-test/integ--mongodb/integ-keyv-mongodb.test.mjs)
| ✅ | [SQLite](https://www.sqlite.org/index.html) <br/> [keyv][keyv] and [@keyv/sqlite](https://github.com/lukechilds/keyv-sqlite) | impl: [code/adapter/keyv.jsy](code/adapter/keyv.jsy) <br/> [integ--sqlite3/integ-keyv-sqlite.test.mjs](integ-test/integ--sqlite3/integ-keyv-sqlite.test.mjs)




## About PHORBAS

The PHORBAS project implements a persistent binary data storage scheme that
accomodates opaque (encrypted) information. It is inspired by binary [content
addressable data storage][CAS], replication features of [CouchDB][], the opaque
data storage of [Tahoe-LAFS][], the eventual consistency of [CRDTs][], and
persistent [Hash array mapped trie][HAMT] data structures.

[Phorbas appears in in Greek mythology][myth] and is connected to "giving
pasture" -- in this case, safe pasture to for data storage.

    P - Persistent
    H - Hashed
    O - Opaque
    R - Replicable
    B - Binary content
    A - Addressable
    S - Store

Due to the opaque nature of the data storage, the storage is not queryable
like a database. It is similar to [IPFS][] with a less ambitious goal of
being a pratical data storage scheme for data for embedding into other
projects.

  [CAS]: https://en.wikipedia.org/wiki/Content-addressable_storage
  [CouchDB]: https://couchdb.apache.org/
  [Tahoe-LAFS]: https://tahoe-lafs.readthedocs.io/en/tahoe-lafs-1.12.1/specifications/file-encoding.html
  [CRDTs]: https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type
  [HAMT]: https://en.wikipedia.org/wiki/Hash_array_mapped_trie
  [IPFS]: https://ipfs.io/
  [myth]: https://en.wikipedia.org/wiki/Phorbas


## License

[2-Clause BSD](./LICENSE)


