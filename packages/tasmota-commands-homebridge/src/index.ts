import { API } from 'homebridge';
import TasmotaCommandsAccessory from './accessory/accessory';

/**
 * Registers the accessory with Homebridge
 */
export = (api: API) => {
  api.registerAccessory('tasmota-commands', TasmotaCommandsAccessory);
};
