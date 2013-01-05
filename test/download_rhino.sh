#!/bin/sh

DIR=`dirname $0`
TEMP_ARCHIVE_PATH=$DIR/rhino_downloaded.zip
wget https://github.com/downloads/mozilla/rhino/rhino1_7R4.zip -O ${TEMP_ARCHIVE_PATH}

RHINO_JAR_PATH=`unzip -l $TEMP_ARCHIVE_PATH | grep js.jar | awk '{print $4}'`
unzip $TEMP_ARCHIVE_PATH $RHINO_JAR_PATH -d $DIR

cp $DIR/$RHINO_JAR_PATH $DIR
rm -rf `dirname $DIR/$RHINO_JAR_PATH`
rm $TEMP_ARCHIVE_PATH
