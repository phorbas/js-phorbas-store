### PHORBAS Backend API

The PHORBAS backend storage API is fundamentally asynchronous and batch oriented, designed for use with `@phorbas/opaque`.
Most of the backend implementations are prefixed by `bkc_with_`, where `bkc` is short for "binary key & content".

The `u8_key_list` is an array of `key : Uint8Array` values.
The `u8_pair_list` is an array of `[key : Uint8Array, content : Uint8Array]` value tuples.

- `async bkc_store(u8_pair_list)` returns an array of `[key : Uint8Array, error]` tuples, where error is `undefined` upon success.
- `async bkc_fetch(u8_key_list)` returns an `u8_pair_list` retrieved from the backend storage.
- `async bkc_exists(u8_key_list)` returns an array of `[key : Uint8Array, exists : 0|1]` tuples.

Example direct uses:
 - [`web/web_db.jsy`](../code/web/web_db.jsy)
 - [`local/lmdb.jsy`](../code/local/lmdb.jsy)
 - `bkc_with_rethinkdb_batch` in [`nosql/rethinkdb.jsy`](../code/nosql/rethinkdb.jsy)


#### The `bkc_binkey_api()` Adapter

Many backend storage APIs are not batch oriented.
The `bkc_binkey_api()` function transforms batch `bkc_exists` / `bkc_fetch` / `bkc_store` calls into individual `bk_has` / `bk_get` / `bk_set` calls.

Example uses:
 - [`adapter/level.jsy`](../code/adapter/level.jsy) hybrid with overridden `bkc_store` batch implementation.
 - [`nosql/mongojs.jsy`](../code/nosql/mongojs.jsy) hybrid with overridden `bkc_store` batch implementation.


#### The `bkc_hexkey_api()` Adapter

Many backend storage APIs are do not support binary keys and are often not batch oriented.
The `bkc_hexkey_api()` function transforms batch `bkc_exists` / `bkc_fetch` / `bkc_store` calls into individual `hk_has` / `hk_get` / `hk_set` calls with hex encoded keys.

Example uses:
 - [`js_map.jsy`](../code/js_map.jsy)
 - [`web/web_cache.jsy`](../code/web/web_cache.jsy)
 - [`web/web_fetch.jsy`](../code/web/web_fetch.jsy)
 - [`sql/sqlite3.jsy`](../code/sql/sqlite3.jsy)
 - [`sql/knex.jsy`](../code/sql/knex.jsy)
 - `bkc_with_rethinkdb_direct` in [`nosql/rethinkdb.jsy`](../code/nosql/rethinkdb.jsy)


#### Misc

The `as_hex()` functions provides a `WeakMap`-based cache for hex encoded keys.

