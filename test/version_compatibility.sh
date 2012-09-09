#!/bin/sh

DIR=`dirname $0`

for i in $(ls $DIR/compatibility)
do
    $DIR/suite/compat_test.js --version=$i
done
echo ''
