var q = require("../test_helper_with_plan").QUnit;

q.module("TAP spec compliance");

q.test('Diagnostic lines' , function() {
    q.expect(3);
    q.ok(true, "with\r\nmultiline\nmessage");
    q.equal("foo\nbar", "foo\r\nbar", "with\r\nmultiline\nmessage");
    q.equal("foo\r\nbar", "foo\nbar", "with\r\nmultiline\nmessage");
});
