#!/bin/sh

TEMP_FOLDER=temp

rm -rf $TEMP_FOLDER > /dev/null || exit 1

echo "Creating dir $TEMP_FOLDER..."
mkdir $TEMP_FOLDER > /dev/null || exit 1 

echo "Copy js files..." 
cp ./js/* ./$TEMP_FOLDER/ > /dev/null || exit 1

echo "Change working dir to $TEMP_FOLDER..."
cd $TEMP_FOLDER > /dev/null || exit 1

echo "Init npm..."
npm init -y > /dev/null || exit 1

echo "Build and pack core..."
(cd ../../packages/tasmota-commands-core && yarn release-build && yarn pack) > /dev/null || exit 1

echo "Build and pack http..."
(cd ../../packages/tasmota-commands-http && yarn release-build && yarn pack) > /dev/null || exit 1

echo "Build and pack mqtt..."
(cd ../../packages/tasmota-commands-mqtt && yarn release-build && yarn pack) > /dev/null || exit 1

echo "Copy packages..."
cp ../../packages/tasmota-commands-core/package.tgz ./core.tgz > /dev/null || exit 1
cp ../../packages/tasmota-commands-http/package.tgz ./http.tgz > /dev/null || exit 1
cp ../../packages/tasmota-commands-mqtt/package.tgz ./mqtt.tgz > /dev/null || exit 1

echo "Install core..."
npm i file:core.tgz > /dev/null || exit 1

echo "Install http..."
npm i file:http.tgz > /dev/null || exit 1

echo "Install mqtt..."
npm i file:mqtt.tgz > /dev/null || exit 1

echo "Prepare completed."

