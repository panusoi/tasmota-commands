import { TasmotaCommandsMqtt } from 'tasmota-commands-mqtt';

if (TasmotaCommandsMqtt !== null) {
  process.exit(0);
} else {
  console.error('import "tasmota-commands-mqtt" not working');
  process.exit(1);
}
