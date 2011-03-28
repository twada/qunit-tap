exports = module.exports = global;

var tryRequireThese = function() {
    var args = Array.prototype.slice.apply(arguments);
    for(var i=0; i < args.length; i+=1) {
        try {
            return require(args[i]);
        } catch(e) {
            // ignore
        }
    }
    throw new Error("cannot find moduele: " + args);
};

QUnit = require("../../vendor/qunit/qunit/qunit").QUnit;
var qunitTap = require("../../lib/qunit-tap").qunitTap;

var sys = tryRequireThese("sys", "system");
for (var i in sys) exports[i] = sys[i];
puts = (typeof sys.puts === 'function') ? sys.puts : sys.print;

qunitTap(QUnit, puts, {noPlan: true});

QUnit.init();
QUnit.config.updateRate = 0;

exports.assert = QUnit;
