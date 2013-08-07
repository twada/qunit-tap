var argv = require('optimist').argv,
    qunitVersion = argv.version,
    qunitPath = "../compatibility/" + qunitVersion + "/qunit",
    qunitTap = require("../../lib/qunit-tap"),
    util = require("util"),
    semver = require('semver'),
    slice = Array.prototype.slice,
    QUnit,
    tap,
    before_1_0_0 = function () {
        return !(semver.valid(qunitVersion) || ['stable', 'head'].some(function(v){ return v === qunitVersion; }));
    },
    starter = function () {};

// require QUnit (in two ways)
if (before_1_0_0() || semver.lt(qunitVersion, '1.3.0')) {
    QUnit = require(qunitPath).QUnit;
} else {
    QUnit = require(qunitPath);
}

tap = qunitTap(QUnit, util.puts, {showSourceOnFailure: false});
QUnit.init();

if (QUnit.config !== undefined) {
    QUnit.config.updateRate = 0;
    if (QUnit.config.semaphore === 1) {
        QUnit.config.semaphore = 0;
    }
}

// starter function (required before 1.3.0)
if (before_1_0_0() || semver.lt(qunitVersion, '1.3.0')) {
    starter = function () {
        QUnit.start();
    };
}

var orig = tap.moduleStart;
tap.moduleStart = function(arg) {
    orig.apply(tap, slice.apply(arguments));
    var name = (typeof arg === 'string') ? arg : arg.name;
    // 'this' refers to tap object
    this.note('customized: ' + name);
};

exports.helper = {
    QUnit: QUnit,
    starter: starter
};
