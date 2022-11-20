import { ControlCommands, LightCommands } from '../commands';
import ManagementCommands from '../commands/management';
import { TasmotaState } from './state';

export interface Logger {
  info(message: string, ...parameters: unknown[]): void;
  warn(message: string, ...parameters: unknown[]): void;
  error(message: string, ...parameters: unknown[]): void;
  debug(message: string, ...parameters: unknown[]): void;
}

/**
 * TasmotaCommands class options
 *
 */
export type TasmotaCommandsOptions = {
  /**
   * Get the current state from the device asynchronously after class initialization
   *
   * @type {boolean}
   */
  refreshStateOnInit?: boolean;

  /**
   * Refresh state interval in milliseconds. Disabled by default.
   *
   * @type {number}
   */
  refreshStateInterval?: number;

  /**
   * Logging implementation. Leave unset to disable logging. Set to `console` or your custom implementation.
   *
   * @type {Logger}
   */
  logger?: Logger;
};

export type OnStateChangeCallback = (
  state: TasmotaState,
  changedKeys: (keyof TasmotaState)[],
) => void;

export interface ITasmotaCommands {
  Control: ControlCommands;
  Management: ManagementCommands;
  Light: LightCommands;
  getState: () => TasmotaState;
  refreshState: () => Promise<TasmotaState>;
  setOnStateChange: (callback: OnStateChangeCallback) => void;
}
