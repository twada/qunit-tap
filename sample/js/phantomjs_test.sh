#!/bin/sh
URL=file://$PWD/index.html
phantomjs run_qunit.js $URL | sed -e "s%^$URL\:[0-9]* %%g"
