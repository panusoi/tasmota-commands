import { ControlCommands, LightCommands, ManagementCommands } from './commands';
import { ITasmotaCommands, OnStateChangeCallback, TasmotaCommandsOptions } from './types/commands';
import { CommandHandler } from './types/handler';
import { TasmotaState } from './types/state';
import { getChangedKeys } from './utils';
import { AsyncInterval, setAsyncInterval } from './utils/interval';

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
  #options: TasmotaCommandsOptions;

  #state: TasmotaState;
  #onStateChange: OnStateChangeCallback | undefined;

  #refreshStateInterval: AsyncInterval;

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
    this.#options = options || {};

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

    this.#refreshStateInterval = setAsyncInterval(
      this.refreshState,
      options?.refreshStateInterval || 0,
    );

    if (options?.refreshStateOnInit) {
      this.refreshState();
    }

    if (options?.refreshStateInterval) {
      this.#refreshStateInterval.start();
    }
  }

  #setState = (state: TasmotaState) => {
    const changedKeys = getChangedKeys(this.#state, state);
    this.#state = { ...this.#state, ...state };
    this.#onStateChange?.(this.#state, changedKeys);
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
  setOnStateChange = (onStateChange: OnStateChangeCallback) => {
    this.#onStateChange = onStateChange;
  };

  /**
   * Sets refresh state interval
   * @param value interval in milliseconds
   */
  setRefreshStateInterval = (value: number) => {
    this.#refreshStateInterval.setIntervalMs(value);
  };

  /**
   * Starts refresh state interval
   */
  startRefreshStateInterval = () => {
    this.#refreshStateInterval.start();
  };

  /**
   * Stops refresh state interval
   */
  stopRefreshStateInterval = () => {
    this.#refreshStateInterval.stop();
  };
}

export default TasmotaCommands;
