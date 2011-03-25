require("../test_helper");

QUnit.module("TAP spec compliance");

QUnit.test('Diagnostic lines' , function() {
               assert.ok(true, "with\r\nmultiline\nmessage");
               assert.equal("foo\nbar", "foo\r\nbar", "with\r\nmultiline\nmessage");
               assert.equal("foo\r\nbar", "foo\nbar", "with\r\nmultiline\nmessage");
           });

QUnit.start();
