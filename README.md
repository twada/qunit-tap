QUnit-TAP - a TAP Output Producer Plugin for QUnit
================================


DESCRIPTION
---------------------------------------
QUnit-TAP is a simple plugin for [QUnit](http://docs.jquery.com/QUnit) to produce [TAP](http://testanything.org/) output, to run tests on command-line.

With QUnit-TAP you can test your QUnit test scripts on CUI, and you can use TAP Consumers like [prove](http://perldoc.perl.org/prove.html) for test automation.

QUnit-TAP runs under command-line js environment (like [SpiderMonkey](https://developer.mozilla.org/en/SpiderMonkey) or [Rhino](https://developer.mozilla.org/en/Rhino)) and [CommonJS](http://commonjs.org/) environment (like [node.js](http://nodejs.org/) or [narwhal](http://narwhaljs.org/)).


DOWNLOAD
---------------------------------------
* Just download [qunit-tap.js](http://github.com/twada/qunit-tap/raw/master/lib/qunit-tap.js)
* or download archive from [qunit-tap archives](http://github.com/twada/qunit-tap/downloads)
* or `git clone git://github.com/twada/qunit-tap.git`
* or `npm install qunit-tap` if you use npm.


USAGE
---------------------------------------
Quite simple. Just load/require qunit-tap.js after loading qunit.js.

You can use QUnit-TAP,

* as a single file, copy lib/qunit-tap.js to anywhere you like.
* as git submodule.
* as a node.js package (via npm).
* as a zipped CommonJS package (not tested yet).


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


TESTED ENVIRONMENTS
---------------------------------------
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
