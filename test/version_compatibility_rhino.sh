#!/bin/sh

DIR=$(cd $(dirname $0) && pwd)

SUITE_DIR=${DIR}/compatibility
ROOT_DIR=`dirname ${DIR}`

if [ ! -e $DIR/js.jar ]; then
    $DIR/download_rhino.sh
fi

QUNIT_HEAD_URL=http://code.jquery.com/qunit/qunit-git.js
HEAD_VERSION_TEST_DIR=${SUITE_DIR}/head
mkdir -p $HEAD_VERSION_TEST_DIR
echo "# fetching QUnit HEAD start"
curl -s $QUNIT_HEAD_URL > $HEAD_VERSION_TEST_DIR/qunit.js
echo "# fetching QUnit HEAD done"

NUM=1
for version in $(ls $SUITE_DIR)
do
    java -jar $DIR/js.jar $DIR/rhino/test_compat_rhino.js $version $ROOT_DIR > ${DIR}/actual.txt
    node $DIR/node/expected_output.js --version=$version > ${DIR}/expected.txt
    diff -q ${DIR}/expected.txt ${DIR}/actual.txt > /dev/null
    if [ $? -eq 0 ]; then
        echo "ok $NUM - ${version}"
    else
        echo "not ok $NUM - ${version}"
        diff -u ${DIR}/expected.txt ${DIR}/actual.txt
    fi
    rm ${DIR}/expected.txt
    rm ${DIR}/actual.txt
    NUM=`expr $NUM + 1`
done

echo "1..$(echo `ls $SUITE_DIR | wc -l`)"

rm -rf $HEAD_VERSION_TEST_DIR
