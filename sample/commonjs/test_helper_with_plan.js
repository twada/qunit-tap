var tryRequireThese = function() {
    var i, args = Array.prototype.slice.apply(arguments);
    for(i = 0; i < args.length; i += 1) {
        try {
            return require(args[i]);
        } catch(e) {
            // ignore
        }
    }
    throw new Error("cannot find module: " + args);
},
    QUnit = require("../../test/compatibility/stable/qunit"),
    qunitTap = require("../../lib/qunit-tap"),
    sys = tryRequireThese("util", "sys", "system"),
    puts = function() { console.log.apply(console, arguments); };

qunitTap(QUnit, puts, {showSourceOnFailure: true});
QUnit.config.reorder = false;
QUnit.config.requireExpects = true;
QUnit.config.autorun = false;

exports.QUnit = QUnit;
exports.startTest = function () {
    puts('# QUnit.version ' + QUnit.version);
    QUnit.load();
};
