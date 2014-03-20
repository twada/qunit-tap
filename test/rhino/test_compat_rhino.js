var qunitVersion = arguments[0],
    basePath = arguments[1],
    loadFile = function (path) {
        load(basePath + '/' + path);
    };

loadFile('sample/js/lib/math.js');
loadFile('sample/js/lib/incr.js');

loadFile('node_modules/semver/semver.js');
var before_1_0_0 = function () {
    return !(semver.valid(qunitVersion) || ['stable', 'head'].some(function(v){ return v === qunitVersion; }));
};

loadFile('test/compatibility/' + qunitVersion + '/qunit.js');
loadFile('lib/qunit-tap.js');

var tap = qunitTap(QUnit, print, {
    showModuleNameOnFailure: true,
    showTestNameOnFailure: true,
    showExpectationOnFailure: true,
    showSourceOnFailure: false
});

(function () {
    var orig = tap.moduleStart;
    tap.moduleStart = function(arg) {
        orig.apply(tap, Array.prototype.slice.apply(arguments));
        var name = (typeof arg === 'string') ? arg : arg.name;
        // 'this' refers to tap object
        this.note('customized: ' + name);
    };
})();


if (before_1_0_0() || semver.lt(qunitVersion, '1.12.0')) {
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

loadFile('test/suite.js');

if (before_1_0_0() || semver.lt(qunitVersion, '1.11.0')) {
    QUnit.start();
} else if (semver.gte(qunitVersion, '1.13.0')) {
    QUnit.load();
};
