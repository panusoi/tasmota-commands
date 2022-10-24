import { AccessoryConfig, AccessoryPlugin, API, Logger, Service } from 'homebridge';
import TasmotaSimpleLightBulb from './simple-light-bulb';

export const TASMOTA_SIMPLE_LIGHT_BULB_NAME = 'tasmota-simple-light-bulb';

export type TasmotaSimpleLightBulbConfig = AccessoryConfig & {
  address: string;
  username?: string;
  password?: string;
};

class TasmotaSimpleLightBulbAccessory implements AccessoryPlugin {
  lightService: Service;
  informationService: Service;

  constructor(logger: Logger, config: AccessoryConfig, api: API) {
    logger.info('Initializing accessory...');

    logger.debug('Config: %s', JSON.stringify(config));

    const simpleLightConfig =
      config.accessory === TASMOTA_SIMPLE_LIGHT_BULB_NAME &&
      'address' in config &&
      typeof config.address === 'string'
        ? (config as TasmotaSimpleLightBulbConfig)
        : false;

    if (!simpleLightConfig) {
      throw new Error('Invalid accessory config.');
    }

    this.lightService = new api.hap.Service.Lightbulb(config.name);

    this.informationService = new api.hap.Service.AccessoryInformation()
      .setCharacteristic(api.hap.Characteristic.Manufacturer, 'Custom Manufacturer')
      .setCharacteristic(api.hap.Characteristic.Model, 'Custom Model');

    const tasmotaSimpleLightBulb = new TasmotaSimpleLightBulb(
      logger,
      api,
      this.lightService,
      simpleLightConfig,
    );

    logger.info(
      'Finished initializing accessory: %s. Registered listeners: [%s]',
      config.name,
      tasmotaSimpleLightBulb.getRegisteredListeners().join(','),
    );
  }

  getServices(): Service[] {
    return [this.informationService, this.lightService];
  }
}

export default TasmotaSimpleLightBulbAccessory;
