if ( typeof exports !== "undefined" || typeof require !== "undefined" ) {
    require("../test_helper");
    equals = assert.equal;
    ok = assert.ok;
    puts("1..3");
}

QUnit.module("TAP spec compliance");

QUnit.test('Diagnostic lines' , function() {
               ok(true, "with\r\nmultiline\nmessage");
               equals("foo\nbar", "foo\r\nbar", "with\r\nmultiline\nmessage");
               equals("foo\r\nbar", "foo\nbar", "with\r\nmultiline\nmessage");
           });
