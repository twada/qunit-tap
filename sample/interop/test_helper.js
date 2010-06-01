exports = module.exports = global;

QUnit = require("../../vendor/qunit/qunit/qunit").QUnit;
require("../../lib/qunit-tap");

var sys = require("sys");
for (var i in sys) exports[i] = sys[i];

exports.assert = QUnit;
