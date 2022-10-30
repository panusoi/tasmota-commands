import { Logger } from './commands';
import { TasmotaState } from './state';

export type CommandHandlerArgs = {
  command: string;
  payload: string | number | null;
  logger?: Logger;
};

/**
 * Asynchronously sends command to Tasmota device
 *
 * @param {CommandHandlerArgs} args - CommandHandlerArgs
 *
 * @returns {TasmotaState} Response from Tasmota device as json object
 */
export type CommandHandler = (args: CommandHandlerArgs) => Promise<TasmotaState>;
