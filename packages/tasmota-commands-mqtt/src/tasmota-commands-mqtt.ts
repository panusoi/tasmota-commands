import { TasmotaCommands, TasmotaCommandsOptions } from 'tasmota-commands-core';
import getMqttCommandHandler, { TasmotaMqttOptions } from './mqtt';

/**
 * Tasmota Commands Mqtt instance
 *
 * @example
 *  ```
 *    const commands = new TasmotaCommandsMqtt({
 *     host: 'tcp://127.0.0.1',
 *     port: 1883,
 *     topic: 'tasmota_living_room',
 *     topicFormat: '%prefix%/%topic%/<command>',
 *     username: 'user',
 *     password: 'password',
 *    });
 *    commands.Control.setPower0("on")
 *  ```
 *
 */
class TasmotaCommandsMqtt extends TasmotaCommands {
  constructor(options: TasmotaMqttOptions & TasmotaCommandsOptions) {
    super(getMqttCommandHandler(options), options);
  }
}

export default TasmotaCommandsMqtt;
