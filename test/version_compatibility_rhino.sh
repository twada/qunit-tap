#!/bin/sh

DIR=$(cd $(dirname $0); pwd -P)
SUITE_DIR=${DIR}/compatibility
ROOT_DIR=`dirname ${DIR}`

for version in $(ls $SUITE_DIR)
do
    echo "testing ${version}"

    node $DIR/node/expected_output.js --version=$version > ${DIR}/expected.txt
    java -jar $DIR/js.jar $DIR/rhino/test_compat_rhino.js $version $ROOT_DIR > ${DIR}/actual.txt
    diff -u ${DIR}/expected.txt ${DIR}/actual.txt

    rm ${DIR}/expected.txt
    rm ${DIR}/actual.txt
done
