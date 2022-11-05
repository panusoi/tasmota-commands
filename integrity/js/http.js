// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require('tasmota-commands-http');

if (http !== null) {
  process.exit(0);
} else {
  console.error('require("tasmota-commands-http") not working');
  process.exit(1);
}
