import { ControlCommands, LightCommands, ManagementCommands } from './commands';
import { ITasmotaCommands, TasmotaCommandsOptions } from './types/commands';
import { CommandHandler } from './types/handler';
import { TasmotaState } from './types/state';

/**
 * Tasmota Commands instance
 *
 * @example
 *  ```
 *    const commands = new TasmotaCommands(commandHandler);
 *    commands.Control.setPower0("on")
 *  ```
 *
 */
class TasmotaCommands implements ITasmotaCommands {
  #state: TasmotaState;
  #onStateChange: ((state: TasmotaState) => void) | undefined;

  /**
   * Control commands
   */
  Control: ControlCommands;

  /**
   * Management commands
   */
  Management: ManagementCommands;

  /**
   * Light commands
   */
  Light: LightCommands;

  /**
   * Create a Tasmota Commands instance
   *
   * @param {CommandHandler} commandHandler An async handler that processes the command, i.e. sends requests and parses the reponse.
   * @param {boolean} options TasmotaCommandsOptions
   * @returns {TasmotaCommands} TasmotaCommands instance
   */
  constructor(commandHandler: CommandHandler, options?: TasmotaCommandsOptions) {
    const handler: CommandHandler = async (opts) => {
      const result = await commandHandler(opts);
      this.#setState(result);
      return result;
    };

    this.Control = new ControlCommands(handler, options?.logger);
    this.Management = new ManagementCommands(handler, options?.logger);
    this.Light = new LightCommands(handler, options?.logger);

    this.#state = {};
    this.#onStateChange = undefined;

    if (options?.refreshStateOnInit) {
      this.refreshState();
    }
  }

  #setState = (state: TasmotaState) => {
    this.#state = { ...this.#state, ...state };
    this.#onStateChange?.(this.#state);
    return this.#state;
  };

  /**
   * Returns latest state received from Tasmota device
   *
   * @returns {TasmotaState} TasmotaState
   */
  getState = () => {
    return this.#state;
  };

  /**
   * Sends `state` command to Tasmota device to receive latest device state
   *
   * @returns {Promise<TasmotaState>} Promise<TasmotaState>
   */
  refreshState = async () => {
    return await this.Management.getState();
  };

  /**
   * Sets `onStateChange` listener
   */
  setOnStateChange = (onStateChange: (state: TasmotaState) => void) => {
    this.#onStateChange = onStateChange;
  };
}

export default TasmotaCommands;
