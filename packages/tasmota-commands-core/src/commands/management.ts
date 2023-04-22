import { TasmotaState } from '../types/state';
import { Commands } from './abstract';

interface IManagementCommands {
  getState: () => Promise<TasmotaState>;
}

/**
 * @deprecated in favor of `sendCommand`
 */
class ManagementCommands extends Commands implements IManagementCommands {
  /**
   * Get current device state
   *
   * @returns {TasmotaState} TasmotaState
   *
   * @deprecated in favor of `sendCommand`
   */
  getState = () => {
    return this.commandHandler({ command: 'State', payload: null, logger: this.logger });
  };
}

export default ManagementCommands;
