# Tasmota Commands Core

[![npm version](https://badge.fury.io/js/tasmota-commands-core.svg)](https://www.npmjs.com/package/tasmota-commands-core)

- [Tasmota Commands Core](#tasmota-commands-core)
  - [Overview](#overview)
  - [Install](#install)
  - [Custom command handler](#custom-command-handler)
  - [Example](#example)
  - [Parameters](#parameters)
  - [Setup Development Environment](#setup-development-environment)
    - [Install Development Dependencies](#install-development-dependencies)
  - [Roadmap](#roadmap)
  - [Contribution](#contribution)
  - [License](#license)

## Overview

A core package for controlling Tasmota devices. Doesn't include any implementations for sending the commands. Use the package `tasmota-commands-http` or `tasmota-commands-mqtt` if you want a ready-to-use solution or create a custom [commandHandler](#custom-command-handler)

## Install

`npm install tasmota-commands-core` or `yarn add tasmota-commands-core`

## Custom command handler

Create a function satisfying type "CommandHandler" that sends a command and returns a response. The response should be a json object that Tasmota returns.

```typescript
import { CommandHandler } from 'tasmota-commands-core';

const myCustomCommandHandler: CommandHandler = async ({ command, payload, logger }) => {
  // Send command
  // Wait response
  return { POWER: 'OFF' };
};
```

## Example

```javascript

const myCustomCommandHandler = ...;

const commands = new TasmotaCommands(myCustomCommandHandler);
commands.Control.setPower0('on');
```

## Parameters

| Parameter            | Required | Accepted values                                     | Description                                                                                             |
| -------------------- | -------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| refreshStateOnInit   | `no`     | `boolean`                                           | Get the current state from the device asynchronously after class initialization                         |
| refreshStateInterval | `no`     | `number`                                            | Refresh state interval in milliseconds. Disabled by default.                                            |
| logger               | `no`     | logger implementation, should satisfy type `Logger` | Logging implementation. Leave unset to disable logging. Set to `console` or your custom implementation. |
| onStateChanged       | `no`     | `OnStateChangeCallback`                             | Callback that is called always after state is changed                                                   |
| onStateRefreshed     | `no`     | `OnStateChangeCallback`                             | Callback that is called always after state is refreshed                                                 |

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
