import { TasmotaCommands } from 'tasmota-commands-core';

if (TasmotaCommands !== null) {
  process.exit(0);
} else {
  console.error('import "tasmota-commands-core" not working');
  process.exit(3);
}
