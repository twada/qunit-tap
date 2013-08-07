load("./lib/math.js");
load("./lib/incr.js");

load("../../test/compatibility/1.10.0/qunit.js");
load("../../lib/qunit-tap.js");

qunitTap(QUnit, print, {showSourceOnFailure: true});

QUnit.init();
QUnit.config.updateRate = 0;

load("./test/math_test.js");
load("./test/incr_test.js");
load("./test/tap_compliance_test.js");
load("./test/qunit_assertion_test.js");

QUnit.start();
