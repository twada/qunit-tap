var QUnit = require("qunitjs"),
    qunitTap = require("../../lib/qunit-tap").qunitTap,
    util = require("util"),
    assert = require('assert'),
    async = require('async');

var expected = [
    "# module: incr module",
    "# test: increment",
    "ok 1",
    "ok 2",
    "# module: math module",
    "# test: add",
    "ok 3",
    "ok 4 hoge",
    "ok 5 - passing 3 args",
    "ok 6 - just one arg",
    "ok 7 - no args",
    "not ok 8 - expected: '7', got: '1', test: add, module: math module",
    "not ok 9 - with message, expected: '7', got: '1', test: add, module: math module",
    "ok 10",
    "ok 11 - with message",
    "not ok 12 - test: add, module: math module",
    "not ok 13 - with message, test: add, module: math module",
    "# module: TAP spec compliance",
    "# test: Diagnostic lines",
    "ok 14 - with\r\n# multiline\n# message",
    "not ok 15 - with\r\n# multiline\n# message, expected: 'foo\r\n# bar', got: 'foo\n# bar', test: Diagnostic lines, module: TAP spec compliance",
    "not ok 16 - with\r\n# multiline\n# message, expected: 'foo\n# bar', got: 'foo\r\n# bar', test: Diagnostic lines, module: TAP spec compliance",
    "1..16"
];

var actual = [];
var outputSpy = function (str) {
    util.puts(str);
    actual.push([str, expected.shift()]);
};

qunitTap(QUnit, outputSpy, {noPlan: true, showSourceOnFailure: false});
QUnit.done(function () {
    //util.puts('# DONE: start');
    async.forEach(actual, function (tuple, next){
        // util.puts('# asserting: ' + tuple[1]);
        try {
            assert.equal(tuple[0], tuple[1]);
            next();
        } catch (e) {
            next(e);
        }
    }, function(err){
        if (err) {
            util.print('F');
        } else  {
            util.print('.');
        }
        util.puts('# DONE: ' + err);
    });
});

QUnit.init();
QUnit.config.updateRate = 0;

exports.q = QUnit;
