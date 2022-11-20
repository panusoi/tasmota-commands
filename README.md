# Tasmota Commands

## NOTE: Still under development, the first stable version will be version 1.0.0

[![Release](https://github.com/panusoi/tasmota-commands/actions/workflows/release.yml/badge.svg)](https://github.com/panusoi/tasmota-commands/actions/workflows/release.yml) [![Testing CI](https://github.com/panusoi/tasmota-commands/actions/workflows/testing.yml/badge.svg)](https://github.com/panusoi/tasmota-commands/actions/workflows/testing.yml)

## Overview

`tasmota-commands` is a monorepo for node.js modules that allow you to easily control Tasmota devices. Still in early development, so only supports a few commands are supported.

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
3. Create `TasmotaCommandsHttp` or `TasmotaCommandsMqtt` instance and start controlling your Tasmota device

## Example usage

1. Install packages `npm install tasmota-commands-core tasmota-commands-http`

2. Create `TasmotaCommandsHttp` instance and send power command:

```javascript
const commands = new TasmotaCommandsHttp({ address: '127.0.0.1' });
commands.Control.setPower0('on');
```

## Roadmap

- Packages
  - [ ] Core
    - [ ] Commands
      - [ ] Control
        - [x] Power0
        - [ ] More...
      - [ ] Management
        - [x] State
        - [ ] More...
      - [ ] Light
        - [x] Dimmer
        - [x] CT
        - [x] Color<x>
        - [x] HSBColor
        - [x] HSBColor1
        - [x] HSBColor2
        - [x] HSBColor3
        - [ ] More..
      - [ ] More...
    - [ ] State
      - [x] Basic state management
      - [ ] Better state management
        - [ ] Correct typings
        - [ ] Validation
        - [ ] More..
      - [x] Option to refresh state periodically in background
  - [] Http
    - [x] Basic http support
    - [ ] More configuration options
  - [] Mqtt
    - [x] Basic mqtt support
    - [ ] More configuration options
  - [ ] Homebridge plugin
    - [x] Option to refresh state periodically in background
    - [x] Switch
      - [x] On/off
    - [x] Lightbulb
      - [x] On/off
      - [x] Brightness
      - [x] Brightness and Color Temperature
      - [x] RGB
    - [x] Custom
      - [x] Set device type
      - [x] Set characteristics
- Other
  - [ ] Update documentation
  - [ ] Generated api documentation
  - [x] Build CJS and ESM modules
  - [x] Versioning management with [Changesets](https://github.com/changesets/changesets)
  - [x] Add package exports integrity tests

## Contribution

Before creating an issue, please make sure that it hasn't already been reported. See [contribution guide](./CONTRIBUTING.md) if you'd like to contribute.

## License

MIT
