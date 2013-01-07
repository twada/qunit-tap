var qunitVersion = arguments[0],
    basePath = arguments[1],
    loadFile = function (path) {
        load(basePath + '/' + path);
    };

loadFile('sample/js/lib/math.js');
loadFile('sample/js/lib/incr.js');

loadFile('test/compatibility/' + qunitVersion + '/qunit.js');
loadFile('lib/qunit-tap.js');

qunitTap(QUnit, print, {
    showModuleNameOnFailure: true,
    showTestNameOnFailure: true,
    showExpectationOnFailure: true,
    showSourceOnFailure: false
});

(function () {
    var orig = QUnit.tap.moduleStart;
    QUnit.tap.moduleStart = function(arg) {
        orig.apply(QUnit.tap, Array.prototype.slice.apply(arguments));
        var name = (typeof arg === 'string') ? arg : arg.name;
        // 'this' refers to QUnit.tap
        this.note('customized: ' + name);
    };
})();

QUnit.init();
if (QUnit.config !== undefined) {
    QUnit.config.updateRate = 0;
}

loadFile('sample/js/test/math_test.js');
loadFile('sample/js/test/incr_test.js');
loadFile('sample/js/test/tap_compliance_test.js');
loadFile('sample/js/test/qunit_assertion_test.js');

QUnit.start();
