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

echo "Install core..."
npm i tasmota-commands-core@latest --production > /dev/null || exit 1

echo "Install http..."
npm i tasmota-commands-http@latest --production > /dev/null || exit 1

echo "Install mqtt..."
npm i tasmota-commands-mqtt@latest --production > /dev/null || exit 1

echo "Prepare completed."

