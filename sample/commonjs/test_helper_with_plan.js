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
    QUnit = require("../../test/compatibility/1.10.0/qunit"),
    qunitTap = require("../../lib/qunit-tap"),
    sys = tryRequireThese("util", "sys", "system"),
    puts = (typeof sys.puts === 'function') ? sys.puts : sys.print;

qunitTap(QUnit, puts, {showSourceOnFailure: true});

QUnit.init();
QUnit.config.updateRate = 0;
if (QUnit.config.semaphore === 1) {
    QUnit.config.semaphore = 0;
}
QUnit.config.reorder = false;
QUnit.config.requireExpects = true;

exports.QUnit = QUnit;
