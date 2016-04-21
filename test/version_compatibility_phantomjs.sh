#!/bin/sh

DIR=$(cd $(dirname $0) && pwd)

SUITE_DIR=${DIR}/compatibility
QUNIT_RUNNER=${DIR}/../sample/js/run_qunit.js
SUITE_FILE_NAME=test_compat.html
SUITE_FILE=${DIR}/phantomjs/${SUITE_FILE_NAME}

if [ $# -eq 1 ]; then
    TEST_SUITES=$1
else
    TEST_SUITES=$(ls $SUITE_DIR)
fi

NUM=1
for version in $TEST_SUITES
do
    cp $SUITE_FILE ${SUITE_DIR}/${version}
    phantomjs ${QUNIT_RUNNER} file://${SUITE_DIR}/${version}/${SUITE_FILE_NAME} > ${DIR}/actual.txt

    $DIR/compare_with_expected_output.sh $version $NUM

    NUM=`expr $NUM + 1`
    rm ${SUITE_DIR}/${version}/${SUITE_FILE_NAME}
done

echo "1..$(expr $NUM - 1)"
