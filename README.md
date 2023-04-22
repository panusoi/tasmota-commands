# Tasmota Commands

## NOTE: Still under development, the first stable version will be version 1.0.0

[![Release](https://github.com/panusoi/tasmota-commands/actions/workflows/release.yml/badge.svg)](https://github.com/panusoi/tasmota-commands/actions/workflows/release.yml) [![Testing CI](https://github.com/panusoi/tasmota-commands/actions/workflows/testing.yml/badge.svg)](https://github.com/panusoi/tasmota-commands/actions/workflows/testing.yml)

## Overview

`tasmota-commands` is a monorepo for node.js modules that allow you to easily control Tasmota devices. Still in early development, so only a few commands are supported.

## Packages

| Package                     | Description             | Npm                                                                                                                                   |
| --------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| tasmota-commands-core       | Core functionality      | [![npm version](https://badge.fury.io/js/tasmota-commands-core.svg)](https://www.npmjs.com/package/tasmota-commands-core)             |
| tasmota-commands-http       | Send commands with http | [![npm version](https://badge.fury.io/js/tasmota-commands-http.svg)](https://www.npmjs.com/package/tasmota-commands-http)             |
| tasmota-commands-mqtt       | Send commands with mqtt | [![npm version](https://badge.fury.io/js/tasmota-commands-mqtt.svg)](https://www.npmjs.com/package/tasmota-commands-mqtt)             |
| homebridge-tasmota-commands | Homebridge plugin       | [![npm version](https://badge.fury.io/js/homebridge-tasmota-commands.svg)](https://www.npmjs.com/package/homebridge-tasmota-commands) |

## Installation

### [Homebridge plugin](./packages/tasmota-commands-homebridge/README.md#install)

### Tasmota Commands

1. Install core package `npm install tasmota-commands-core` or `yarn add tasmota-commands-core`
2. Install either the `tasmota-commands-http` or `tasmota-commands-mqtt` to send commands or create your custom [commandHandler](./packages/tasmota-commands-core/README.md#custom-command-handler).
3. Create a `TasmotaCommandsHttp` or `TasmotaCommandsMqtt` instance and start controlling your Tasmota device

## Example usage

1. Install packages `npm install tasmota-commands-core tasmota-commands-http`

2. Create a `TasmotaCommandsHttp` instance and start sending commands:

```javascript
const commands = new TasmotaCommandsHttp({ address: '127.0.0.1' });

// Power up the device
await commands.sendCommand('Control', 'Power0', 'on');

// Change light color to red
await commands.sendCommand('Light', 'Color', '255,0,0');

// Get current wifi light color
const color = await commands.sendCommand('Light', 'Color');

// Get current device state
const state = await commands.sendCommand('Management', 'State');

// Send any command with "Custom"
await commands.sendCommand('Custom', 'Sleep', 50);
```

## Features

- Send commands to Tasmota device
  - Supported protocols are http and mqtt
  - Currently only a few command payloads are typed (`Power`, `CT`, `Dimmer`, `Color`, `HSBColor`)
- Read Tasmota device state
- Auto refresh state in the background
- Homebridge plugin
  - Presets
    - Switch
    - On/off
  - Lightbulb
    - On/off
    - Brightness
    - Brightness and Color Temperature
    - RGB
  - Custom
    - Set device type and set characteristics

## Roadmap

- Core
  - [ ] More command payload types
  - [ ] Improve state management
    - [ ] Improve types
    - [ ] Add validation
- Http
  - [ ] Improve connection handling
  - [ ] Add more configuration options
- Mqtt
  - [ ] Improve subscription management and Tasmota state handling
  - [ ] Add more configuration options
- [ ] Update readme and documentation

## Contribution

Before creating an issue, please make sure that it hasn't already been reported. See [contribution guide](./CONTRIBUTING.md) if you'd like to contribute.

## License

MIT
