QUnit-TAP - A TAP Output Producer Plugin for QUnit
================================


DESCRIPTION
---------------------------------------
QUnit-TAP is a plugin for [QUnit](http://docs.jquery.com/QUnit) to produce [TAP](http://testanything.org/) output. With QUnit-TAP you can use TAP Consumers like [prove](http://search.cpan.org/perldoc?prove) for test automation.

QUnit-TAP runs under command-line js environment (like [SpiderMonkey](https://developer.mozilla.org/en/SpiderMonkey) or [Rhino](https://developer.mozilla.org/en/Rhino)) and [CommonJS](http://commonjs.org/) environment (like [node.js](http://nodejs.org/)).


INSTALLATION
---------------------------------------
* as single file, copy lib/qunit-tap.js to anywhere you like.
* as git submodule.
* as CommonJS package.


SAMPLES
---------------------------------------
### standard usage

    # assume you are using rhino
    $ cd sample/js/
    $ rhino run_tests.js

for details, see sample/js/


### under CommonJS environment

    # assume you are using node.js
    $ cd sample/commonjs/
    $ node test/math_test.js
    $ node test/incr_test.js

    # with prove
    $ prove --exec=/usr/local/bin/node test/*.js

for details, see sample/commonjs/


### to use both under standard js and CommonJS environments

    # assume you are using node.js and rhino
    $ cd sample/interop/
    $ rhino run_tests.js
    $ node test/math_test.js
    $ node test/incr_test.js

    # with prove
    $ prove --exec=/usr/bin/rhino run_tests.js
    $ prove --exec=/usr/local/bin/node test/*.js

for details, see see sample/interop/


AUTHOR
---------------------------------------
Takuto Wada (takuto.wada at gmail dot com)


LICENSE
---------------------------------------
Dual licensed under the MIT and GPL licenses.
