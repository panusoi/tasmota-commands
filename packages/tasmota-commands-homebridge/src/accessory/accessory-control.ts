import { API, Logger, Service } from 'homebridge';
import { TasmotaCommands } from 'tasmota-commands-core';

import { TasmotaCommandsHttp } from 'tasmota-commands-http';
import { createCharacteristic } from '../characteristics';
import { CharacteristicName, State } from '../types/characteristic';
import { TasmotaCommandsAccessoryConfig } from '../types/config';
import { presetCharacteristicMap } from '../types/preset';

class TasmotaCommandsAccessoryControl {
  state: State;
  commands: TasmotaCommands;

  registeredListeners: string[] = [];

  constructor(
    readonly logger: Logger,
    readonly api: API,
    readonly service: Service,
    readonly config: TasmotaCommandsAccessoryConfig,
  ) {
    this.logger = logger;
    this.api = api;
    this.service = service;

    this.commands = new TasmotaCommandsHttp(config);

    this.state = {
      power: false,
      brightness: 0,
      ct: 0,
    };

    this.registerListeners(
      config.preset !== 'custom'
        ? presetCharacteristicMap[config.preset]
        : config.customPresetCharacteristics ?? [],
    );
  }

  public getRegisteredListeners(): string[] {
    return this.registeredListeners;
  }

  protected registerListeners(characteristicNames: CharacteristicName[]): void {
    if (characteristicNames.length === 0) {
      throw new Error('Invalid characteristics config');
    }

    characteristicNames.forEach((name) => {
      const characteristic = createCharacteristic(this.service, name, {
        verbose: this.config.verbose,
        logger: this.logger,
        commands: this.commands,
        getCurrentState: () => this.state,
        setCurrentState: (key, value) => {
          this.state = { ...this.state, [key]: value };
          return this.state;
        },
      });

      if (characteristic === null) {
        this.logger.error("Cannot create Characteristic '%s'");
        return;
      }

      this.logger.debug('Registered listener %s', characteristic);
    });
  }
}

export default TasmotaCommandsAccessoryControl;
