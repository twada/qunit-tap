#!/bin/sh

DIR=$(cd $(dirname $0); pwd -P)
SUITE_DIR=${DIR}/compatibility

QUNIT_HEAD_URL=http://code.jquery.com/qunit/qunit-git.js
HEAD_VERSION_TEST_DIR=${SUITE_DIR}/head

mkdir -p $HEAD_VERSION_TEST_DIR
echo "fetching QUnit HEAD"
curl $QUNIT_HEAD_URL > $HEAD_VERSION_TEST_DIR/qunit.js

for version in $(ls $SUITE_DIR)
do
    echo "testing ${version}"

    node $DIR/node/expected_output.js --version=$version > ${DIR}/expected.txt
    node $DIR/node/test_compat.js --version=$version > ${DIR}/actual.txt
    diff -u ${DIR}/expected.txt ${DIR}/actual.txt

    rm ${DIR}/expected.txt
    rm ${DIR}/actual.txt
done

rm -rf $HEAD_VERSION_TEST_DIR
