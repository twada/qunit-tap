/**
 * QUnit-TAP - A TAP Output Producer Plugin for QUnit
 *
 * https://github.com/twada/qunit-tap
 * version: 1.2.0pre
 *
 * Copyright (c) 2010, 2011, 2012 Takuto Wada
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * @param qunitObject QUnit object reference.
 * @param printLikeFunction print-like function for TAP output (assumes line-separator is added by this function for each call).
 * @param options configuration options to customize default behavior.
 */
var qunitTap = function qunitTap(qunitObject, printLikeFunction, options) {
    var qunitTapVersion = '1.2.0pre',
        initialCount,
        multipleLoggingCallbacksSupported,
        qu = qunitObject;

    if (!qu) {
        throw new Error('should pass QUnit object reference. Please check QUnit\'s "require" path if you are using Node.js (or any CommonJS env).');
    }
    if (typeof printLikeFunction !== 'function') {
        throw new Error('should pass print-like function');
    }
    if (typeof qu.tap !== 'undefined') {
        return;
    }

    // borrowed from qunit.js
    var extend = function (a, b) {
        var prop;
        for (prop in b) {
            if (b.hasOwnProperty(prop)) {
                if (typeof b[prop] === 'undefined') {
                    delete a[prop];
                } else {
                    a[prop] = b[prop];
                }
            }
        }
        return a;
    };

    // option deprecation and fallback function
    var deprecateOption = function (optionName, fallback) {
        if (!options || typeof options !== 'object') {
            return;
        }
        if (typeof options[optionName] === 'undefined') {
            return;
        }
        printLikeFunction('# WARNING: Option "' + optionName + '" is deprecated and will be removed in future version.');
        fallback(options[optionName]);
    };

    // using QUnit.tap as namespace.
    qu.tap = extend(
        {
            initialCount: 1,
            noPlan: false,
            showModuleNameOnFailure: true,
            showTestNameOnFailure: true,
            showExpectationOnFailure: true,
            showSourceOnFailure: true
        },
        options
    );
    deprecateOption('count', function (count) {
        qu.tap.initialCount = (count + 1);
    });
    deprecateOption('showDetailsOnFailure', function (flag) {
        qu.tap.showModuleNameOnFailure = flag;
        qu.tap.showTestNameOnFailure = flag;
        qu.tap.showExpectationOnFailure = flag;
        qu.tap.showSourceOnFailure = flag;
    });

    qu.tap.puts = printLikeFunction;
    qu.tap.VERSION = qunitTapVersion;
    initialCount = qu.tap.initialCount || 1;
    qu.tap.count = initialCount - 1;

    // detect QUnit's multipleCallbacks feature. see jquery/qunit@34f6bc1
    multipleLoggingCallbacksSupported =
        (typeof qu.config !== 'undefined'
         && typeof qu.config.log !== 'undefined'
         && typeof qu.config.done !== 'undefined'
         && typeof qu.config.moduleStart !== 'undefined'
         && typeof qu.config.testStart !== 'undefined');

    var isPassed = function (details) {
        return !!details.result;
    };

    var isFailed = function (details) {
        return !details.result;
    };

    // borrowed from prototype.js
    // not required since QUnit.log receives raw data (details). see jquery/qunit@c2cde34
    var stripTags = function (str) {
        if (!str) {
            return str;
        }
        return str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
    };

    var commentAfterLineEnd = function (str) {
        return str.replace(/(\r?\n)/g, '$&# ');
    };

    var ltrim = function (str) {
        return str.replace(/^\s+/, '');
    };

    var quote = function (obj) {
        return '\'' + obj + '\'';
    };

    var noop = function (obj) {
        return obj;
    };

    var format = function (fieldName, configName, detailValue, formatter) {
        if (qu.tap[configName] && typeof detailValue !== 'undefined') {
            return fieldName + ': ' + formatter(detailValue);
        } else {
            return '';
        }
    };

    var appendTo = function (desc, str) {
        if (desc && str) {
            desc += ', ';
        }
        return desc + str;
    };

    var appendDetailsTo = function (desc, details) {
        if (isPassed(details)) {
            return desc;
        }
        desc = appendTo(desc, format('expected', 'showExpectationOnFailure', details.expected, quote));
        desc = appendTo(desc, format('got', 'showExpectationOnFailure', details.actual, quote));
        desc = appendTo(desc, format('test', 'showTestNameOnFailure', details.name, noop));
        desc = appendTo(desc, format('module', 'showModuleNameOnFailure', details.module, noop));
        desc = appendTo(desc, format('source', 'showSourceOnFailure', details.source, ltrim));
        return desc;
    };

    var formDescription = function (str) {
        if (!str) {
            return str;
        }
        return commentAfterLineEnd(' - ' + str);
    };

    qu.tap.explain = function explain (obj) {
        if (typeof qu.jsDump !== 'undefined' && typeof qu.jsDump.parse === 'function') {
            return qu.jsDump.parse(obj);
        } else {
            return obj;
        }
    };

    qu.tap.note = function note (obj) {
        qu.tap.puts(commentAfterLineEnd('# ' + obj));
    };

    qu.tap.diag = function diag (obj) {
        qu.tap.note(obj);
        return false;
    };

    qu.tap.moduleStart = function (arg) {
        var name = (typeof arg === 'string') ? arg : arg.name;
        qu.tap.note('module: ' + name);
    };

    qu.tap.testStart = function (arg) {
        var name = (typeof arg === 'string') ? arg : arg.name;
        qu.tap.note('test: ' + name);
    };

    qu.tap.log = function () {
        var details, desc, testLine = '';
        qu.tap.count += 1;
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
        default:
            throw new Error('QUnit-TAP does not support QUnit#log arguments like this.');
        }
        if (isFailed(details)) {
            testLine += 'not ';
        }
        testLine += 'ok ' + qu.tap.count;
        if (isPassed(details) && !details.message) {
            qu.tap.puts(testLine);
            return;
        }
        desc = appendDetailsTo((details.message || ''), details);
        qu.tap.puts(testLine + formDescription(desc));
    };

    // prop in arg: failed,passed,total,runtime
    qu.tap.done = function (arg) {
        if (!qu.tap.noPlan) {
            return;
        }
        qu.tap.puts(initialCount + '..' + qu.tap.count);
    };

    var addListener = function (target, name, listener) {
        var originalLoggingCallback = target[name];
        if (multipleLoggingCallbacksSupported) {
            originalLoggingCallback(listener);
        } else if (typeof originalLoggingCallback === 'function') {
            // add listener, not replacing former ones.
            target[name] = function () {
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

if (typeof exports !== 'undefined') {
    // exports qunitTap function to CommonJS world
    exports.qunitTap = qunitTap;
}
