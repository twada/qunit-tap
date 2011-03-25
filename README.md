QUnit-TAP - a TAP Output Producer Plugin for QUnit
================================


*NEWS (2011/03/25)* Usage has changed. Please see USAGE section.


DESCRIPTION
---------------------------------------
QUnit-TAP is a simple plugin for [QUnit](http://docs.jquery.com/QUnit) to produce [TAP](http://testanything.org/) output, to run tests on command-line.

With QUnit-TAP you can test your QUnit test scripts on CUI, and you can use TAP Consumers like [prove](http://perldoc.perl.org/prove.html) for test automation.

QUnit-TAP runs under headless browsers like [phantomjs](http://code.google.com/p/phantomjs/), command-line js environments (like [SpiderMonkey](https://developer.mozilla.org/en/SpiderMonkey) or [Rhino](https://developer.mozilla.org/en/Rhino)), and [CommonJS](http://commonjs.org/) environments (like [node.js](http://nodejs.org/) or [narwhal](http://narwhaljs.org/)), and of cource, runs under real browser too.


DOWNLOAD
---------------------------------------
* Just download [qunit-tap.js](http://github.com/twada/qunit-tap/raw/master/lib/qunit-tap.js)
* or download archive from [qunit-tap archives](http://github.com/twada/qunit-tap/downloads)
* or `git clone git://github.com/twada/qunit-tap.git`
* or `npm install qunit-tap` if you use npm.

You can use QUnit-TAP,

* as a single file, copy lib/qunit-tap.js to anywhere you like.
* as git submodule.
* as a node.js package (via npm).
* as a zipped CommonJS package (not tested yet).


USAGE
---------------------------------------
Two steps are required to use QUnit-TAP.

1. load/require qunit-tap.js
2. Call qunitTap function with two or three arguments. The first argument is QUnit reference, the second is print-like function for TAP output. And the third argument is object to customize default behavior. (Note that the first and second argument is mandatory, and the third argument is optional.)

### usage example 1 : QUnit-TAP initialization under SpiderMonkey
    load("path/to/qunit.js");
    load("path/to/qunit-tap.js");

    // enable TAP output
    qunitTap(QUnit, print);  //NOTE: 'print' is SpiderMonkey's built-in function

    // or customize default behavior
    // qunitTap(QUnit, print, {showDetailsOnFailure: false});

### usage example 2 : QUnit-TAP initialization under HTML (e.g. for PhantomJS)
    <script type="text/javascript" src="path/to/qunit.js"></script>
    <script type="text/javascript" src="path/to/qunit-tap.js"></script>
    <script>
      qunitTap(QUnit, function() { console.log.apply(console, arguments); });
    </script>


TAP OUTPUT EXAMPLE
---------------------------------------
    1..16
    # module: math module
    # test: add
    ok 1
    ok 2
    ok 3 - passing 3 args
    ok 4 - just one arg
    ok 5 - no args
    not ok 6 - expected: 7 result: 1
    not ok 7 - with message, expected: 7 result: 1
    ok 8
    ok 9 - with message
    not ok 10
    not ok 11 - with message
    # module: incr module
    # test: increment
    ok 12
    ok 13
    # module: TAP spec compliance
    # test: Diagnostic lines
    ok 14 - with\r
    # multiline
    # message
    not ok 15 - with\r
    # multiline
    # message, expected: foo\r
    # bar result: foo
    # bar
    not ok 16 - with\r
    # multiline
    # message, expected: foo
    # bar result: foo\r
    # bar


RUNNING SAMPLES
---------------------------------------
### prepare
    $ git clone git://github.com/twada/qunit-tap.git
    $ cd qunit-tap
    $ git submodule update --init 


### standard usage

    # assume you are using rhino
    $ cd sample/js/
    $ rhino run_tests.js

for details, see [sample/js/](http://github.com/twada/qunit-tap/tree/master/sample/js/)


### under CommonJS environment

    # assume you are using node.js
    $ cd sample/commonjs/
    $ node test/math_test.js
    $ node test/incr_test.js

    # with prove
    $ prove --exec=/usr/local/bin/node test/*.js

for details, see [sample/commonjs/](http://github.com/twada/qunit-tap/tree/master/sample/commonjs/)


### to use both under standard js and CommonJS environments

    # assume you are using node.js and rhino
    $ cd sample/interop/
    $ rhino run_tests.js
    $ node test/math_test.js
    $ node test/incr_test.js

    # with prove
    $ prove --exec=/usr/bin/rhino run_tests.js
    $ prove --exec=/usr/local/bin/node test/*.js

for details, see [sample/interop/](http://github.com/twada/qunit-tap/tree/master/sample/interop/)


### to run with PhantomJS

    # assume you have built and installed phantomjs
    $ cd sample/js/
    $ ./phantomjs_test.sh

    # with prove
    $ prove phantomjs_test.sh

for details, see [phantomjs_test.sh](http://github.com/twada/qunit-tap/tree/master/sample/js/phantomjs_test.sh)



TESTED ENVIRONMENTS
---------------------------------------
* [phantomjs](http://code.google.com/p/phantomjs/)
* [SpiderMonkey](https://developer.mozilla.org/en/SpiderMonkey)
* [Rhino](https://developer.mozilla.org/en/Rhino)
* [node.js](http://nodejs.org/)
* [narwhal](http://narwhaljs.org/)


AUTHOR
---------------------------------------
Takuto Wada (takuto.wada at gmail dot com)


LICENSE
---------------------------------------
Dual licensed under the MIT and GPLv2 licenses.
