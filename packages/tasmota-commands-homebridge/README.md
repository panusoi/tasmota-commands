# Tasmota Commands Homebridge Plugin

[![npm version](https://badge.fury.io/js/homebridge-tasmota-commands.svg)](https://www.npmjs.com/package/homebridge-tasmota-commands)

- [Tasmota Commands Homebridge Plugin](#tasmota-commands-homebridge-plugin)
  - [Overview](#overview)
  - [Features](#features)
  - [Install](#install)
    - [With Config UI X:](#with-config-ui-x)
    - [NPM](#npm)
  - [Configuration](#configuration)
    - [Common parameters](#common-parameters)
    - [Protocol parameters](#protocol-parameters)
    - [Preset parameters](#preset-parameters)
  - [Roadmap](#roadmap)
  - [Setup Development Environment](#setup-development-environment)
    - [Install Development Dependencies](#install-development-dependencies)
    - [Build Plugin](#build-plugin)
    - [Running Homebridge and Watching For Changes](#running-homebridge-and-watching-for-changes)
  - [Contribution](#contribution)
  - [License](#license)

## Overview

Homebridge plugin for controlling Tasmota devices. Currently in early development.

## Features

This plugin currently supports following features:

- [x] Switch
  - [x] On/off
- [x] Lightbulb
  - [x] On/off
  - [x] Brightness
  - [x] Brightness and Color Temperature
- [x] Custom
  - [x] Set device type
  - [x] Set characteristics

For planned features see [roadmap](../../README.md#roadmap).

## Install

### With [Config UI X](https://github.com/oznu/homebridge-config-ui-x):

1. Search "homebridge-tasmota-commands" from the Plugins tab
2. Install the plugin and configure accessories using the UI

### NPM

1. `npm install -g homebridge-tasmota-commands`
2. Update your configuration file, see [configuration](#configuration)

## Configuration

Sample configuration using preset

```
  "accessories": [
    {
      "name": "Lightbulb (on/off)",
      "protocol": "http",
      "preset": "lightbulb-on-off",
      "address": "127.0.0.1",
      "accessory": "tasmota-commands"
    }
  ]
}
```

Sample configuration using custom preset

```
  "accessories": [
    {
      "name": "Custom",
      "protocol": "http",
      "preset": "custom",
      "type": "lightbulb",
      "customPresetCharacteristics": ["On"],
      "address": "127.0.0.1",
      "accessory": "tasmota-commands"
    }
 ]
```

### Common parameters

| Parameter       | Required | Accepted values                 | Description                                                                             |
| --------------- | -------- | ------------------------------- | --------------------------------------------------------------------------------------- |
| name            | `yes`    | Valid Homebridge accessory name |                                                                                         |
| refreshInterval | `no`     | `number`                        | Refresh interval in seconds. Set to `0` or `undefined` to disable. Disabled by default. |

### Protocol parameters

| Parameter | Required              | Accepted values                                                             | Description                                                               |
| --------- | --------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| protocol  | `yes`                 | `http`                                                                      | Currently only `http` protocol is supported. `Mqtt` support is on roadmap |
| address   | if protocol is `http` | IP Address or address to device without `http(s)://`, e.x. `mydevice.local` |                                                                           |
| username  | `no`                  | Valid Tasmota username                                                      |                                                                           |
| password  | `no`                  | Valid Tasmota password                                                      |                                                                           |

### Preset parameters

| Parameter                   | Required              | Accepted values                                                                                  | Description                                                                                      |
| --------------------------- | --------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| preset                      | `yes`                 | `switch-on-off`, `lightbulb-on-off`, `lightbulb-brightness`, `lightbulb-brightness-ct`, `custom` | Predefined characteristic sets. Using `custom` you can manually set what characteristics to use. |
| type                        | if preset is `custom` | `lightbulb`, `switch`                                                                            | Device type                                                                                      |
| customPresetCharacteristics | if preset is `custom` | Set/array of `On`, `Brightness`, `ColorTemperature`                                              | Note that not all of characteristics may not work together with each other                       |

## [Roadmap](../../README.md#roadmap)

## Setup Development Environment

You must have Node.js 14 or later installed. This plugin is written with [Typescript](https://www.typescriptlang.org/). This package is part of `tasmota-commands` monorepo and is using Yarn v2 as package manager with workspaces.

### Install Development Dependencies

Navigate to the project folder and install dependencies with yarn

```
yarn install
```

### Build Plugin

Typescript needs to be compiled into Javascript before it can be used. Following command compiles contents in `src` into `dist`. Plugin is depending of two packages in this monorepo, `tasmota-commands-core` and `tasmota-commands-http` which should be automatically built during dependency installation.

```
yarn build
```

### Running Homebridge and Watching For Changes

You can run homebridge in debug mode with [Config UI X](https://github.com/oznu/homebridge-config-ui-x) and watch for changes by running:

```
yarn dev
```

Example configuration is [here](./homebridge-example-config.json). Homebridge reads configuration from `~/.homebridge/config.json`, you may need to setup the Config UI X on first time. There is no need for linking this package to global `node_modules`, yarn workspaces should link it automatically and it should appear in Plugins tab in the Config UI X.

## [Contribution](../../README.md#contribution)

## License

MIT
