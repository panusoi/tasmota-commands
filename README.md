# Tasmota Commands

## NOTE: Still under development, the first stable version will be version 1.0.0

## Overview

`tasmota-commands` is a monorepo for node.js modules that allow you to easily control Tasmota devices. Still in early development, so only supports a few commands are supported.

## Packages

| Package                     | Description             |
| --------------------------- | ----------------------- |
| tasmota-commands-core       | Core functionality      |
| tasmota-commands-http       | Send commands with http |
| tasmota-commands-homebridge | Homebridge plugin       |

## Installation

### [Homebridge plugin](./packages/tasmota-commands-homebridge/README.md#install)

### Tasmota Commands

Install core package

```
npm install tasmota-commands-core

OR

yarn add tasmota-commands-core
```

If you want to send commands with `http` also install

```
npm install tasmota-commands-http

OR

yarn add tasmota-commands-core

```

## Example usage

Install packages `npm install tasmota-commands-core tasmota-commands-http`

Create `TasmotaCommandsHttp` instance and send power command:

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
        - [ ] More..
      - [ ] More...
    - [ ] State
      - [x] Basic state management
      - [ ] Better state management
        - [ ] Correct typings
        - [ ] Validation
        - [ ] More..
  - [x] Http support
  - [ ] Mqtt support
  - [ ] Homebridge plugin
    - [x] Switch
      - [x] On/off
    - [x] Lightbulb
      - [x] On/off
      - [x] Brightness
      - [x] Brightness and Color Temperature
      - [ ] RGB
    - [x] Custom
      - [x] Set device type
      - [x] Set characteristics
- Other
  - [ ] Update documentation
  - [ ] Generated api documentation
  - [x] Build CJS and ESM modules
  - [x] Versioning management with [Changesets](https://github.com/changesets/changesets)
  - [ ] Add package exports integrity tests

## Contribution

Before creating an issue, please make sure that it hasn't already been reported. See [contribution guide](./CONTRIBUTING.md) if you'd like to contribute.

## License

MIT
