import { AccessoryConfig, AccessoryPlugin, API, Logger, Service } from 'homebridge';
import { isCustomPreset, isPreset, presetAccessoryTypeMap } from '../types/preset';
import { isHttpProtocolConfig } from '../types/protocol';
import TasmotaCommandsAccessoryControl from './accessory-control';

class TasmotaCommandsAccessory implements AccessoryPlugin {
  services: Service[];

  constructor(logger: Logger, config: AccessoryConfig, api: API) {
    logger.info('Initializing accessory...');
    this.services = [];

    logger.debug('Config: %s', JSON.stringify(config));

    let service: Service;

    if (isPreset(config)) {
      service =
        presetAccessoryTypeMap[config.preset] === 'lightbulb'
          ? new api.hap.Service.Lightbulb(config.name)
          : new api.hap.Service.Switch(config.name);
    } else if (isCustomPreset(config)) {
      service =
        config.type === 'lightbulb'
          ? new api.hap.Service.Lightbulb(config.name)
          : new api.hap.Service.Switch(config.name);
    } else {
      logger.error('Invalid preset config');
      return;
    }

    if (!isHttpProtocolConfig(config)) {
      logger.error('Invalid protocol config');
      return;
    }

    const informationService = new api.hap.Service.AccessoryInformation()
      .setCharacteristic(api.hap.Characteristic.Manufacturer, 'Custom Manufacturer')
      .setCharacteristic(api.hap.Characteristic.Model, 'Custom Model');

    const accessoryControl = new TasmotaCommandsAccessoryControl(logger, api, service, config);

    this.services.push(informationService);
    this.services.push(service);

    logger.info(
      'Finished initializing accessory: %s. Registered listeners: [%s]',
      config.name,
      accessoryControl.getRegisteredListeners().join(','),
    );
  }

  getServices(): Service[] {
    return this.services;
  }
}

export default TasmotaCommandsAccessory;
