import { TasmotaCommands, TasmotaCommandsOptions } from 'tasmota-commands-core';
import { getHttpCommandHandler, TasmotaHttpOptions } from './http-request';

/**
 * Tasmota Commands Http instance
 *
 * @example
 *  ```
 *    const commands = new TasmotaCommandsHttp({address: "127.0.0.1"});
 *    commands.Control.setPower0("on")
 *  ```
 *
 */
class TasmotaCommandsHttp extends TasmotaCommands {
  constructor(options: TasmotaCommandsOptions & TasmotaHttpOptions) {
    if (options.address.startsWith('http://') || options.address.startsWith('https://')) {
      throw new Error(
        `TasmotaHttp invalid address: "${options.address}". Address shouldn't start with protocol.`,
      );
    }

    super(getHttpCommandHandler(options), options);
  }
}

export default TasmotaCommandsHttp;
