var helper = require("./test_helper").helper,
    starter = helper.starter;

global.QUnit = helper.QUnit;
global.incr = require("../../sample/commonjs/lib/incr");
global.math = require("../../sample/commonjs/lib/math");

require("../suite");

starter();
