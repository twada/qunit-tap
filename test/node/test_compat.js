var minimist = require('minimist'),
    argv = minimist(process.argv.slice(2), {
        string: [
            'version'
        ]
    }),
    qunitVersion = argv.version,
    qunitPath = "../compatibility/" + qunitVersion + "/qunit",
    qunitTap = require("../../lib/qunit-tap"),
    util = require("util"),
    semver = require('semver'),
    slice = Array.prototype.slice,
    QUnit,
    tap,
    print = function() { console.log.apply(console, arguments); },
    starter = function () {};

// require QUnit (in two ways)
if (semver.valid(qunitVersion) && semver.lt(qunitVersion, '1.3.0')) {
    QUnit = require(qunitPath).QUnit;
} else {
    QUnit = require(qunitPath);
}

qunitVersion = QUnit.version ? QUnit.version : qunitVersion;

tap = qunitTap(QUnit, print, {showSourceOnFailure: false});
if (semver.lt(qunitVersion, '1.12.0')) {
    QUnit.init();
    if (QUnit.config !== undefined) {
        QUnit.config.updateRate = 0;
        if (QUnit.config.semaphore === 1) {
            QUnit.config.semaphore = 0;
        }
    }
} else if (semver.gte(qunitVersion, '1.13.0')) {
    QUnit.config.autorun = false;
}

// starter function (required before 1.3.0)
if (semver.lt(qunitVersion, '1.3.0')) {
    starter = function () {
        QUnit.start();
    };
} else if (semver.gte(qunitVersion, '1.13.0')) {
    starter = function () {
        QUnit.load();
    };
}

var orig = tap.moduleStart;
tap.moduleStart = function(arg) {
    orig.apply(tap, slice.apply(arguments));
    var name = (typeof arg === 'string') ? arg : arg.name;
    // 'this' refers to tap object
    this.note('customized: ' + name);
};
QUnit.done(function() {
    print('');
});

global.QUnit = QUnit;
global.tap = tap;
global.incr = require("../../sample/commonjs/lib/incr");
global.math = require("../../sample/commonjs/lib/math");

if (semver.gte(qunitVersion, '1.19.0')) {
    require("../suite_2_x");
} else {
    require("../suite");
}

starter();
