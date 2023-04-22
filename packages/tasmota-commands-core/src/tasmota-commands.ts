import { ControlCommands, LightCommands, ManagementCommands } from './commands';
import {
  CommandCategory,
  Commands,
  ITasmotaCommands,
  OnStateChangeCallback,
  TasmotaCommandsOptions,
} from './types/commands';
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
  #onStateRefreshed: OnStateChangeCallback | undefined;

  #refreshStateInterval: AsyncInterval;

  #commandHandler: CommandHandler;

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
      this.#setState(result, opts.command === 'State');
      return result;
    };
    this.#commandHandler = handler;

    this.Control = new ControlCommands(handler, options?.logger);
    this.Management = new ManagementCommands(handler, options?.logger);
    this.Light = new LightCommands(handler, options?.logger);

    this.#state = {};
    this.#onStateChange = options?.onStateChanged;
    this.#onStateRefreshed = options?.onStateRefreshed;

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

  #setState = (state: TasmotaState, isStateRefresh: boolean) => {
    const changedKeys = getChangedKeys(this.#state, state);
    this.#state = { ...this.#state, ...state };
    this.#onStateChange?.(this.#state, changedKeys);
    if (isStateRefresh) {
      this.#onStateRefreshed?.(this.#state, changedKeys);
    }
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

  /**
   * Sets `onStateRefreshed` listener
   */
  setOnStateRefreshed = (onStateChange: OnStateChangeCallback) => {
    this.#onStateRefreshed = onStateChange;
  };

  /**
   * Sends a command to the device
   *
   * Payload parameter type changes based on `category` and `command` parameter combinations.
   * If `category = "Custom"`, command parameter is typed as `string` and payload parameter as `unknown`. If payload is not
   * a string, its stringified before sending with `JSON.stringify`.
   *
   *
   * Returns a partial {@link TasmotaState} from the device or throws an error.
   *
   * ### Examples
   *
   * Change light color to red
   *
   * ```ts
   * await commands.sendCommand("Light", "Color", "255,0,0"); // Command parameter is typed as literal union and payload parameter is typed as ColorValue
   *
   * ```
   *
   * Send any command
   *
   * ```ts
   * await commands.sendCommand("Custom", "Color", "255,0,0"); // Command parameter is typed as string and payload parameter is typed as unknown
   * ```
   *
   *
   *
   *
   */
  sendCommand = async <
    Category extends CommandCategory,
    Command extends Extract<keyof Commands[Category], string>,
    Payload extends Commands[Category][Command],
  >(
    category: Category,
    command: Command,
    payload: Payload | null = null,
  ): Promise<TasmotaState> => {
    const jsonPayload = typeof payload === 'string' ? payload : JSON.stringify(payload);
    return this.#commandHandler({
      command,
      payload: payload === null ? null : jsonPayload,
      logger: this.#options.logger,
    });
  };
}

export default TasmotaCommands;
