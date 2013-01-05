var argv = require('optimist').argv,
    qunitVersion = argv.version,
    qunitPath = "../compatibility/" + qunitVersion + "/qunit",
    qunitTap = require("../../lib/qunit-tap").qunitTap,
    util = require("util"),
    semver = require('semver'),
    QUnit,
    slice = Array.prototype.slice,
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

qunitTap(QUnit, util.puts, {noPlan: true, showSourceOnFailure: false});
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
