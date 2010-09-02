/*
 * QUnit-TAP - A TAP Output Producer Plugin for QUnit
 * 
 * http://github.com/twada/qunit-tap
 *
 * Copyright (c) 2010 Takuto Wada
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
(function() {
     var qu;
     var puts;
     if ( typeof exports === "undefined" || typeof require === "undefined" ) {
         if (typeof print === "function") {
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

     // from Prototype.js
     var stripTags = function (str) {
         return str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, "");
     };

     qu.tap.moduleStart = function(name, testEnvironment) {
         qu.tap.puts("# module: " + name);
     };
     qu.tap.testStart = function(name, testEnvironment) {
         qu.tap.puts("# test: " + name);
     };
     qu.tap.log = function(result, message) {
         qu.tap.count += 1;
         var res = result ? "ok" : "not ok";
         var desc = message ? (" - " + stripTags(message)) : "";
         qu.tap.puts(res + " " + qu.tap.count + desc);
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
