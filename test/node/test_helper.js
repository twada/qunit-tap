var argv = require('optimist').argv,
    qunitVersion = argv.version,
    qunitPath = "../compatibility/" + qunitVersion + "/qunit",
    qunitTap = require("../../lib/qunit-tap").qunitTap,
    util = require("util"),
    fs = require('fs'),
    path = require('path'),
    assert = require('assert'),
    async = require('async'),
    semver = require('semver'),
    actual = [],
    QUnit,
    slice = Array.prototype.slice,
    log = argv.verbose ? function (str) { util.puts('# ' + str); } : function (str) {},
    before_1_0_0 = function () {
        return (!semver.valid(qunitVersion) && qunitVersion !== 'stable');
    },
    starter = function () {};


// require QUnit (in two ways)
if (before_1_0_0() || semver.lt(qunitVersion, '1.3.0')) {
    QUnit = require(qunitPath).QUnit;
} else {
    QUnit = require(qunitPath);
}


var outputSpy = function (str) {
    log(str);
    actual.push(str);
};


var verifyOutput = function () {
    var fileName;
    // expected output for specific version
    if (qunitVersion === 'stable') {
        fileName = 'latest_format.txt';
    } else if (qunitVersion === '001_two_args') {
        fileName = '001_format.txt';
    } else if (before_1_0_0() || semver.lt(qunitVersion, '1.4.0')) {
        fileName = 'output_before_1_4_0.txt';
    } else if (semver.lt(qunitVersion, '1.10.0')) {
        fileName = 'output_before_1_10_0.txt';
    } else {
        fileName = 'latest_format.txt';
    }

    async.series({
        expected: function(next){
            fs.readFile(path.resolve(__dirname, fileName), 'utf8', function (err, data) {
                if (err) throw err;
                next(null, data);
            });
        },
        actual: function(next){
            next(null, actual.join('\n') + '\n');
        },
    },
    function(err, results) {
        if (err) throw err;
        try {
            assert.equal(results.actual, results.expected);
            util.print('.');
        } catch (e) {
            util.puts('F');
            if (typeof QUnit.diff === 'function') {
                util.puts(QUnit.diff(results.actual, results.expected));
            } else {
                util.puts('# ' + qunitVersion + ' Failed.');
                util.puts(results.actual);
            }
        }
    });
};


// register verifyOutput function
if (before_1_0_0()) {
    QUnit.done = verifyOutput;
} else {
    QUnit.done(verifyOutput);
}

qunitTap(QUnit, outputSpy, {noPlan: true, showSourceOnFailure: false});
QUnit.init();

if (QUnit.config !== undefined) {
    QUnit.config.updateRate = 0;
}

// starter function (required before 1.3.0)
if (before_1_0_0() || semver.lt(qunitVersion, '1.3.0')) {
    starter = function () {
        QUnit.start();
    };
}

var orig = QUnit.tap.moduleStart;
QUnit.tap.moduleStart = function(arg) {
    orig.apply(QUnit.tap, slice.apply(arguments));
    var name = (typeof arg === 'string') ? arg : arg.name;
    // 'this' refers to QUnit.tap
    this.note('customized: ' + name);
};

exports.helper = {
    QUnit: QUnit,
    starter: starter
};
