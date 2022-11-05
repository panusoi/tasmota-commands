#!/bin/sh

TEMP_FOLDER=temp
cd $TEMP_FOLDER

# Core
CORE_CJS=1
CORE_ESM=1

node core.js > /dev/null
CORE_CJS=$?
node --es-module-specifier-resolution=node core.mjs > /dev/null
CORE_ESM=$?

# Http
HTTP_CJS=1
HTTP_ESM=1

node http.js > /dev/null
HTTP_CJS=$?
node --es-module-specifier-resolution=node http.mjs > /dev/null
HTTP_ESM=$?

# Mqtt
MQTT_CJS=1
MQTT_ESM=1

node mqtt.js > /dev/null
MQTT_CJS=$?
node --es-module-specifier-resolution=node mqtt.mjs > /dev/null
MQTT_ESM=$?

# Results
[ ${CORE_CJS?} -eq 0 ] && echo "✓ tasmota-commands-core cjs ok" || echo "✗ tasmota-commands-core cjs failed"
[ ${CORE_ESM?} -eq 0 ] && echo "✓ tasmota-commands-core esm ok" || echo "✗ tasmota-commands-core esm failed"

[ ${HTTP_CJS?} -eq 0 ] && echo "✓ tasmota-commands-http cjs ok" || echo "✗ tasmota-commands-http cjs failed"
[ ${HTTP_ESM?} -eq 0 ] && echo "✓ tasmota-commands-http esm ok" || echo "✗ tasmota-commands-http esm failed"

[ ${MQTT_CJS?} -eq 0 ] && echo "✓ tasmota-commands-mqtt cjs ok" || echo "✗ tasmota-commands-mqtt cjs failed"
[ ${MQTT_ESM?} -eq 0 ] && echo "✓ tasmota-commands-mqtt esm ok" || echo "✗ tasmota-commands-mqtt esm failed"

EXIT_CODE=$(($CORE_CJS + $CORE_ESM + $HTTP_CJS + $HTTP_ESM + $MQTT_CJS + $MQTT_ESM))

if [ $EXIT_CODE -gt 0 ]
then 
    exit 1
fi


