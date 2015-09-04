var q = require('../test_helper_with_plan').QUnit,
    startTest = require('../test_helper_with_plan').startTest;

q.module('TAP spec compliance');

q.test('Diagnostic lines', function (assert) {
    assert.expect(3);
    assert.ok(true, 'with\r\nmultiline\nmessage');
    assert.equal('foo\nbar', 'foo\r\nbar', 'with\r\nmultiline\nmessage');
    assert.equal('foo\r\nbar', 'foo\nbar', 'with\r\nmultiline\nmessage');
});

startTest();
