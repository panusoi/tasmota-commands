# Tasmota Commands Http

[![npm version](https://badge.fury.io/js/tasmota-commands-http.svg)](https://www.npmjs.com/package/tasmota-commands-http)

## Overview

Control Tasmota devices with the http protocol.

## Install

`npm install tasmota-commands-http` or `yarn add tasmota-commands-http`

## Example

```javascript
const commands = new TasmotaCommandsHttp({ address: '127.0.0.1' });

// Power up the device
await commands.sendCommand('Control', 'Power0', 'on');

// Change light color to red
await commands.sendCommand('Light', 'Color', '255,0,0');

// Get current wifi light color
const color = await commands.sendCommand('Light', 'Color');

// Get current divice state
const state = await commands.sendCommand('Management', 'State');

// Send any command with "Custom"
await commands.sendCommand('Custom', 'Sleep', 50);
```

## Parameters

| Parameter | Required | Accepted values                                            |
| --------- | -------- | ---------------------------------------------------------- |
| address   | `yes`    | address of Tasmota device, without `http://` or `https://` |
| username  | `no`     | `string`                                                   |
| password  | `no`     | `string`                                                   |

and all `tasmota-commands-core` [parameters](../tasmota-commands-core/README.md#parameters) are supported.

## Setup Development Environment

### Install Development Dependencies

Navigate to the project folder and install dependencies with yarn

```
yarn install
```

## [Roadmap](../../README.md#roadmap)

## [Contribution](../../README.md#contribution)

## License

MIT
