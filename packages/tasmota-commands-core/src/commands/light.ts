import { Commands } from './abstract';
import { TasmotaState } from '../types/state';
import { isBetween } from '../utils/number';

interface ILightCommands {
  setDimmer: (value: number | '+' | '-') => Promise<TasmotaState>;
  getDimmer: () => Promise<TasmotaState>;
  setColorTemperature: (args: number | '+' | '-') => Promise<TasmotaState>;
  getColorTemperature: () => Promise<TasmotaState>;
}

class LightCommands extends Commands implements ILightCommands {
  /**
   * Set dimmer value
   *
   * @param {number | "+" | "-"} value - `0-100` = set dimmer value percent or `+`/`-` increase/decrease  by `DimmerStep` (default `10`)
   *
   * @returns {TasmotaState} TasmotaState
   */
  setDimmer: ILightCommands['setDimmer'] = (value) => {
    if (
      value === '+' ||
      value === '-' ||
      (typeof value === 'number' && isBetween(value, { min: 0, max: 100 }))
    ) {
      return this.commandHandler({ command: 'Dimmer', payload: value, logger: this.logger });
    }

    const errorMessage = `Value ${value} (typeof ${typeof value}) is not valid dimmer value.`;
    this.logger?.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  };

  /**
   * Get dimmer value
   *
   * @returns {TasmotaState} TasmotaState
   */
  getDimmer: ILightCommands['getDimmer'] = () => {
    return this.commandHandler({ command: 'Dimmer', payload: null, logger: this.logger });
  };

  /**
   * Set color temperature value
   *
   * @param {number | "+" | "-"} value - `153-500` = set color temperature value or `+`/`-` increase/decrease by `10`
   *
   * @returns {TasmotaState} TasmotaState
   */
  setColorTemperature: ILightCommands['setColorTemperature'] = (value) => {
    if (
      value === '+' ||
      value === '-' ||
      (typeof value === 'number' && isBetween(value, { min: 153, max: 500 }))
    ) {
      return this.commandHandler({ command: 'CT', payload: value, logger: this.logger });
    }

    const errorMessage = `Value ${value} (typeof ${typeof value}) is not valid dimmer value.`;
    this.logger?.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  };

  /**
   * Get color temperature value
   *
   * @returns {TasmotaState} TasmotaState
   */
  getColorTemperature: ILightCommands['getColorTemperature'] = () => {
    return this.commandHandler({ command: 'CT', payload: null, logger: this.logger });
  };
}

export default LightCommands;
