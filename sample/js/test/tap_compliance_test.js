QUnit.module('TAP spec compliance');

QUnit.test('Diagnostic lines', function (assert) {
    assert.ok(true, 'with\nmultiline\nmessage');
    assert.equal('foo\nbar', 'foobar\n', 'with\nmultiline\nmessage');
});
