import { TasmotaCommands } from 'tasmota-commands-core';
import { getHttpSendCommandHandler, TasmotaHttpOptions } from './default-http-request';

class TasmotaCommandsHttp extends TasmotaCommands {
  constructor(options: TasmotaHttpOptions) {
    if (options.address.startsWith('http://') || options.address.startsWith('https://')) {
      throw new Error(
        `TasmotaHttp invalid address: "${options.address}". Address shouldn't start with protocol.`,
      );
    }

    super(getHttpSendCommandHandler(options));
  }
}

export default TasmotaCommandsHttp;
