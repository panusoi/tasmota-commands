# Tasmota Commands Mqtt

[![npm version](https://badge.fury.io/js/tasmota-commands-mqtt.svg)](https://www.npmjs.com/package/tasmota-commands-mqtt)

## Overview

Control Tasmota devices with the mqtt protocol.

## Install

`npm install tasmota-commands-mqtt` or `yarn add tasmota-commands-mqtt`

## Example

```javascript
const commands = new TasmotaCommandsMqtt({
  host: 'tcp://127.0.0.1',
  port: 1883,
  topic: 'tasmota_living_room',
  topicFormat: '%prefix%/%topic%/<command>',
  username: 'user',
  password: 'password',
});
commands.Control.setPower0('on');
```

## Parameters

| Parameter     | Required | Accepted values                                                             | Description                                                                                                                |
| ------------- | -------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| host          | `yes`    | brokerUrl with protocol                                                     | only `tcp://` is currently supported, e.g. `tcp://127.0.0.1`                                                               |
| topic         | `yes`    | `string`                                                                    | Topic from Tasmota MQTT parameters                                                                                         |
| topicFormat   | `yes`    | topic format `string` which includes `%prefix%`, `%prefix%` and `<command>` | Full Topic from Tasmota MQTT parameters with added `<command>`, usually to end of string e.g. `%prefix%/%topic%/<command>` |
| port          | `no`     | `number`                                                                    | Broker port e.g. `1883`                                                                                                    |
| username      | `no`     | username                                                                    | Broker username, if any                                                                                                    |
| password      | `no`     | password                                                                    | Broker password, if any                                                                                                    |
| connectOnInit | `no`     | `boolean`                                                                   | Defaults to `true`. Create connection to broker on init.                                                                   |

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
