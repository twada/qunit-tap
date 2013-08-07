#!/bin/sh

DIR=$(cd $(dirname $0) && pwd)

CMDNAME=`basename $0`
if [ $# -ne 2 ]; then
  echo "usage: $CMDNAME version NUM" 1>&2
  exit 1
fi
version=$1
NUM=$2

node $DIR/expected/expected_output.js --version=$version > ${DIR}/expected.txt
diff -q ${DIR}/expected.txt ${DIR}/actual.txt > /dev/null
if [ $? -eq 0 ]; then
    echo "ok $NUM - ${version}"
else
    echo "not ok $NUM - ${version}"
    diff -u ${DIR}/expected.txt ${DIR}/actual.txt
fi
rm ${DIR}/expected.txt
rm ${DIR}/actual.txt
