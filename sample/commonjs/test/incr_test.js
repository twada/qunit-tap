require("../test_helper");
inc = require("../lib/incr").increment;

QUnit.module("incr module");

QUnit.test('increment' , function() {
               assert.equal(inc(1), 2);
               assert.equal(inc(-3), -2);
           });

QUnit.start();
