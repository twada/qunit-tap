#!/bin/sh

DIR=$(cd $(dirname $0) && pwd)

SUITE_DIR=${DIR}/compatibility

HEAD_VERSION_TEST_DIR=${SUITE_DIR}/head
$DIR/download_qunit_head.sh $HEAD_VERSION_TEST_DIR

if [ $# -eq 1 ]; then
    TEST_SUITES=$1
else
    TEST_SUITES=$(ls $SUITE_DIR)
fi

NUM=1
for version in $TEST_SUITES
do
    if [ $version = '1.12.0' -o $version = '1.11.0' ]; then 
        echo "# skip $version"
        continue;
    fi

    node $DIR/node/test_compat.js --version=$version > ${DIR}/actual.txt

    $DIR/compare_with_expected_output.sh $version $NUM

    NUM=`expr $NUM + 1`
done

echo "1..$(expr $NUM - 1)"

rm -rf $HEAD_VERSION_TEST_DIR
