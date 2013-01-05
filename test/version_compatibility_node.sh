#!/bin/sh

DIR=$(cd $(dirname $0); pwd -P)
SUITE_DIR=${DIR}/compatibility

for version in $(ls $SUITE_DIR)
do
    echo "testing ${version}"

    node $DIR/node/expected_output.js --version=$version > ${DIR}/expected.txt
    node $DIR/node/test_compat.js --version=$version > ${DIR}/actual.txt
    diff -u ${DIR}/expected.txt ${DIR}/actual.txt

    rm ${DIR}/expected.txt
    rm ${DIR}/actual.txt
done
