import { API, Logger, Service } from 'homebridge';
import { TasmotaCommands } from 'tasmota-commands-core';

import { TasmotaCommandsHttp } from 'tasmota-commands-http';
import { createCharacteristic } from '../characteristics';
import { CharacteristicName } from '../types/characteristic';
import { TasmotaCommandsAccessoryConfig } from '../types/config';
import { presetCharacteristicMap } from '../types/preset';

class TasmotaCommandsAccessoryControl {
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

    this.commands = new TasmotaCommandsHttp({
      ...config,
      refreshStateOnInit: true,
      logger: config.verbose ? this.logger : undefined,
    });

    this.commands.setOnStateChange((s) => {
      this.logger.debug('State changed: %s', JSON.stringify(s));
    });

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
      const characteristic = createCharacteristic(this.api.hap, this.service, name, {
        verbose: this.config.verbose,
        logger: this.logger,
        commands: this.commands,
        getCurrentState: this.commands.getState,
      });

      if (characteristic === null) {
        this.logger.error("Cannot create Characteristic '%s'", name);
        return;
      }

      this.logger.debug('Registered listener %s', name);
      this.registeredListeners.push(name);
    });
  }
}

export default TasmotaCommandsAccessoryControl;
