import { TasmotaState } from '../types/state';
import { Commands } from './abstract';

interface IManagementCommands {
  getState: () => Promise<TasmotaState>;
}

class ManagementCommands extends Commands implements IManagementCommands {
  /**
   * Get current device state
   *
   * @returns {TasmotaState} TasmotaState
   */
  getState = () => {
    return this.commandHandler({ command: 'State', payload: null, logger: this.logger });
  };
}

export default ManagementCommands;
