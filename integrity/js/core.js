// eslint-disable-next-line @typescript-eslint/no-var-requires
const commands = require('tasmota-commands-core');

if (commands !== null) {
  process.exit(0);
} else {
  console.error('require("tasmota-commands-core") not working');
  process.exit(3);
}
