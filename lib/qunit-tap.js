/*
 * QUnit-TAP - A TAP Output Producer Plugin for QUnit
 *
 * http://github.com/twada/qunit-tap
 * version: 0.9.4
 *
 * Copyright (c) 2010 Takuto Wada
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPLv2 (GPL-LICENSE.txt) licenses.
 */
(function() {
     var qu;
     var puts;
     if ( typeof exports === "undefined" || typeof require === "undefined" ) {
         if (typeof print === "function" && typeof alert === "undefined") {
             puts = print; // rhino or spidermonkey
         } else {
             puts = function(){}; // no-op
         }
         qu = QUnit;
     } else {
         var tryTheseThenGlobal = function() {
             for(var i=0; i < arguments.length; i+=1) {
                 try {
                     return require(arguments[i]);
                 } catch(e) {
                     // ignore
                 }
             }
             return global;
         };
         var sys = tryTheseThenGlobal("sys", "system");
         puts = (typeof sys.puts === 'function') ? sys.puts : sys.print;
         qu = tryTheseThenGlobal("./qunit", "qunit", "test/qunit").QUnit;
     }

     if (typeof qu.tap !== "undefined") {
         return;
     }

     qu.tap = {}; // using QUnit.tap as namespace.
     qu.tap.puts = puts;  // QUnit.tap.puts can be replaced later (e.g. console.log)
     qu.tap.count = 0;
     qu.tap.showDetailsOnFailure = true;

     // borrowed from prototype.js, not required since QUnit.log receives raw data (details).
     // see https://github.com/jquery/qunit/commit/c2cde34d3e53f5438a984dfdacdc992c8e417919
     var stripTags = function (str) {
         if (!str) return str;
         return str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, "");
     };

     var commentAfterLineEnd = function (str) {
          return str.replace(/(\r?\n)/g, "$&# ");
      };

     var formDescription = function (str) {
         if (!str) return str;
         return commentAfterLineEnd(" - " + str);
     };

     var appendDetailsTo = function (desc, details) {
         if (qu.tap.showDetailsOnFailure && details && !(details.result) && typeof(details.expected) !== "undefined") {
             if (desc) desc += ", ";
             desc += "expected: ";
             desc += details.expected;
             desc += " result: ";
             desc += details.actual;
         }
         return desc;
     };

     qu.tap.moduleStart = function(name, testEnvironment) {
         qu.tap.puts("# module: " + name);
     };
     qu.tap.testStart = function(name, testEnvironment) {
         qu.tap.puts("# test: " + name);
     };
     qu.tap.log = function(result, message, details) {
         message = details ? details.message : stripTags(message);
         var testLine = (result ? "ok" : "not ok") + " " + (qu.tap.count += 1);
         if (result && !message) {
             qu.tap.puts(testLine);
             return;
         }
         var desc = appendDetailsTo((message || ""), details);
         qu.tap.puts(testLine + formDescription(desc));
     };

     // private
     var addListener = function (target, name, func) {
         if (typeof target[name] === "function") {
             var orig = target[name];
             target[name] = function () {
                 var args = Array.prototype.slice.apply(arguments);
                 orig.apply(target, args);
                 func.apply(target, args);
             };
         } else {
             target[name] = func;
         }
     };
     addListener(qu, "moduleStart", qu.tap.moduleStart);
     addListener(qu, "testStart", qu.tap.testStart);
     addListener(qu, "log", qu.tap.log);
 })();
