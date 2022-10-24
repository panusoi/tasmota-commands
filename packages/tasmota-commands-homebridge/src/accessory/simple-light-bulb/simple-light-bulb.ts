import {
  API,
  CharacteristicEventTypes,
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  HAPStatus,
  Logger,
  Service,
} from 'homebridge';
import { TasmotaCommands } from 'tasmota-commands-core';
import { TasmotaSimpleLightBulbConfig } from './simple-light-bulb-accessory';

import { TasmotaCommandsHttp } from 'tasmota-commands-http';

type State = {
  power: boolean;
};

class TasmotaSimpleLightBulb {
  state: State;
  commands: TasmotaCommands;

  registeredListeners: string[] = [];

  constructor(
    readonly logger: Logger,
    readonly api: API,
    readonly lightService: Service,
    readonly config: TasmotaSimpleLightBulbConfig,
  ) {
    this.logger = logger;
    this.api = api;
    this.lightService = lightService;

    this.commands = new TasmotaCommandsHttp(config);

    this.state = {
      power: false,
    };

    this.registerListeners();
  }

  public getRegisteredListeners(): string[] {
    return this.registeredListeners;
  }

  protected registerListeners(): void {
    this.lightService
      .getCharacteristic(this.api.hap.Characteristic.On)
      .on(CharacteristicEventTypes.GET, this.getPower)
      .on(CharacteristicEventTypes.SET, this.togglePower);
    this.registeredListeners.push('On');
  }

  togglePower = (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
    this.commands
      .sendPowerToggle()
      .then((response) => {
        if (response && typeof response === 'object' && 'POWER' in response) {
          const isOn = (response as Record<string, unknown>).POWER === 'ON';
          this.state.power = isOn;
          callback(HAPStatus.SUCCESS);
        } else {
          callback(HAPStatus.INVALID_VALUE_IN_REQUEST);
        }
      })
      .catch((error) => {
        this.logger.error('Unhandled error', error);
        callback(HAPStatus.INVALID_VALUE_IN_REQUEST);
      });
  };

  getPower = (callback: CharacteristicGetCallback) => {
    this.logger?.debug('Current power state: ', this.state.power);
    callback(HAPStatus.SUCCESS, this.state.power);
  };
}

export default TasmotaSimpleLightBulb;
