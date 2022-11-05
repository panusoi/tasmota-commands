#!/bin/sh

find ./dist/esm -name "*.js" -exec sh -c 'mv "$1" "${1%.js}".mjs' - '{}' \;