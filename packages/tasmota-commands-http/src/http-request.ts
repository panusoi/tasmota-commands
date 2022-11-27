import http from 'http';
import { CommandHandler } from 'tasmota-commands-core';
import { getCommandPath } from './utils/path';

export type HttpRequestFunction = <T>(options: http.RequestOptions) => Promise<T>;

export type TasmotaHttpOptions = {
  address: string;
  username?: string;
  password?: string;
};

export const getHttpCommandHandler = (opts: TasmotaHttpOptions): CommandHandler => {
  const { address, username, password } = opts;

  const handler: CommandHandler = ({ command, payload, logger }) => {
    const cmnd = payload === null ? command : `${command} ${payload}`;

    const path = getCommandPath({
      username,
      password,
      cmnd,
    });

    logger?.debug(`Sending command ${cmnd}`);

    return httpRequestFunction({
      hostname: address,
      path: path,
    });
  };

  return handler;
};

const httpRequestFunction: HttpRequestFunction = <T>(options: http.RequestOptions): Promise<T> =>
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

export default httpRequestFunction;
