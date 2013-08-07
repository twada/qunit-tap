var qunitVersion = arguments[0],
    basePath = arguments[1],
    loadFile = function (path) {
        load(basePath + '/' + path);
    };

loadFile('sample/js/lib/math.js');
loadFile('sample/js/lib/incr.js');

loadFile('test/compatibility/' + qunitVersion + '/qunit.js');
loadFile('lib/qunit-tap.js');

(function () {
    var tap = qunitTap(QUnit, print, {
        showModuleNameOnFailure: true,
        showTestNameOnFailure: true,
        showExpectationOnFailure: true,
        showSourceOnFailure: false
    });

    var orig = tap.moduleStart;
    tap.moduleStart = function(arg) {
        orig.apply(tap, Array.prototype.slice.apply(arguments));
        var name = (typeof arg === 'string') ? arg : arg.name;
        // 'this' refers to tap object
        this.note('customized: ' + name);
    };
})();

QUnit.init();
if (QUnit.config !== undefined) {
    QUnit.config.updateRate = 0;
}

loadFile('test/suite.js');

QUnit.start();
