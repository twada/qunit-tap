#!/bin/sh

DIR=`dirname $0`
CMDNAME=`basename $0`
if [ $# -ne 2 ]; then
  echo "usage: $CMDNAME current_version bump_kind" 1>&2
  exit 1
fi
CURRENT_VERSION=$1
BUMP_KIND=$2

IFS_BACKUP=$IFS
IFS='.'
set -- $CURRENT_VERSION
if [ $BUMP_KIND = 'major' ]; then
    MAJOR=`expr $1 + 1`
    MINOR=0
    PATCH=0
elif [ $BUMP_KIND = 'minor' ]; then
    MAJOR=$1
    MINOR=`expr $2 + 1`
    PATCH=0
elif [ $BUMP_KIND = 'patch' ]; then
    MAJOR=$1
    MINOR=$2
    PATCH=`expr $3 + 1`
fi
IFS=$IFS_BACKUP

PACKAGE_JSON=$DIR/package.json
BOWER_JSON=$DIR/bower.json
QUNIT_TAP_JS=$DIR/lib/qunit-tap.js
PRE_VERSION="${MAJOR}.${MINOR}.${PATCH}pre"

cp ${PACKAGE_JSON} ${PACKAGE_JSON}.orig
cat ${PACKAGE_JSON}.orig | sed -e "s/$CURRENT_VERSION/$PRE_VERSION/g" > ${PACKAGE_JSON}
rm ${PACKAGE_JSON}.orig

cp ${BOWER_JSON} ${BOWER_JSON}.orig
cat ${BOWER_JSON}.orig | sed -e "s/$CURRENT_VERSION/$PRE_VERSION/g" > ${BOWER_JSON}
rm ${BOWER_JSON}.orig

cp ${QUNIT_TAP_JS} ${QUNIT_TAP_JS}.orig
cat ${QUNIT_TAP_JS}.orig | sed -e "s/$CURRENT_VERSION/$PRE_VERSION/g" > ${QUNIT_TAP_JS}
rm ${QUNIT_TAP_JS}.orig
