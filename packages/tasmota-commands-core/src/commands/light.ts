import { Commands } from './abstract';
import { TasmotaState } from '../types/state';
import { isBetween, isColorValue, isHSB } from '../utils';
import { ColorValue, HSB } from '../types/color';

interface ILightCommands {
  setColorX: (mode: number, value: ColorValue) => Promise<TasmotaState>;
  setColor1: (value: ColorValue) => Promise<TasmotaState>;
  setColor2: (value: ColorValue) => Promise<TasmotaState>;
  setColor3: (value: ColorValue) => Promise<TasmotaState>;
  setColor4: (value: ColorValue) => Promise<TasmotaState>;
  setColor5: (value: ColorValue) => Promise<TasmotaState>;
  setColor6: (value: ColorValue) => Promise<TasmotaState>;
  getColor: (mode?: number) => Promise<TasmotaState>;

  setHSBColor: (value: HSB) => Promise<TasmotaState>;
  setHSBColor1: (hue: number) => Promise<TasmotaState>;
  setHSBColor2: (sat: number) => Promise<TasmotaState>;
  setHSBColor3: (bri: number) => Promise<TasmotaState>;
  getHSBColor: () => Promise<TasmotaState>;

  setDimmer: (value: number | '+' | '-') => Promise<TasmotaState>;
  getDimmer: () => Promise<TasmotaState>;
  setColorTemperature: (args: number | '+' | '-') => Promise<TasmotaState>;
  getColorTemperature: () => Promise<TasmotaState>;
}

/**
 * @see https://tasmota.github.io/docs/Commands/#light
 */
class LightCommands extends Commands implements ILightCommands {
  /**
   * Set color mode and value
   * @param mode 1..6
   * @param value {ColorValue} ColorValue
   * @returns {TasmotaState} TasmotaState
   * @deprecated in favor of `sendCommand`
   */
  setColorX: ILightCommands['setColorX'] = (mode, value) => {
    if (!isBetween(mode, { min: 1, max: 6, inclusive: true })) {
      const errorMessage = `Mode ${mode} (typeof ${typeof mode}) is not a valid color mode.`;
      this.logger?.error(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }

    if (!isColorValue(value)) {
      const errorMessage = `Value ${value} (typeof ${typeof value}) is not a valid color value.`;
      this.logger?.error(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }

    return this.commandHandler({ command: `Color${mode}`, payload: value, logger: this.logger });
  };

  /**
   * Set color
   * @param value {ColorValue} ColorValue
   * @returns {TasmotaState} TasmotaState
   * @deprecated in favor of `sendCommand`
   */
  setColor1: ILightCommands['setColor1'] = (value) => {
    return this.setColorX(1, value);
  };

  /**
   * Set color adjusted to current Dimmer value
   *
   * @param value {ColorValue} ColorValue
   * @returns {TasmotaState} TasmotaState
   * @deprecated in favor of `sendCommand`
   */
  setColor2: ILightCommands['setColor2'] = (value) => {
    return this.setColorX(2, value);
  };

  /**
   * Set clock seconds hand color ({@link https://tasmota.github.io/docs/Commands/#scheme Scheme} `5` only)
   *
   * @param value {ColorValue} ColorValue
   * @returns {TasmotaState} TasmotaState
   * @deprecated in favor of `sendCommand`
   */
  setColor3: ILightCommands['setColor2'] = (value) => {
    return this.setColorX(2, value);
  };

  /**
   * Set clock minutes hand color ({@link https://tasmota.github.io/docs/Commands/#scheme Scheme} `5` only)
   *
   * @param value {ColorValue} ColorValue
   * @returns {TasmotaState} TasmotaState
   * @deprecated in favor of `sendCommand`
   */
  setColor4: ILightCommands['setColor2'] = (value) => {
    return this.setColorX(2, value);
  };

  /**
   * Set clock hour hand color ({@link https://tasmota.github.io/docs/Commands/#scheme Scheme} `5` only)
   *
   * @param value {ColorValue} ColorValue
   * @returns {TasmotaState} TasmotaState
   * @deprecated in favor of `sendCommand`
   */
  setColor5: ILightCommands['setColor2'] = (value) => {
    return this.setColorX(2, value);
  };

  /**
   *  Set clock hour marker color
   *
   * @param value {ColorValue} ColorValue
   * @returns {TasmotaState} TasmotaState
   * @deprecated in favor of `sendCommand`
   */
  setColor6: ILightCommands['setColor2'] = (value) => {
    return this.setColorX(2, value);
  };

  /**
   * Get color value
   * @param mode 1..6, default is 1
   * @returns {TasmotaState} TasmotaState
   * @deprecated in favor of `sendCommand`
   */
  getColor: ILightCommands['getColor'] = (mode = 1) => {
    if (!isBetween(mode, { min: 1, max: 6, inclusive: true })) {
      const errorMessage = `Mode ${mode} (typeof ${typeof mode}) is not a valid color mode.`;
      this.logger?.error(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }
    return this.commandHandler({ command: `Color${mode}`, payload: null, logger: this.logger });
  };

  /**
   * Set color by hue, saturation and brightness
   * @param value {HSB} HSB value `<hue>,<sat>,<bri>`
   * @returns {TasmotaState} TasmotaState
   * @deprecated in favor of `sendCommand`
   */
  setHSBColor: ILightCommands['setHSBColor'] = (value) => {
    if (!isHSB(value)) {
      const errorMessage = `Value ${value} (typeof ${typeof value}) is not a valid hsb value.`;
      this.logger?.error(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }

    return this.commandHandler({ command: 'HSBColor', payload: value, logger: this.logger });
  };

  /**
   * Set hue
   * @param hue
   * @returns {TasmotaState} TasmotaState
   * @deprecated in favor of `sendCommand`
   */
  setHSBColor1: ILightCommands['setHSBColor1'] = (hue) => {
    if (!isBetween(hue, { min: 0, max: 360, inclusive: true })) {
      const errorMessage = `Value ${hue} (typeof ${typeof hue}) is not a valid hsb hue value.`;
      this.logger?.error(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }
    return this.commandHandler({ command: 'HSBColor1', payload: hue, logger: this.logger });
  };

  /**
   * Set saturation
   * @param sat
   * @returns {TasmotaState} TasmotaState
   * @deprecated in favor of `sendCommand`
   */
  setHSBColor2: ILightCommands['setHSBColor2'] = (sat) => {
    if (!isBetween(sat, { min: 0, max: 100, inclusive: true })) {
      const errorMessage = `Value ${sat} (typeof ${typeof sat}) is not a valid hsb saturation value.`;
      this.logger?.error(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }
    return this.commandHandler({ command: 'HSBColor2', payload: sat, logger: this.logger });
  };

  /**
   * Set brightness
   * @param bri
   * @returns {TasmotaState} TasmotaState
   * @deprecated in favor of `sendCommand`
   */
  setHSBColor3: ILightCommands['setHSBColor3'] = (bri) => {
    if (!isBetween(bri, { min: 0, max: 100, inclusive: true })) {
      const errorMessage = `Value ${bri} (typeof ${typeof bri}) is not a valid brightness hue value.`;
      this.logger?.error(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }
    return this.commandHandler({ command: 'HSBColor3', payload: bri, logger: this.logger });
  };

  /**
   * Get hsb color value
   *
   * @returns {TasmotaState} TasmotaState
   * @deprecated in favor of `sendCommand`
   */
  getHSBColor: ILightCommands['getHSBColor'] = () => {
    return this.commandHandler({ command: 'HSBColor', payload: null, logger: this.logger });
  };

  /**
   * Set dimmer value
   *
   * @param {number | "+" | "-"} value - `0-100` = set dimmer value percent or `+`/`-` increase/decrease  by `DimmerStep` (default `10`)
   *
   * @returns {TasmotaState} TasmotaState
   * @deprecated in favor of `sendCommand`
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
   * @deprecated in favor of `sendCommand`
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
   * @deprecated in favor of `sendCommand`
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
   * @deprecated in favor of `sendCommand`
   */
  getColorTemperature: ILightCommands['getColorTemperature'] = () => {
    return this.commandHandler({ command: 'CT', payload: null, logger: this.logger });
  };
}

export default LightCommands;
