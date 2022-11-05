import { TasmotaCommandsHttp } from 'tasmota-commands-http';

if (TasmotaCommandsHttp !== null) {
  process.exit(0);
} else {
  console.error('import "tasmota-commands-http" not working');
  process.exit(1);
}
