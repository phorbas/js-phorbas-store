import fetch, {Headers, Request, Response} from 'node-fetch';
import ky from 'ky';

const TEN_MEGABYTES = 1000 * 1000 * 10;

if (!globalThis.fetch)
	globalThis.fetch = (url, options) => fetch(url, {highWaterMark: TEN_MEGABYTES, ...options});

if (!globalThis.Headers)
	globalThis.Headers = Headers;

if (!globalThis.Request)
	globalThis.Request = Request;

if (!globalThis.Response)
	globalThis.Response = Response;

export default ky;
