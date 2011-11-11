if ( typeof exports !== "undefined" || typeof require !== "undefined" ) {
    require("../test_helper");
    xx = require("../lib/incr");
    equal = assert.equal;
}

QUnit.module("incr module");

QUnit.test('increment' , function() {
         var inc = xx.increment;
         equal(inc(1), 2);
         equal(inc(-3), -2);
     });

if ( typeof exports !== "undefined" || typeof require !== "undefined" ) {
    QUnit.start();
}
