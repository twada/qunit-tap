#!/bin/sh

DIR=$(cd $(dirname $0); pwd -P)

$DIR/version_compatibility_node.sh
$DIR/version_compatibility_phantomjs.sh
$DIR/version_compatibility_rhino.sh
perl $DIR/tap_spec_parser.pl
