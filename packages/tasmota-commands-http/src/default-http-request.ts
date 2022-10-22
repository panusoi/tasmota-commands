import http from 'http';
import { SendCommandHandler } from 'tasmota-commands-core/src/types';
import { getCommandPath } from './utils/path';

export type HttpRequestFunction = <T>(options: http.RequestOptions) => Promise<T>;

export type TasmotaHttpOptions = {
  readonly address: string;
  readonly username?: string;
  readonly password?: string;
};

export const getHttpSendCommandHandler = (opts: TasmotaHttpOptions): SendCommandHandler => {
  const { address, username, password } = opts;

  const handler: SendCommandHandler = (opts) => {
    const path = getCommandPath({ username, password, cmnd: 'Power TOGGLE' });

    if (opts.debug) {
      console.debug(`Sending command Power TOGGLE`);
    }

    return defaultHttpRequestFunction({
      hostname: address,
      path: path,
    });
  };

  return handler;
};

const defaultHttpRequestFunction: HttpRequestFunction = <T>(
  options: http.RequestOptions,
): Promise<T> =>
  new Promise((resolve, reject) => {
    const req = http.request({ ...options, method: 'GET' }, (res) => {
      if (res.statusCode === undefined || res.statusCode < 200 || res.statusCode >= 300) {
        reject(new Error(`statusCode ${res.statusCode}`));
        return;
      }

      const body: Uint8Array[] = [];
      res.on('data', (chunk) => {
        body.push(chunk);
      });

      res.on('end', () => {
        try {
          const bodyJson = JSON.parse(Buffer.concat(body).toString());
          resolve(bodyJson);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });

export default defaultHttpRequestFunction;
