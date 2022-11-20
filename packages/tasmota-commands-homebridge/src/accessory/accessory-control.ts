import { API, Logger, Service } from 'homebridge';
import { TasmotaCommands } from 'tasmota-commands-core';

import { TasmotaCommandsHttp } from 'tasmota-commands-http';
import { CharacteristicWithUpdate, createCharacteristic } from '../characteristics';
import { CharacteristicName } from '../types/characteristic';
import { TasmotaCommandsAccessoryConfig } from '../types/config';
import { presetCharacteristicMap } from '../types/preset';

class TasmotaCommandsAccessoryControl {
  commands: TasmotaCommands;

  characteristics: CharacteristicWithUpdate[] = [];

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
      refreshStateInterval: (config.refreshInterval || 0) * 1000,
      logger: config.verbose ? this.logger : undefined,
      onStateRefreshed: (state, changedKeys) => {
        const characteristicUpdates = this.characteristics.map((c) => ({
          name: c.characteristic.displayName,
          updated: c.onStateUpdate(c.characteristic, state, changedKeys),
        }));

        this.config.verbose &&
          this.logger.debug(
            'State keys changed: %s. Characteristics updated: %s.',
            JSON.stringify(changedKeys),
          );
        this.logger.debug(
          'Characteristics updated: %s.',
          JSON.stringify(characteristicUpdates.filter((c) => c.updated).map((c) => c.name)),
        );
        this.config.verbose && this.logger.debug('Current state: %s', JSON.stringify(state));
      },
    });

    this.registerListeners(
      config.preset !== 'custom'
        ? presetCharacteristicMap[config.preset]
        : config.customPresetCharacteristics ?? [],
    );
  }

  public getRegisteredListeners(): string[] {
    return this.characteristics.map((c) => c.characteristic.displayName);
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
      this.characteristics.push(characteristic);
    });
  }
}

export default TasmotaCommandsAccessoryControl;
