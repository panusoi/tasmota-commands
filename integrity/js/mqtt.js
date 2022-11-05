// eslint-disable-next-line @typescript-eslint/no-var-requires
const mqtt = require('tasmota-commands-mqtt');

if (mqtt !== null) {
  process.exit(0);
} else {
  console.error('require("tasmota-commands-mqtt") not working');
  process.exit(1);
}
