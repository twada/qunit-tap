#!/bin/sh

HEAD_VERSION_TEST_DIR=$1
CMDNAME=`basename $0`
if [ $# -ne 1 ]; then
  echo "usage: $CMDNAME HEAD_VERSION_TEST_DIR" 1>&2
  exit 1
fi

DIR=$(cd $(dirname $0) && pwd)

QUNIT_HEAD_URL=http://code.jquery.com/qunit/qunit-git.js
echo "# fetching QUnit HEAD start"
curl --fail --silent --output $DIR/qunit.js $QUNIT_HEAD_URL
if [ -e $DIR/qunit.js ]; then
    echo "# fetching QUnit HEAD done"
    mkdir -p $HEAD_VERSION_TEST_DIR
    mv $DIR/qunit.js $HEAD_VERSION_TEST_DIR/qunit.js
else
    echo "# fetching QUnit HEAD failed (maybe off-line)"
fi
