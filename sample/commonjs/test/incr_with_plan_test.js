var q = require("../test_helper_with_plan").QUnit,
    inc = require("../lib/incr").increment;

q.module("incr module");

q.test('increment' , 2, function() {
    q.equal(inc(1), 2);
    q.equal(inc(-3), -2);
});
