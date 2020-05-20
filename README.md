# PHORBAS Store (Abstraction)

A PHORBAS store is an associative 1:1 binary key to binary content data storage
abstraction. Keys are binary as a result of cryptographic hashing from 
[PHORBAS Opaque][], and content is binary as a result of encryption. The store
handles the principles of **Persistent**, **Binary key/content**, **Addressable**, and **Store**.

- [PHORBAS Opaque][] handles the principle of **Hashed**, **Opaque**, and **Addressable**.
- [PHORBAS HAMT][] handles the principle of **Replicable**.

 [PHORBAS Opaque]: https://github.com/phorbas/js-phorbas-opaque
 [PHORBAS HAMT]: https://github.com/phorbas/js-phorbas-hamt


## Storage Implementations

#### Local

|    | Technology / Library | Implementation
|----|----------------------|----------------
| ✅ | JS [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) (NodeJS) <br/> `new Map()` | impl: [code/js_map.jsy](code/js_map.jsy) <br/> test: [test/unittest.node.mjs](test/unittest.node.mjs)
| ✅ | JS [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) (Web) <br/> `new Map()` | impl: [code/js_map.jsy](code/js_map.jsy) <br/> test: [test/unittest.web.mjs](test/unittest.web.mjs)
| ✅ | Browser [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) <br/> `globalThis.indexedDB.open()` | impl: [code/local/web_db.jsy](code/local/web_db.jsy) <br/> test: [test/unittest.web.mjs](test/unittest.web.mjs)
| ✅ | Node [FS API](https://nodejs.org/api/fs.html) <br/> `require('fs')` | impl: [code/local/fs.jsy](code/local/fs.jsy) <br/> test: [test/int--fsp/integ-test.mjs](test/int--fsp/integ-test.mjs)
| ✅ | Node [FS Promises API](https://nodejs.org/api/fs.html#fs_fs_promises_api) <br/> `require('fs').promises` | impl: [code/local/fsp.jsy](code/local/fsp.jsy) <br/> test: [test/int--fsp/integ-test.mjs](test/int--fsp/integ-test.mjs)
| ✅ | Web [FS API](https://nodejs.org/api/fs.html) <br/> [lightning-fs](https://github.com/isomorphic-git/lightning-fs#readme) from [isomorphic-git](https://isomorphic-git.org/) | impl: [code/local/fsp.jsy](code/local/fsp.jsy) <br/> test: [test/unittest.web.mjs](test/unittest.web.mjs)
| ✅ | Web [FSP Promises API](https://nodejs.org/api/fs.html#fs_fs_promises_api) <br/> [lightning-fs](https://github.com/isomorphic-git/lightning-fs#readme) from [isomorphic-git](https://isomorphic-git.org/) | impl: [code/local/fsp.jsy](code/local/fsp.jsy) <br/> test: [test/unittest.web.mjs](test/unittest.web.mjs)
| ✅ | [LMDB](https://symas.com/lmdb/) <br/> [node-lmdb](https://github.com/Venemo/node-lmdb#readme) | impl: [code/nosql/lmdb.jsy](code/nosql/lmdb.jsy) <br/> test: [test/int--level/integ-test.mjs](test/int--level/integ-test.mjs)

Also see SQLite and Level-based adapters for local / embedded alternatives.

#### NoSQL

|    | Technology / Library | Implementation
|----|----------------------|----------------
| ⚠️ | [ArangoDB](https://www.arangodb.com) <br/> [arangojs](https://github.com/arangodb/arangojs) | impl: [code/nosql/arangojs.jsy](code/nosql/arangojs.jsy) <br/> test: [test/int--arangodb/integ-test.mjs](test/int--arangodb/integ-test.mjs) <br/> **note:** Binary values encode in base64
| ⚗️ | [Cassandra](https://cassandra.apache.org) <br/> [cassandra-driver](https://github.com/datastax/nodejs-driver#readme) | intended; need help setting up Docker integration testing
| ⚗️ | [Couchbase](https://www.couchbase.com/) | intended
| ⚗️ | [CouchDB](https://www.couchdb.com) | intended
| ✅ | [LMDB](https://symas.com/lmdb/) <br/> [node-lmdb](https://github.com/Venemo/node-lmdb#readme) | impl: [code/nosql/lmdb.jsy](code/nosql/lmdb.jsy) <br/> test: [test/int--level/integ-test.mjs](test/int--level/integ-test.mjs)
| ✅ | [Memcache](https://memcached.org/) <br/> [memjs](http://github.com/memcachier/memjs#readme) | impl: [code/nosql/memjs.jsy](code/nosql/memjs.jsy) <br/> test: [test/int--memcache/integ-test.mjs](test/int--memcache/integ-test.mjs)
| ✅ | [MongoDB](https://www.mongodb.com/) <br/> [mongojs](https://github.com/mongo-js/mongojs#readme) | impl: [code/nosql/mongojs.jsy](code/nosql/mongojs.jsy) <br/> test: [test/int--mongodb/integ-test.mjs](test/int--mongodb/integ-test.mjs)
| ⚗️ | [PouchDB](https://pouchdb.com) | intended
| ✅ | [Redis](https://redis.io/) <br/> [ioredis](https://github.com/luin/ioredis#readme) | impl: [code/nosql/ioredis.jsy](code/nosql/ioredis.jsy) <br/> test: [test/int--redis/integ-test.mjs](test/int--redis/integ-test.mjs)
| ✅ | [RethinkDB](https://rethinkdb.com) <br/> [rethinkdb](https://www.npmjs.com/package/rethinkdb) | impl: [code/nosql/rethinkdb.jsy](code/nosql/rethinkdb.jsy) <br/> test: [test/int--rethinkdb/integ-test.mjs](test/int--rethinkdb/integ-test.mjs)
| ⚗️ | [ScyllaDB](https://www.scylladb.com/) <br/> [cassandra-driver](https://github.com/datastax/nodejs-driver#readme) | intended; need help setting up Docker integration testing


##### S3 NoSQL

|    | Technology / Library | Implementation
|----|----------------------|----------------
| ✅ | [MinIO](https://min.io/) <br/> [minio](https://github.com/minio/minio-js#readme) | impl: [code/nosql/minio.jsy](code/nosql/minio.jsy) <br/> test: [test/int--minio/integ-test.mjs](test/int--minio/integ-test.mjs)
| ✅ | [AWS S3](https://aws.amazon.com/s3/) or compatible <br/> [aws4fetch](https://github.com/mhart/aws4fetch) | impl: [code/nosql/s3_aws4fetch.jsy](code/nosql/s3_aws4fetch.jsy) <br/> test: [test/unittest.web.mjs](test/unittest.web.mjs)

Also see `s3leveldown` Level-based adapter.


#### SQL and [Knex][knex] adapter

|    | Technology / Library | Implementation
|----|----------------------|----------------
| ✅ | [SQLite](https://www.sqlite.org/index.html) <br/> [node-sqlite3](https://github.com/mapbox/node-sqlite3) | impl: [code/sql/sqlite.jsy](code/sql/sqlite.jsy) <br/> test: [test/int--sqlite3/integ-test.mjs](test/int--sqlite3/integ-test.mjs)
| ✅ | [SQLite](https://www.sqlite.org/index.html) <br/> [knex.js][knex] | impl: [code/sql/knex.jsy](code/sql/knex.jsy) <br/> test: [test/int--sqlite3/integ-test.mjs](test/int--sqlite3/integ-test.mjs)
| ✅ | [PostgreSQL](https://www.postgresql.org/) <br/> [knex.js][knex] | impl: [code/sql/knex.jsy](code/sql/knex.jsy) <br/> test: [test/int--postgres/integ-test.mjs](test/int--postgres/integ-test.mjs)
| ✅ | [CockroachDB](https://www.cockroachlabs.com/) <br/> [knex.js][knex] | impl: [code/sql/knex.jsy](code/sql/knex.jsy) <br/> test: [test/int--postgres/integ-test.mjs](test/int--postgres/integ-test.mjs)
| ❌ | [CrateDB](https://crate.io/) <br/> [knex.js][knex] | impl: [code/sql/knex.jsy](code/sql/knex.jsy) <br/> test: [test/int--postgres/integ-test.mjs](test/int--postgres/integ-test.mjs) <br/> **note:** Crate SQL lacks BLOB in-table support
| ✅ | [MariaDB](https://mariadb.org/) <br/> [knex.js][knex] | impl: [code/sql/knex.jsy](code/sql/knex.jsy) <br/> test: [test/int--mysql/integ-test.mjs](test/int--mysql/integ-test.mjs) <br/> **note:** Uses MEDIUMBLOB
| ✅ | [MySQL](https://www.mysql.com/) <br/> [knex.js][knex] | impl: [code/sql/knex.jsy](code/sql/knex.jsy) <br/> test: [test/int--mysql/integ-test.mjs](test/int--mysql/integ-test.mjs) <br/> **note:** Uses MEDIUMBLOB



#### Storage Adapters

##### [Level][level] adapter

|    | Technology / Library | Implementation
|----|----------------------|----------------
| ✅ | [LevelDB](https://github.com/google/leveldb) <br/> [leveldown](https://github.com/Level/leveldown) | impl: [code/adapter/level.jsy](code/adapter/level.jsy) <br/> test: [test/int--level/integ-test.mjs](test/int--level/integ-test.mjs)
| ✅ | memdown <br/> [memdown](https://github.com/Level/memdown) | impl: [code/adapter/level.jsy](code/adapter/level.jsy) <br/> test: [test/int--level/integ-test.mjs](test/int--level/integ-test.mjs)
| ✅ | subleveldown sharing <br/> [subleveldown](https://github.com/level/subleveldown) | impl: [code/adapter/level.jsy](code/adapter/level.jsy) <br/> test: [test/int--level/integ-test.mjs](test/int--level/integ-test.mjs)
| ✅ | [RocksDB](https://rocksdb.org/) <br/> [rocksdb](https://github.com/Level/rocksdb) | impl: [code/adapter/level.jsy](code/adapter/level.jsy) <br/> test: [test/int--level/integ-test.mjs](test/int--level/integ-test.mjs)
| ✅ | [Medea](https://github.com/medea/medea) <br/> [medeadown](https://github.com/medea/medeadown) | impl: [code/adapter/level.jsy](code/adapter/level.jsy) <br/> test: [test/int--level/integ-test.mjs](test/int--level/integ-test.mjs)
| ✅ | [Redis](https://redis.io/) <br/> [redisdown](https://github.com/hmalphettes/redisdown#readme) | impl: [code/adapter/level.jsy](code/adapter/level.jsy) <br/> test: [test/int--redis/integ-test.mjs](test/int--redis/integ-test.mjs)
| ✅ | [AWS S3](https://aws.amazon.com/s3/) or compatible <br/> [s3leveldown](https://github.com/loune/s3leveldown) | impl: [code/adapter/level.jsy](code/adapter/level.jsy) <br/> test: [test/int--minio/integ-test.mjs](test/int--minio/integ-test.mjs)
| ✅ | [SQLite](https://www.sqlite.org/index.html) <br/> [level][level] and []() | impl: [code/adapter/level.jsy](code/adapter/level.jsy) <br/> test: [test/int--sqlite3/integ-test.mjs](test/int--sqlite3/integ-test.mjs)


##### [Keyv][keyv] adapter

|    | Technology / Library | Implementation
|----|----------------------|----------------
| ✅ | JavaScript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) <br/> [keyv][keyv] and `new Map()` | impl: [code/adapter/keyv.jsy](code/adapter/keyv.jsy) <br/> test: [test/unittest.node.mjs](test/unittest.node.mjs)
| ⚠️ | One file <br/> [keyv][keyv] and [keyv-file]() | impl: [code/adapter/keyv.jsy](code/adapter/keyv.jsy) <br/> test: [test/int--fsp/integ-test.mjs](test/int--fsp/integ-test.mjs) <br/> Stored in a single JSON file with binary values encode in base64
| ✅ | [Memcache](https://memcached.org/) <br/> [keyv][keyv] and [keyv-memcache](https://github.com/jaredwray/keyv-memcache) | impl: [code/adapter/keyv.jsy](code/adapter/keyv.jsy) <br/> test: [test/int--memcache/integ-test.mjs](test/int--memcache/integ-test.mjs)
| ✅ | [MongoDB](https://www.mongodb.com/) <br/> [keyv][keyv] and [@keyv/mongo](https://github.com/lukechilds/keyv-mongo) | impl: [code/adapter/keyv.jsy](code/adapter/keyv.jsy) <br/> test: [test/int--mongodb/integ-test.mjs](test/int--mongodb/integ-test.mjs)
| ✅ | [SQLite](https://www.sqlite.org/index.html) <br/> [keyv][keyv] and [@keyv/sqlite](https://github.com/lukechilds/keyv-sqlite) | impl: [code/adapter/keyv.jsy](code/adapter/keyv.jsy) <br/> test: [test/int--sqlite3/integ-test.mjs](test/int--sqlite3/integ-test.mjs)
| ❌ | [PostgreSQL](https://www.postgresql.org/) <br/> [keyv][keyv] and [@keyv/postgres](https://github.com/lukechilds/keyv-postgres) | impl: [code/adapter/keyv.jsy](code/adapter/keyv.jsy) <br/> test: [test/int--postgres/integ-test.mjs](test/int--postgres/integ-test.mjs) <br/> ❌ **note:** Failed
| ❌ | [MariaDB](https://mariadb.org/) <br/> [keyv][keyv] and [@keyv/mysql](https://github.com/lukechilds/keyv-mysql) | impl: [code/adapter/keyv.jsy](code/adapter/keyv.jsy) <br/> test: [test/int--mysql/integ-test.mjs](test/int--mysql/integ-test.mjs) <br/> ❌ **note:** Failed to store large blobs
| ❌ | [MySQL](https://www.mysql.com/) <br/> [keyv][keyv] and [@keyv/mysql](https://github.com/lukechilds/keyv-mysql) | impl: [code/adapter/keyv.jsy](code/adapter/keyv.jsy) <br/> test: [test/int--mysql/integ-test.mjs](test/int--mysql/integ-test.mjs) <br/> ❌ **note:** Failed to store large blobs


 [knex]: https://knexjs.org/
 [keyv]: https://github.com/lukechilds/keyv#readme
 [level]: https://github.com/Level/levelup#readme


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
    B - Binary key/content
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


