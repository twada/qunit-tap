#!/bin/sh

DIR=$(cd $(dirname $0); pwd -P)

SUITE_DIR=${DIR}/compatibility
QUNIT_RUNNER=${DIR}/../sample/js/run_qunit.js
SUITE_FILE_NAME=test_compat.html
SUITE_FILE=${DIR}/phantomjs/${SUITE_FILE_NAME}

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
