### PHORBAS Store API

The PHORBAS store API is designed for use with `@phorbas/opaque` and optionally `@phorbas/hamt`.

- `async exists(ref)` returns `0` or `1` if entry exists for reference.
    `ref` is either a `Uint8Array` key, or an opaque keypair.

- `async fetch_content(ref)` returns `Uint8Array` content if entry exists; otherwise `undefined`.
    `ref` is either a `Uint8Array` key, or an opaque keypair.

- `async fetch_utf8(ref)` returns results of `fetch_content(ref)` decoded as a UTF-8 string.

- `async store_content_at(key, u8)` stores `u8` at `key` in the backend storage.
    `key` is either a `Uint8Array`, an opaque keypair, or an opaque key object.
    Uses `key.encode_content(u8)` is invoked if available.
    Finally, invokes `api.sync.add(key)` if configured to populate the PHORBAS HAMT membership set.

- `async store_utf8_at(key, utf8)` calls `store_content_at()` with UTF-8 string encoded as a `Uint8Array`.

- `async store_content(u8, opt={})` uses `api.opaque` to create a key to call `store_content_at(key, u8)`.
    Set `opt.rand = 1` to use a cryptographically random key; otherwise a hash of the u8 content will be used.
    Set `opt.as_key = 1` to return the opaque key object; otherwise returns an opaque keypair.

- `async store_utf8(utf8, opt={})` calls `store_content()` with UTF-8 string encoded as a `Uint8Array`.


#### Example

See [`test/api_example.mjs`](../test/api_example.mjs)

