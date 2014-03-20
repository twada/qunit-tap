#!/bin/sh

DIR=$(cd $(dirname $0) && pwd)

SUITE_DIR=${DIR}/compatibility
ROOT_DIR=`dirname ${DIR}`

if [ ! -e $DIR/js.jar ]; then
    $DIR/download_rhino.sh
fi

HEAD_VERSION_TEST_DIR=${SUITE_DIR}/head
$DIR/download_qunit_head.sh $HEAD_VERSION_TEST_DIR

NUM=1
for version in $(ls $SUITE_DIR)
do
    if [ $version = '1.12.0' -o $version = '1.11.0' ]; then 
        echo "# skip $version"
        continue;
    fi

    java -jar $DIR/js.jar $DIR/rhino/test_compat_rhino.js $version $ROOT_DIR > ${DIR}/actual.txt

    $DIR/compare_with_expected_output.sh $version $NUM

    NUM=`expr $NUM + 1`
done

echo "1..$(expr $NUM - 1)"

rm -rf $HEAD_VERSION_TEST_DIR
