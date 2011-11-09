/**
 * QUnit-TAP - A TAP Output Producer Plugin for QUnit
 *
 * http://github.com/twada/qunit-tap
 * version: 1.0.4
 *
 * Copyright (c) 2010, 2011 Takuto Wada
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPLv2 (GPL-LICENSE.txt) licenses.
 *
 * @param qunitObject QUnit object reference.
 * @param printLikeFunction print-like function for TAP output (assumes line-separator is added by this function for each call).
 * @param options configuration options to customize default behavior.
 */
var qunitTap = function qunitTap(qunitObject, printLikeFunction, options) {
    var qunitTapVersion = "1.0.4",
        initialCount,
        multipleLoggingCallbacksSupported,
        qu = qunitObject;

    if (typeof qu === 'undefined') {
        throw new Error('should pass QUnit object reference');
    }
    if (typeof printLikeFunction !== 'function') {
        throw new Error('should pass print-like function');
    }
    if (typeof qu.tap !== 'undefined') {
        return;
    }

    // borrowed from qunit.js
    var extend = function(a, b) {
        var prop;
        for (prop in b) {
            if (b[prop] === undefined) {
                delete a[prop];
            } else {
                a[prop] = b[prop];
            }
        }
        return a;
    };

    // using QUnit.tap as namespace.
    qu.tap = extend({
                        count: 0,
                        noPlan: false,
                        showDetailsOnFailure: true
                    }, options);
    qu.tap.puts = printLikeFunction;
    qu.tap.VERSION = qunitTapVersion;
    initialCount = qu.tap.count || 0;
    
    // detect QUnit's multipleCallbacks feature. see jquery/qunit@34f6bc1
    multipleLoggingCallbacksSupported =
        (typeof qu.config !== 'undefined'
         && typeof qu.config.log !== 'undefined'
         && typeof qu.config.done !== 'undefined'
         && typeof qu.config.moduleStart !== 'undefined'
         && typeof qu.config.testStart !== 'undefined');

    // borrowed from prototype.js
    // not required since QUnit.log receives raw data (details). see jquery/qunit@c2cde34
    var stripTags = function(str) {
        if (!str) return str;
        return str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
    };

    var commentAfterLineEnd = function(str) {
        return str.replace(/(\r?\n)/g, '$&# ');
    };

    var formDescription = function(str) {
        if (!str) return str;
        return commentAfterLineEnd(' - ' + str);
    };

    var appendDetailsTo = function(desc, details) {
        if (!qu.tap.showDetailsOnFailure || details.result) {
            return desc;
        }
        if (typeof details.expected !== 'undefined') {
            if (desc) desc += ', ';
            desc += 'expected: ';
            desc += details.expected;
            desc += ' result: ';
            desc += details.actual;
        }
        return desc;
    };

    qu.tap.moduleStart = function(arg) {
        var name = (typeof arg === 'string') ? arg : arg.name;
        qu.tap.puts('# module: ' + name);
    };

    qu.tap.testStart = function(arg) {
        var name = (typeof arg === 'string') ? arg : arg.name;
        qu.tap.puts('# test: ' + name);
    };

    qu.tap.log = function() {
        var details, testLine, desc;
        switch (arguments.length) {
        case 1:  // details
            details = arguments[0];
            break;
        case 2:  // result, message(with tags)
            details = {result: arguments[0], message: stripTags(arguments[1])};
            break;
        case 3:  // result, message, details
            details = arguments[2];
            break;
        }
        testLine = (details.result ? 'ok' : 'not ok') +
            ' ' + (qu.tap.count += 1);
        if (details.result && !details.message) {
            qu.tap.puts(testLine);
            return;
        }
        desc = appendDetailsTo((details.message || ''), details);
        qu.tap.puts(testLine + formDescription(desc));
    };

    // prop in arg: failed,passed,total,runtime
    qu.tap.done = function(arg) {
        if (! qu.tap.noPlan) {
            return;
        }
        qu.tap.puts((initialCount + 1) + '..' + qu.tap.count);
    };

    var addListener = function(target, name, listener) {
        var originalLoggingCallback = target[name];
        if (multipleLoggingCallbacksSupported) {
            originalLoggingCallback(listener);
        } else if (typeof originalLoggingCallback === 'function') {
            // add listener, not replacing former ones.
            target[name] = function() {
                var args = Array.prototype.slice.apply(arguments);
                originalLoggingCallback.apply(target, args);
                listener.apply(target, args);
            };
        }
    };
    addListener(qu, 'moduleStart', qu.tap.moduleStart);
    addListener(qu, 'testStart', qu.tap.testStart);
    addListener(qu, 'log', qu.tap.log);
    addListener(qu, 'done', qu.tap.done);
};

if (typeof exports !== 'undefined' || typeof require !== 'undefined') {
    // exports qunitTap function to CommonJS world
    exports.qunitTap = qunitTap;
}
