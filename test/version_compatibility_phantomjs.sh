#!/bin/sh

DIR=$(cd $(dirname $0); pwd -P)

SUITE_DIR=${DIR}/compatibility
QUNIT_RUNNER=${DIR}/../sample/js/run_qunit.js
SUITE_FILE_NAME=test_compat.html
SUITE_FILE=${DIR}/phantomjs/${SUITE_FILE_NAME}

QUNIT_HEAD_URL=http://code.jquery.com/qunit/qunit-git.js
HEAD_VERSION_TEST_DIR=${SUITE_DIR}/head

mkdir -p $HEAD_VERSION_TEST_DIR
cp $SUITE_FILE $HEAD_VERSION_TEST_DIR
echo "fetching QUnit HEAD"
curl $QUNIT_HEAD_URL > $HEAD_VERSION_TEST_DIR/qunit.js

for version in $(ls $SUITE_DIR)
do
    echo "testing ${version}"
    cp $SUITE_FILE ${SUITE_DIR}/${version}

    node $DIR/node/expected_output.js --version=$version > ${DIR}/expected.txt
    phantomjs ${QUNIT_RUNNER} file://${SUITE_DIR}/${version}/${SUITE_FILE_NAME} > ${DIR}/actual.txt
    diff -u ${DIR}/expected.txt ${DIR}/actual.txt

    rm ${DIR}/expected.txt
    rm ${DIR}/actual.txt
    rm ${SUITE_DIR}/${version}/${SUITE_FILE_NAME}
done

rm -rf $HEAD_VERSION_TEST_DIR
