import { SendCommandHandler } from './types';

class TasmotaCommands {
  readonly #sendCommandHandler: SendCommandHandler;

  constructor(sendCommandHandler: SendCommandHandler) {
    this.#sendCommandHandler = sendCommandHandler;
  }

  async sendPowerToggle(debug?: true): Promise<string> {
    return this.#sendCommandHandler({
      command: 'Power',
      value: 'TOGGLE',
      debug,
    });
  }
}

export default TasmotaCommands;
