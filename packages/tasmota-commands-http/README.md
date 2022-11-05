# Tasmota Commands Http

[![npm version](https://badge.fury.io/js/tasmota-commands-http.svg)](https://www.npmjs.com/package/tasmota-commands-http)

## Overview

Control Tasmota devices with the http protocol.

## Install

`npm install tasmota-commands-http` or `yarn add tasmota-commands-http`

## Example

```javascript
const commands = new TasmotaCommandsHttp({ address: '127.0.0.1' });
commands.Control.setPower0('on');
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

## [Roadmap](../../readme#roadmap)

## [Contribution](../../readme#contribution)

## License

MIT
