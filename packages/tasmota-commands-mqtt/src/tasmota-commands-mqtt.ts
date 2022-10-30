import { TasmotaCommands, TasmotaCommandsOptions } from 'tasmota-commands-core';

class TasmotaCommandsMqtt extends TasmotaCommands {
  constructor(options?: TasmotaCommandsOptions) {
    super(() => Promise.reject(new Error('Not implemented yet')), options);
  }
}

export default TasmotaCommandsMqtt;
