import { TasmotaState } from '../types/state';
import { Commands } from './abstract';

interface IControlCommands {
  setPower0: (value: 0 | 1 | 2 | 'on' | 'off' | 'toggle') => Promise<TasmotaState>;
  getPower0: () => Promise<TasmotaState>;
}

/**
 * @deprecated in favor of `sendCommand`
 */
class ControlCommands extends Commands implements IControlCommands {
  /**
   * Set power state for all power outputs
   *
   * @param {0 | 1 | 2 | 'on' | 'off' | 'toggle'} value - `0`/`off` = turn off, `1`/`on` = turn on, `2`/`toggle` = toggle state
   *
   * @returns {TasmotaState} TasmotaState
   *
   * @deprecated in favor of `sendCommand`
   */
  setPower0: IControlCommands['setPower0'] = (value) => {
    return this.commandHandler({ command: 'Power0', payload: value, logger: this.logger });
  };

  /**
   * Get power state for all power outputs
   *
   * @returns {TasmotaState} TasmotaState
   *
   * @deprecated in favor of `sendCommand`
   */
  getPower0: IControlCommands['getPower0'] = () => {
    return this.commandHandler({ command: 'Power0', payload: null, logger: this.logger });
  };
}

export default ControlCommands;
