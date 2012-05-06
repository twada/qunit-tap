#!/bin/sh

TARGET_VERSION=$1
CMDNAME=`basename $0`
if [ $# -ne 1 ]; then
  echo "usage: $CMDNAME version" 1>&2
  exit 1
fi

DIR=`dirname $0`
TEMP_ARCHIVE_PATH=$DIR/qunit_downloaded.tar.gz

wget https://github.com/jquery/qunit/tarball/v${TARGET_VERSION} -O ${TEMP_ARCHIVE_PATH}
QUNIT_PATH=`tar ztf $TEMP_ARCHIVE_PATH | grep 'qunit.js'`
tar zxf $TEMP_ARCHIVE_PATH $QUNIT_PATH

mkdir -p $DIR/compatibility/$TARGET_VERSION
mv $QUNIT_PATH $DIR/compatibility/$TARGET_VERSION/qunit.js

rm -rf `echo $QUNIT_PATH | awk -F/ '{print $1}'`
rm $TEMP_ARCHIVE_PATH

echo "added $DIR/compatibility/$TARGET_VERSION/qunit.js"
