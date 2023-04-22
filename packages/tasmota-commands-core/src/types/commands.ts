import { ControlCommands, LightCommands } from '../commands';
import ManagementCommands from '../commands/management';
import { ColorValue, HSB } from './color';
import { Power0Value, PowerXValue } from './control';
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

  /**
   * Callback that is called always after state is changed
   */
  onStateChanged?: OnStateChangeCallback;

  /**
   * Callback that is called always after state is refreshed
   */
  onStateRefreshed?: OnStateChangeCallback;
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
  sendCommand: <
    Category extends CommandCategory,
    Command extends Extract<keyof Commands[Category], string>,
    Payload extends Commands[Category][Command],
  >(
    list: Category,
    command: Command,
    payload: Payload | null,
  ) => Promise<TasmotaState>;
}

export type Commands = {
  Light: {
    Color: ColorValue;
    Color1: ColorValue;
    Color2: ColorValue;
    Color3: ColorValue;
    Color4: ColorValue;
    Color5: ColorValue;
    Color6: ColorValue;
    HSBColor: HSB;
    HSBColor1: number;
    HSBColor2: number;
    HSBColor3: number;
    Dimmer: number | '+' | '-';
    CT: number | '+' | '-';
  };
  Control: {
    Power0: Power0Value;
    Power1: PowerXValue;
    Power2: PowerXValue;
    Power3: PowerXValue;
    Power4: PowerXValue;
    Power5: PowerXValue;
    Power6: PowerXValue;
    Power7: PowerXValue;
    Power8: PowerXValue;
  };
  Management: {
    State: never;
  };
  Custom: {
    [key: string]: unknown;
  };
};

export type CommandCategory = keyof Commands;
